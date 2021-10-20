import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  baseUrl: string = 'https://api.publicapis.org';

  constructor(private httpClient:HttpClient) { }

  getEntries() {
    return this.httpClient.get(`${this.baseUrl}/entries`);
  }

  getCatergories() {
    return this.httpClient.get(`${this.baseUrl}/categories`);
  }

  getEntryByTitle(titleName: string) {
    return this.httpClient.get(`${this.baseUrl}/entries?title=${titleName}`);
  }


}
