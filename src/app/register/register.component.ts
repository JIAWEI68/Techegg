import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { select } from '../select';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  register!: FormGroup;
  index: number = 0;
  selectedValue!: string;
  selectList: select[] = [
    { value: 'Student' },
    {
      value: 'Teacher',
    },
    { value: 'Office Worker' },
    { value: 'Admin' },
  ];
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.register = this.fb.group({
      username: '',
      firstName : '',
      lastName : '',
      email : '',
      password: '',
      role: '',
    });
  }
  onSubmit() {
    this.authService
      .regUser(
        this.register.value.username,
        this.register.value.firstName,
        this.register.value.lastName,
        this.register.value.email,
        this.register.value.password,
        this.register.value.role
      )
      .subscribe();
    this.router.navigateByUrl('/login');
  }
}
