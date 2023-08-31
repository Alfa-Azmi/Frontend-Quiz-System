import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = environment.baseUrl;
  constructor(
    private _http:HttpClient
  ) { }

  public getQuestionsOfSurvey(sId:any){
    return this._http.get(`${this.baseUrl}/question/survey/all/${sId}`);

  }

  public getQuestionsOfSurveyForTest(sId:any){
    return this._http.get(`${this.baseUrl}/question/survey/${sId}`);

  }
  //add question
  public addQuestion(question:any){
    return this._http.post(`${this.baseUrl}/question/`,question);
  }

  //delete question
  public deleteQuestion(questionId:any){
    return this._http.delete(`${this.baseUrl}/question/${questionId}`);
  }

  //get a single question
  public getQuestion(questionId:any){
    return this._http.get(`${this.baseUrl}/question/${questionId}`);
  }

  //eval survey
  public evalSurvey(questions:any){
    return this._http.post(`${this.baseUrl}/question/eval-survey`,questions);
  }

  //update survey
  public updateQuestion(question:any) {
    return this._http.put(`${this.baseUrl}/question/`,question);
  }
}
