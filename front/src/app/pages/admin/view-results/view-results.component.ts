import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from 'src/app/services/result.service';
import { SurveyService } from 'src/app/services/survey.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.component.html',
  styleUrls: ['./view-results.component.css']
})
export class ViewResultsComponent implements OnInit {
  results: any;
  surveyID: any;
  survey:any;
  surveyTitle:any;
  userList: { id: any, firstName: string,lastName:string }[] = [];


  constructor(
    private resultService:ResultService,
    private _route:ActivatedRoute,
    private surveyService:SurveyService,
    private userService:UserService,
    private datePipe: DatePipe
  ){}
  
  ngOnInit(): void {


      this._route.params.subscribe(params => {
        this.surveyID = +params['sId']; // Use 'sId' here

    
        console.log(this.surveyID);

        this.resultService
          .getResultBySurvey(this.surveyID)
          .subscribe(
            (data: any) => {
              this.results = data;
              this.results = this.results.filter((result: unknown) => (result as any).userID !== 1);

              console.log(this.results);
            },
            (error) => {
              alert("Error in loading result data");
            }
          );
      });

      this.surveyService.getSurvey(this.surveyID).subscribe((data:any)=> {
        console.log(data);
        this.survey = data;
        this.surveyTitle = this.survey.title;
      console.log(this.surveyTitle);
      })

      this.userService.users().subscribe((data:any)=> {
        console.log(data);
        this.userList = data;
      
      })
  }

  getUserName(userID: any) {
    console.log('User ID to find:', userID);
    const foundUser = this.userList.find(item => item.id === userID);
    console.log('Found Survey:', foundUser);
    return foundUser ? foundUser.firstName + " " + foundUser.lastName : 'Unknown User';
  }

  
  

}
