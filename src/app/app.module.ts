import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {LoginComponent} from './login/login.component';
import {SignUpComponent }  from'./login/sign-up.component';
import { AppRoutingModule } from './app-routing';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentComponent } from './Blog/content-details.component';
import { BlogListComponent } from './Blog/blog-list.component';
import { AuthInterceptor } from './services/AuthInterceptor';
import { ReadMoreComponent } from './read-more/read-more.component';
import { CommentComponent } from './Blog/comment.compoent';
import { NavMenuComponent } from './navbar/navbar-menu.component';
import { NgxSmartModalModule,NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrModule } from 'ngx-toastr';
import { ModalComponent } from './modal/modal.component';
@NgModule({
  declarations: [
    AppComponent,LoginComponent,SignUpComponent,ContentComponent,
    BlogListComponent,ReadMoreComponent, CommentComponent,NavMenuComponent, ModalComponent

    ],
  imports: [
    BrowserModule,AppRoutingModule,HttpClientModule,FormsModule,
    ReactiveFormsModule,BrowserAnimationsModule, 
    ToastrModule.forRoot()  ,NgxSmartModalModule.forRoot()
    ],
  providers: [NgxSmartModalService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }