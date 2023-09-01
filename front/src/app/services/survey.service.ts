import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private baseUrl = environment.baseUrl;
  constructor(private _http:HttpClient) { }


  public surveys() {
    return this._http.get(`${this.baseUrl}/survey/`);
  }

  //add survey
  public addSurvey(survey:any){
    return this._http.post(`${this.baseUrl}/survey/`,survey)

  }

  //delete survey
  public deleteSurvey(sid:any){
  return this._http.delete(`${this.baseUrl}/survey/${sid}`);
  }

  //get a single survey
  public getSurvey(sid:any){

    return this._http.get(`${this.baseUrl}/survey/${sid}`);
  }

  //update survey
  public updateSurvey(survey:any){
    return this._http.put(`${this.baseUrl}/survey/`,survey);
  }

  //get surveys of category
  public getSurveysOfCategory(cid:any)
  {
    return this._http.get(`${this.baseUrl}/survey/category/${cid}`);
  }

  //get active surveys
  public getActiveSurveys()
  {
    return this._http.get(`${this.baseUrl}/survey/active`);
  }

  //get surveys of category
  public getActiveSurveysOfCategory(cid:any)
  {
    return this._http.get(`${this.baseUrl}/survey/category/active/${cid}`);
  }

  //serach surveys
  public searchSurveys(keyword: string) {
    return this._http.get(`${this.baseUrl}/survey/search`, { params: { keyword } });
}
}
