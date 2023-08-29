import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { ResultRequest } from '../models/result';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private baseUrl = environment.baseUrl;
  constructor(
    private _http:HttpClient
  ) { }

  //add result
  public addResult(results:any){
    return this._http.post(`${this.baseUrl}/result/`,results);
  }


  //getting result by survey
  public getResultBySurvey(surveyID:any){
    return this._http.get(`${this.baseUrl}/result/survey/${surveyID}`);
  }

  // //getting result by survey
  // public getResultByUser(userID:any): Observable<ResultRequest[]>{
  //   return this._http.get<ResultRequest[]>(`${baseUrl}/result/user/${userID}`);
  // }

  //getting result by user
  public getResultByUser(userID:any){
    return this._http.get(`${this.baseUrl}/result/user/${userID}`);
  }

  public getResultByUserIDAndSurveyID(userID:any,surveyID:any){
    return this._http.get(`${this.baseUrl}/result/${userID}/${surveyID}`);
  }


}
