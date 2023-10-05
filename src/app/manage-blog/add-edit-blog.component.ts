import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../Services/auth.service';
import {blog} from '../model/blog';
import { ToasterService } from '../services/toaster.service';

@Component(
    { 

    templateUrl: "./add-edit-blog.component.html"}
    )
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
blogData:blog;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private service: AuthService,
        private toast:ToasterService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        
    
        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            content: ['', Validators.required],
            blogId: [0],
        });

        if (!this.isAddMode) {

            this.service.getBlogById(this.id)
            .pipe(first())
            .subscribe(user  => {
                this.blogData=user;

                this.form.controls['title'].setValue(this.blogData.title);
                this.form.controls['description'].setValue(this.blogData.description);
                this.form.controls['content'].setValue(this.blogData.content);
                this.form.controls['blogId'].setValue(this.blogData.blogId);
                
            });
        }
    }

    get f() { return this.form.controls; }

    onSubmit() {
       
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createUser();
        } else {
            this.updateBlogData();
        }
    }

    private createUser() {

        this.form.addControl('userId', new FormControl(sessionStorage['userId']));
        this.service.addBlog(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
             this.toast.success('Blog Added successfully',"Blog");
                    this.router.navigate(['.', { relativeTo: this.route }]);
                },
                error => {
                   this.toast.error('Blog Failed to Add',"Blog");
                    this.loading = false;
                });
    }

    updateBlogData() {
        this.form.addControl('userId', new FormControl(sessionStorage['userId']))
        this.service.updateBlog( this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    
                    this.router.navigate(['..', { relativeTo: this.route }]);
                    this.toast.success('Blog Updated Successfully',"Blog");
                },
                error => {
                   console.log(error(error));
                    this.loading = false;
                    this.toast.success('Blog Failed to Update',"Blog");
                });
    }
}