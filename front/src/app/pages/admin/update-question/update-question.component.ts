import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { SurveyService } from 'src/app/services/survey.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  constructor(
    private _route:ActivatedRoute,
    private questionService:QuestionService,
    private surveyService:SurveyService,
    private _router:Router,
  ){}

  quesId=0;
  question: any;
  surveys:any;
  
  

  ngOnInit(): void {
    this.quesId =this._route.snapshot.params['quesId'];
    //alert(this.quesId);
    this.questionService.getQuestion(this.quesId).subscribe(
      (data:any)=>{
       this.question=data;
        console.log(this.question);
      },
      (error)=>{
        console.log(error);
      }
    );
    this.surveyService.surveys().subscribe((data:any)=>{
      this.surveys=data;

    },error=>{
      alert("error in loading surveys");
    });
}
  
  

  //update form submit
  public updateData(){

    //validate
    this.questionService.updateQuestion(this.question).subscribe((data)=>{
      Swal.fire("Success!!",'question updated','success');
      // .then((e)=>{
      //  this._router.navigate(['/admin/view-questions/:sId/:title']);
      // }
      // );
  
    },(error)=>{
      Swal.fire("Error!!",'error in updating question','error');
      console.log(error);
    });
  
    }

}
