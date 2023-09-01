import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from 'src/app/services/survey.service';
import { ResultService } from 'src/app/services/result.service'; // Import your ResultService
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  sId: any;
  survey: any;
  userID: any;

  constructor(
    private _route: ActivatedRoute,
    private surveyService: SurveyService,
    private resultService: ResultService, // Inject the ResultService
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.sId = this._route.snapshot.params['sId'];

    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      this.userID = user.id;

      // Check if the user has already attempted the quiz
      this.resultService.getResultByUserIDAndSurveyID(this.userID, this.sId).subscribe(
        (data: any) => {
          if (data.length > 0) {
            Swal.fire('Already Attempted', 'You have already taken this quiz', 'warning');
            this._router.navigate(['user-dashboard/0']); // Redirect to home or appropriate page
          } else {
            // User has not attempted the quiz, fetch survey details
            this.surveyService.getSurvey(this.sId).subscribe(
              (surveyData: any) => {
                this.survey = surveyData;
              },
              (error) => {
                console.log(error);
                alert("Error in loading quiz data");
              }
            );
          }
        },
        (error) => {
          console.log(error);
          alert("Error checking quiz attempt");
        }
      );
    } else {
      console.log("User object not found in local storage");
    }
  }

  startQuiz() {
    Swal.fire({
      title: 'Do you want to start the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this._router.navigate(['/start/' + this.sId]);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
}
