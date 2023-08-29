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
    private _question:QuestionService,
    private _user:UserService,
    private _survey: SurveyService,
  ){}


  ngOnInit(): void {
      this.preventBackButton();
      this.sId=this._route.snapshot.params['sId'];
      console.log(this.sId);
      this.loadQuestions();

      
      
  }
  loadQuestions() {
    this._question
    .getQuestionsOfSurveyForTest(this.sId)
    .subscribe(
      (data:any)=>{
        //console.log(data);
        this.questions=data;
        this.timer = this.questions.length * 2 * 60;
        // this.questions=data.map((q:any)=>({
        //   ...q,
        //   givenAnswer:null
        // })
        // ) ;
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
        this._question.evalSurvey(this.questions).subscribe(
          (data:any)=>{
            console.log(data);
            //this.marksGot=data.marksGot;
            this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
            this.correctAnswers=data.correctAnswers;
            this.attempted=data.attempted;
            this.isSubmit=true;
          },
          (error)=>{
            console.log(error);
          }
        )
        //   surveyID = this.localStorage()
        // result:Result
      }




        
        // this.isSubmit=true;
        // // console.log(this.questions);
        // this.questions.forEach((q: any)=>{
        //  if(q.givenAnswer==q.answer)
        //  {
        //    this.correctAnswers++
        //    let marksSingle =this.questions[0].survey.maxMarks/this.questions.length;
        //    this.marksGot += marksSingle;
        //  }
        //  if (q.givenAnswer !== null && q.givenAnswer.trim() !== '')
        //  {
        //    this.attempted++;
        //  }

        // });
        //  console.log("Correct Answers : "+ this.correctAnswers);
        //  console.log('Marks Got ' + this.marksGot);
        //  console.log('attempted '+this.attempted);
        //  console.log(this.questions);
       //}

      printPage(){
        window.print();
      }
      }
  


