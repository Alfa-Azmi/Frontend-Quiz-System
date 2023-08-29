import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {MatListModule} from '@angular/material/list';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
//import { authInterceptorProviders } from './services/auth.interceptor';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import {MatDividerModule} from '@angular/material/divider';
import { AuthInterceptor, authInterceptorProviders } from './services/auth.interceptor';
import { ViewSurveysComponent } from './pages/admin/view-surveys/view-surveys.component';
import { AddSurveyComponent } from './pages/admin/add-survey/add-survey.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import { UpdateSurveyComponent } from './pages/admin/update-survey/update-survey.component';
import { ViewSurveyQuestionsComponent } from './pages/admin/view-survey-questions/view-survey-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SidebarComponent as UserSideBar } from './pages/user/sidebar/sidebar.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { StartComponent } from './pages/user/start/start.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UserResultComponent } from './pages/user/user-result/user-result.component';
import { ViewResultsComponent } from './pages/admin/view-results/view-results.component';
import { DatePipe } from '@angular/common';
import { ReportComponent } from './pages/user/report/report.component';
import { SearchPipe } from './search.pipe';

//import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
//import { AdminGuard } from './services/admin.guard';
//import { authInterceptorProviders } from './services/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    WelcomeComponent,
    ViewCategoriesComponent,
    AddCategoryComponent,
    ViewSurveysComponent,
    AddSurveyComponent,
    UpdateSurveyComponent,
    ViewSurveyQuestionsComponent,
    AddQuestionComponent,
    UserSideBar,
    LoadQuizComponent,
    StartComponent,
    InstructionsComponent,
    UpdateQuestionComponent,
    UserResultComponent,
    ViewResultsComponent,
    ReportComponent,
    SearchPipe,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    CKEditorModule,
    MatProgressSpinnerModule,
    DatePipe,
   
  ],
  providers: [authInterceptorProviders,DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
