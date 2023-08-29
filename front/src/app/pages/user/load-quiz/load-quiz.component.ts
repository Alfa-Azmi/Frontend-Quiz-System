import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId:any;
  surveys:any;
  searchText='';
 
  constructor(
    private _route:ActivatedRoute,
    private _survey:SurveyService,
  ){}

  ngOnInit(): void {
      
  
      this._route.params.subscribe((params)=>{
        this.catId =params['catId'];   
        if(this.catId==0)
      {
        console.log("Load all the quizzes");
        this._survey.getActiveSurveys().subscribe(
          (data:any)=>{
            this.surveys=data;
            console.log(this.surveys);
          },
          (error)=>{
            console.log(error);
            alert("error in loading all quizzes")
          }
        );
      }else{
        console.log("Load Specific quiz");
        this._survey.getActiveSurveysOfCategory(this.catId).subscribe(
          (data:any)=>{
            this.surveys=data;
            console.log(this.surveys);
          },
          (error)=>{
            alert("Error in loading question data");
          }  
        );
      }
      });
      
  }

}
