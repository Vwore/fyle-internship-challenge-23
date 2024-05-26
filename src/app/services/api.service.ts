import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    const token = environment.githubToken
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  
  getUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`, { headers: this.headers });
  }

  getRepo(githubRepo: string) {

    return this.httpClient.get(githubRepo, { headers: this.headers });
  }

  getLanguage(languageLink: string) {

    return this.httpClient.get(languageLink, { headers: this.headers});
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
}
