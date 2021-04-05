import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup
  constructor(private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.form = this.formBuilder.group({
      username: '',
      password: 'password',
    })
  }

  ngOnInit(): void {
  }

}
