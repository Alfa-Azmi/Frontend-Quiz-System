import { Component,OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories = [
    {
      cid:'23',
      title:'programming',
      description:'this is testing category',
    },
    {
      cid:'23',
      title:'gk',
      description:'this is testing category',
    },
    {
      cid:'23',
      title:'practice',
      description:'this is testing category',
    },
  ];

  //data:any
  constructor(private categoryService:CategoryService){}

  ngOnInit():void {
    this.categoryService.categories().subscribe((data:any)=>{
      //css
      this.categories=data;
      console.log(this.categories);
    },
    (error)=>{
      //
      console.log(error);
      Swal.fire("Error!!","Error in loading data",'error');
    });
  }

}
