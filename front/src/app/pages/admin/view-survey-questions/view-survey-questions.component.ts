import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-survey-questions',
  templateUrl: './view-survey-questions.component.html',
  styleUrls: ['./view-survey-questions.component.css']
})
export class ViewSurveyQuestionsComponent implements OnInit {

  sid:any;
  sTitle:any;
  questions=[
   {
    quesId:'',
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
    survey:{
      sid:'',
    },
   }
      
  ];
  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService,
    private _snack:MatSnackBar,
    private _router: Router
  ){}

  ngOnInit(): void {
    this.sid= this._route.snapshot.params['sId']; 
    this.sTitle = this._route.snapshot.params['title'];
    console.log(this.sid);
    console.log(this.sTitle);

    this._question.getQuestionsOfSurvey(this.sid).subscribe((data:any)=>{
      console.log(data);
      this.questions=data;
    },(error)=>{
      console.log(error);
    });

  }

  //delete question
  deleteQuestion(sId:any)
  {
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure, want to delete this question? '
    }).then((result)=>{
      //alert('testing');

      if(result.isConfirmed){
        //confirm
        this._question.deleteQuestion(sId).subscribe(
          (data)=>{
            this._snack.open('Question Deleted ','',{
              duration:3000,
            } );
            this.questions=this.questions.filter((q)=>q['quesId'] !== sId);
          },
          (error)=>{
            this._snack.open('Error in deleting question','',{
                duration:3000,
            });
            console.log(error);
          }
          );
      }
    });  
  } 

}
