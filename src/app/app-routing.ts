import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { SignUpComponent } from './login/sign-up.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './guard/auth.guard';
import { BlogListComponent } from './Blog/blog-list.component';
import { ContentComponent } from './Blog/content-details.component';
const usersModule = () => import('./manage-blog/users.module').then(x => x.UsersModule);
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {component:BlogListComponent,path:'',canActivate:[AuthGuard]},
  {component:BlogListComponent,path:'dashboard',canActivate:[AuthGuard]},
  {component:SignUpComponent,path: 'sign-up'},
  {component: ContentComponent , path: 'blogs/:blogId',canActivate:[AuthGuard] },
  { path: 'angualar-blog', loadChildren: usersModule, canActivate: [AuthGuard] },

   { component: BlogListComponent,path: '' ,canActivate: [AuthGuard] }
];

  
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }