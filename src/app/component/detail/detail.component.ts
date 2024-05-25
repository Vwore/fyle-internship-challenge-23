import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  username= "";
  userDetail: any;
  repoDetail: any;
  constructor(private route: ActivatedRoute, private apiService: ApiService
  ) { 
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['user'];
      console.log(this.username)
      this.apiService.getUser(this.username).subscribe(data=> {
        this.userDetail=data
        this.apiService.getRepo(this.userDetail.repos_url).subscribe(data=> {
          this.repoDetail=data;
          console.log(this.repoDetail)
        })
      });
      

      // Fetch details based on itemId
    });}

}
