import { DatePipe } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { Result, ResultRequest } from 'src/app/models/result';
import { ResultService } from 'src/app/services/result.service';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit{

  results: any;
  userID: any;
  surveyID: any;
  
  survey: any;
  

  //surveyList = [];
  surveyList: { sid: any, title: string }[] = [];
  
  //surveyList = [];

  constructor(
    private resultService:ResultService,
    private datePipe: DatePipe,
    private surveyService: SurveyService
  ){}
  ngOnInit(): void {

    // Retrieve user object JSON from local storage
    const userJSON = localStorage.getItem('user');

    if (userJSON) {
      // Parse the user object JSON
      const user = JSON.parse(userJSON);

      // Access the user ID from the parsed object
      this.userID = user.id;
      this.resultService
      .getResultByUser(this.userID)
      .subscribe(
        (data: any) => {
          this.results = data;
          console.log(this.results);
        },
        (error) => {
          alert("Error in loading result data");
        }
      );
    }else{
      console.log("User object not found in local storage");
    }
    this.surveyService.surveys().subscribe((data:any)=> {
      console.log(data);
      this.surveyList = data;
    
    })
    
    
  }

  getSurveyName(surveyID: any) {
    console.log('Survey ID to find:', surveyID);
    const foundSurvey = this.surveyList.find(item => item.sid === surveyID);
    console.log('Found Survey:', foundSurvey);
    return foundSurvey ? foundSurvey.title : 'Unknown Survey';
  }

  
      
}


