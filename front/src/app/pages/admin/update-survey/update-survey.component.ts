import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { SurveyService } from 'src/app/services/survey.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-survey',
  templateUrl: './update-survey.component.html',
  styleUrls: ['./update-survey.component.css']
})
export class UpdateSurveyComponent implements OnInit {

  constructor(
    private _route:ActivatedRoute,
    private surveyService:SurveyService,
    private categoryService:CategoryService,
    private _router:Router,
    ){

  }

  sid=0;
  survey: any;
  categories:any;

  
  ngOnInit(): void {

      this.sid =this._route.snapshot.params['sId'];
      this.surveyService.getSurvey(this.sid).subscribe(
        (data:any)=>{
         this.survey=data;
          console.log(this.survey);
        },
        (error)=>{
          console.log(error);
        }
      );
      this.categoryService.categories().subscribe((data:any)=>{
        this.categories=data;

      },error=>{
        alert("error in loading categories");
      });
  }

  //update form submit
  public updateData(){

  //validate
  this.surveyService.updateSurvey(this.survey).subscribe((data)=>{
    Swal.fire("Success!!",'survey updated','success').then((e)=>{
     this._router.navigate(['/admin/surveys']);
    }
    );

  },(error)=>{
    Swal.fire("Error!!",'error in updating survey','error');
    console.log(error);
  });

  }

}
