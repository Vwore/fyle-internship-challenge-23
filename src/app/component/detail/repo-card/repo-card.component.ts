import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-repo-card',
  templateUrl: './repo-card.component.html',
  styleUrls: ['./repo-card.component.scss']
})
export class RepoCardComponent {
  @Input() data: any;
  languages:any;

  constructor(private apiService: ApiService, private router: Router
  ) {     
  }
  ngOnInit(): void {
    console.log(this.data);
    this.apiService.getLanguage(this.data.languages_url).subscribe(data => {
        this.languages=Object.keys(data);
        console.log(this.languages)
    })
  }

  redirect() {
    console.log(this.data.svn_url)
    window.open(this.data.svn_url)

  }

}
