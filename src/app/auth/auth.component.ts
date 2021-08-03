import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoading = false;
  error: string = null;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if(!form.valid)
      return;

    this.isLoading = true;
    let email = form.value['email'];
    let password = form.value['password'];
    this.auth.signIn(email, password).subscribe(r => {
      this.isLoading = false;
      this.router.navigate(['/recipes'])
    }, error => {
      this.error = "An error occurred";
      this.isLoading = false;
    });
    form.reset();
  }

  onSignup(form: NgForm) {
    if(!form.valid)
      return;

    this.isLoading = true;
    let email = form.value['email'];
    let password = form.value['password'];
    this.auth.signUp(email, password).subscribe(r => {
      this.isLoading = false;
      this.router.navigate(['/recipes'])
    }, error => {
      this.error = "An error occurred";
      this.isLoading = false;
    });
    form.reset();
  }

}
