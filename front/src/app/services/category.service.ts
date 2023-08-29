import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = environment.baseUrl;
  constructor(private _http:HttpClient) { }

  //Load all the categories
  public categories(){
    return this._http.get(`${this.baseUrl}/category/`);

  }

   //add new Category
   public addCategory(category:any){
    return this._http.post(`${this.baseUrl}/category/`,category);

  }
}
