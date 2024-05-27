import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HttpResponse } from '@angular/common/http';



@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  username = "";
  userDetail: any;
  repoDetail: any;
  lastPage = 1;
  currentPage = 1;
  itemsPerPage = 10;
  itemsPerPageOptions = [5, 10, 15, 20];

  constructor(private route: ActivatedRoute, private apiService: ApiService
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['user'];
      console.log(this.username)
      this.fetchUserDetails()
      // Fetch details based on itemId
    });
  }

  fetchUserDetails(): void {
    this.apiService.getUser(this.username).subscribe((response: HttpResponse<any>) => {
      this.userDetail = response.body;
      this.fetchRepoDetails()
    });
  }

  fetchRepoDetails(): void {
    this.apiService.getRepo(this.userDetail.repos_url,this.itemsPerPage,this.currentPage).subscribe((resp: HttpResponse<any>) => {
      this.repoDetail = resp.body;
      if (resp.headers.get('Link')) {
        let link = resp.headers.get('Link')
        this.lastPage = this.apiService.extractLastPage(link ? link : '')
        console.log('last page', this.lastPage)
      }
    })
  }

  changeItemsPerPage(event: Event): void {
    this.itemsPerPage = +(event.target as HTMLSelectElement).value;
    this.currentPage = 1; // Reset to first page
    this.fetchRepoDetails();
  }

  nextPage(): void {
    if (this.currentPage < this.lastPage) {
      this.currentPage++;
      this.fetchRepoDetails();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchRepoDetails();
    }
  }

}
