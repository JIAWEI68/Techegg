import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register !: FormGroup;
  selectList : string[] = ['Student', 'Teacher', 'Office Worker'];
  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.register = this.fb.group({
      username: '',
      password: '',
      role: '',
    });
  }
  onSubmit() {
    this.authService.regUser(this.register.value.username,
    this.register.value.password, this.register.value.role).subscribe();
    this.router.navigateByUrl('/login');
    }

}
