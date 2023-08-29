import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewSurveysComponent } from './pages/admin/view-surveys/view-surveys.component';
import { AddSurveyComponent } from './pages/admin/add-survey/add-survey.component';
import { UpdateSurveyComponent } from './pages/admin/update-survey/update-survey.component';
import { ViewSurveyQuestionsComponent } from './pages/admin/view-survey-questions/view-survey-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartComponent } from './pages/user/start/start.component';
//import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
//import { adminGuard } from './services/admin.guard';
import { adminGuard } from './services/admin.guard';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UserResultComponent } from './pages/user/user-result/user-result.component';
import { ViewResultsComponent } from './pages/admin/view-results/view-results.component';
import { ReportComponent } from './pages/user/report/report.component';




const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full',
  },
  {
    path:'signup',
    component:SignupComponent,
    pathMatch:'full',
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full',
  },
  {
    path:'profile',
    component:ProfileComponent,
  },
  {
    path:'admin',
    component:DashboardComponent,
    canActivate:[adminGuard],
    //pathMatch:'full',
    children:[
      {
        path:'',
        component:WelcomeComponent,
      },
      // {
      //   path:'profile',
      //   component:ProfileComponent,
      // },
      { 
        path:'categories',
        component:ViewCategoriesComponent,
      },
      {
        path:'add-category',
        component:AddCategoryComponent,
      },
      {
        path:'surveys',
        component:ViewSurveysComponent,
      },
      {
        path:'add-survey',
        component:AddSurveyComponent,
      },
      {
        path:'survey/:sId',
        component:UpdateSurveyComponent,
      },
      {
        path:'view-results/:sId',
        component:ViewResultsComponent,
      },
      {
        path:'view-questions/:sId/:title',
        component:ViewSurveyQuestionsComponent,
      },
      {
        path:'add-question/:sId/:title',
        component:AddQuestionComponent,
      },
      {
        path:'question/:quesId',
        component:UpdateQuestionComponent,
      },
      
    ],
    
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    children:[
      {
        path:':catId',
        component:LoadQuizComponent,
      },
      {
        path:'instructions/:sId',
        component:InstructionsComponent,
      },
      {
        path:'user-result/:sId',
        component:UserResultComponent,
      },
      
      
    ],
  },
  {
    path:"start/:sId",
    component:StartComponent,
    //canActivate:[NormalGuard],
  },
  {
    path:"report",
    component:ReportComponent,
    
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
