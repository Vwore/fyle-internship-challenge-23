import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError, Observable } from 'rxjs';
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

  getUser(githubUsername: string): Observable<HttpResponse<any>> {
    return this.httpClient.get<any>(`https://api.github.com/users/${githubUsername}`, { headers: this.headers, observe: 'response' });
  }

  getRepo(githubRepo: string, per_page: number = 10, page: number = 1): Observable<HttpResponse<any>> {
    let param = new HttpParams().set('page', page).set('per_page', per_page);

    return this.httpClient.get<any>(githubRepo, { headers: this.headers, observe: 'response', params: param });
  }

  getLanguage(languageLink: string) {

    return this.httpClient.get(languageLink, { headers: this.headers });
  }

  extractLastPage(linkHeader: string): number {
    if (!linkHeader) return 1;

    const links = linkHeader.split(',');
    let lastPage = 1;

    links.forEach(link => {
      const [urlPart, relPart] = link.split(';');
      const url = urlPart.trim().slice(1, -1);
      const rel = relPart.trim().split('=')[1].replace(/"/g, '');

      if (rel === 'last') {
        const urlParams = new URLSearchParams(url.split('?')[1]);
        lastPage = parseInt(urlParams.get('page') || '1', 10);
      }
    });

    return lastPage;
  }


  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
}
