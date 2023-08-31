import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { SurveyService } from 'src/app/services/survey.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  sId:any;
  questions:any;
  q: any;
 
  marksGot=0;
  correctAnswers=0;
  attempted=0;

  isSubmit=false;

  timer:any;

  constructor(
    private locationSt:LocationStrategy,
    private _route:ActivatedRoute,
    private questionService:QuestionService,
    private userService:UserService,
    private surveyService: SurveyService,
  ){}


  ngOnInit(): void {
      this.preventBackButton();
      this.sId=this._route.snapshot.params['sId'];
      console.log(this.sId);
      this.loadQuestions();    
  }
  loadQuestions() {
    this.questionService
    .getQuestionsOfSurveyForTest(this.sId)
    .subscribe(
      (data:any)=>{
        this.questions=data;
        this.timer = this.questions.length * 2 * 60;
        console.log(this.questions);
        this.startTimer();

      },
      (error)=>{
        console.log(error);
        Swal.fire("Error","Error in loading questions of quiz!",'error'
        
        );
      }
    );
  }

      preventBackButton()
      {
        history.pushState(null,location.href);
        this.locationSt.onPopState(()=>{
          history.pushState(null,location.href);
        });
      }

      submitSurvey()
      {
        Swal.fire({
          title: 'Do you want to submit the quiz?',
          
          showCancelButton: true,
          confirmButtonText: 'Submit',
          icon:'info',
        }).then((e)=>{
          if(e.isConfirmed){
           this.evalSurvey();
          }
        });
      }

      startTimer()
      {
        let t= window.setInterval(()=>{
          //code
          if(this.timer<=0){
            this.evalSurvey();
            clearInterval(t);
          }else{
            this.timer--;
          }
        },1000)
      }

      getFormattedTime(){
        let mm=Math.floor(this.timer/60);
        let ss= this.timer-mm*60;;
        return `${mm} min : ${ss} sec`;
      }

      evalSurvey(){
        //call to server to check questions
        this.questionService.evalSurvey(this.questions).subscribe(
          (data:any)=>{
            console.log(data);
            this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
            this.correctAnswers=data.correctAnswers;
            this.attempted=data.attempted;
            this.isSubmit=true;
          },
          (error)=>{
            console.log(error);
          }
        )
        
      }  
      printPage(){
        window.print();
      }
      }
  


