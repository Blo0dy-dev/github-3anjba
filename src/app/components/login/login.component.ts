import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { ValidationService } from '../../services/config/config.service';
import { UserService } from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../services/config/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [routerTransition()],
  host: { '[@routerTransition]': '' },
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: [
        '',
        [Validators.required, ValidationService.passwordValidator],
      ],
    });
  }

  // Check if user already logged in
  ngOnInit() {
    if (localStorage.getItem('userData')) {
      this.router.navigate(['/']);
    }
  }

  // Initicate login
  doLogin() {
    let login = this.userService.doLogin(this.loginForm.value);
    this.success(login);
  }

  // Login success function
  success(data: any) {
    if (data.code == 200) {
      localStorage.setItem('userData', JSON.stringify(data.data));
      this.router.navigate(['/']);
      this.toastr.success('Oznam', 'Prihlásenie bolo úspešné');
    } else {
      this.toastr.error('Chyba', 'Nesprávne meno alebo heslo ');
    }
  }
}
