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

  constructor(private route: ActivatedRoute, private apiService: ApiService
  ) { 
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['user'];
      console.log(this.username)
      this.apiService.getUser(this.username).subscribe(console.log);

      // Fetch details based on itemId
    });}

}
