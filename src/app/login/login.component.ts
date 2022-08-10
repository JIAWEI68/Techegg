import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  results: any = false;
  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      username: '',
      password: '',
    });
  }
  onSubmit() {
    this.authService.authUser(this.loginFormGroup.value.username,
    this.loginFormGroup.value.password).subscribe(data => {
    this.results = data;
    if (this.results[0].auth)
    {
    this.authService.setSecureToken(this.loginFormGroup.value.username);
    this.authService.setUserRole(this.results[0].role);
    this.router.navigateByUrl('/user');
    } else{
    console.log("Wrong username or password")
    }
    });
    }

}
