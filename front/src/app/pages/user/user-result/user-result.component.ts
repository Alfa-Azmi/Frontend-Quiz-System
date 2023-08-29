import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from 'src/app/services/result.service';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-user-result',
  templateUrl: './user-result.component.html',
  styleUrls: ['./user-result.component.css']
})
export class UserResultComponent implements OnInit {
  results: any;
  surveyID: any;
  userID: any;
  survey: any;
  surveyTitle: any;
  
  constructor(
    private resultService: ResultService,
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    // Retrieve user object JSON from local storage
    const userJSON = localStorage.getItem('user');

    if (userJSON) {
      // Parse the user object JSON
      const user = JSON.parse(userJSON);

      // Access the user ID from the parsed object
      this.userID = user.id;

      // Retrieve survey ID from route parameters

      //this.sTitle = this.route.snapshot.params['title'];

      this.route.params.subscribe(params => {
        this.surveyID = +params['sId']; // Use 'sId' here
        
        console.log(this.userID);
        console.log(this.surveyID);

        this.resultService
          .getResultByUserIDAndSurveyID(this.userID, this.surveyID)
          .subscribe(
            (data: any) => {
              this.results = data;
              console.log(this.results);
            },
            (error) => {
              alert("Error in loading result data");
            }
          );
      });
    } else {
      console.log("User object not found in local storage");
    }
    this.surveyService.getSurvey(this.surveyID).subscribe((data:any)=> {
      console.log(data);
      this.survey = data;
      this.surveyTitle = this.survey.title;
    console.log(this.surveyTitle);
    })
  }




}
