import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { SurveyService } from 'src/app/services/survey.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.css']
})
export class AddSurveyComponent implements OnInit {

  categories=[
    {
      cid:'1',
      title:'Programming',
    },
    {
      cid:'2',
      title:'Programmingsss',
    },
  ];

  surveyData={
    
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:'',
    },

  };

  
  constructor(
    private categoryService:CategoryService,
    private _snack:MatSnackBar,
    private surveyService:SurveyService ){}

  ngOnInit(): void {
    this.categoryService.categories().subscribe(
      (data:any)=>{
        //categories load
        this.categories=data;
        console.log(this.categories);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error!!','error in loading data from server','error' );
      }
    );
  }

  //
  addSurvey(){
    //console.log(this.surveyData);
    if(this.surveyData.title.trim()=='' || this.surveyData.title== null)
    {
      this._snack.open("Title Required!!",'',{
        duration:3000,
      }
      );
      return;
    }

    //validation
    //call server
    this.surveyService.addSurvey(this.surveyData).subscribe(
      (data)=>{
        Swal.fire('Success','survey is added','success')
        this.surveyData={
         
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestions:'',
          active:true,
          category:{
            cid:'',
          },
      
        };
      },
      (error)=>{
        Swal.fire('Error!!', 'Error while adding survey','error')
        console.log(error);
      }
    );

  }
  
}
