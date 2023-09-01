import { Component,OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { SurveyService } from 'src/app/services/survey.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-surveys',
  templateUrl: './view-surveys.component.html',
  styleUrls: ['./view-surveys.component.css']
})
export class ViewSurveysComponent implements OnInit{

  surveys=[
    {
      sid:'',
      title:'',
      description:'',
      maxMarks:'',
      numberOfQuestions:'',
      active:'',
      category:{
        title:'',
      },
    },
    ];

    keyword='';
  constructor(private surveyService:SurveyService,
     private questionService:QuestionService){}

  
  ngOnInit(): void {
    this.surveyService.surveys().subscribe(
    (data:any)=>{
      this.surveys=data;
      console.log(this.surveys);
    },
    (error)=>{
      console.log(error);
      Swal.fire('Error!','Error in loading data!','error');
    }
    );
  
  }

  //delete survey
  deleteSurvey(sid:any){
    Swal.fire({
      icon:'info',
      title:"Are you sure?",
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        //delete
        this.surveyService.deleteSurvey(sid).subscribe(
          (data)=>{
            this.surveys = this.surveys.filter((survey)=>survey.sid!=sid);
            Swal.fire('Success','Survey Deleted!','success');
          },(error)=>{
            Swal.fire('Error','Error in deleting survey!','error');
          }
        ); 
      }
    }
    );
  }


performSearch(){
  this.surveyService.searchSurveys(this.keyword).subscribe(
    (data: any) => {
      this.surveys = data;
      console.log(this.surveys);
    },
    (error) => {
      console.log(error);
      alert("Error in searching surveys");
    }
  );

}
}

