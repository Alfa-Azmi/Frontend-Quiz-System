import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { SurveyService } from 'src/app/services/survey.service';
import Swal from 'sweetalert2';
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor=ClassicEditor;
  sid:any;
  sTitle:any;
  numQuestionsAdded: number = 0;
  //numberOfQuestions:any;
  question={
    survey:{},
    quesId:'',
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  };

  
  constructor(
    private _route:ActivatedRoute,
    private questionService:QuestionService
  ){}

  ngOnInit(): void {
      this.sid=this._route.snapshot.params['sId'];
      this.sTitle=this._route.snapshot.params['title'];
      console.log(this.sid);
      //this.question.survey['sid']=this.sid;
      (this.question.survey as any)['sid'] = this.sid; // Cast 'survey' to 'any'
  }

  formSubmit(){
    //alert('testing');
    if(this.question.content.trim()==''|| this.question.content==null)
    {
      return;
    }

    if(this.question.option1.trim()==''|| this.question.option1==null)
    {
      return;
    }
    if(this.question.option2.trim()==''|| this.question.option2==null)
    {
      return;
    }
    if(this.question.answer.trim()==''|| this.question.answer==null)
    {
      return;
    }
    
    //form submit
    this.questionService.addQuestion(this.question).subscribe(
      (data:any)=>{
        Swal.fire('Success' ,'Question Added','success');
        this.question.content='';
        this.question.option1='';
        this.question.option2='';
        this.question.option3='';
        this.question.option4='';
        this.question.answer='';
      },
      (error)=>{
        Swal.fire('Error','Error in adding question','error');
      }
    );

  }

}
