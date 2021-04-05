import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.css']
})
export class AssistantComponent implements OnInit {
  form: FormGroup;

  constructor(private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      phonenumber: '',
    })
  }

  ngOnInit(): void {
  }

  onSubmit(feedbackForm: FormGroup) {
    this.httpClient.post("/api/assistancerequests", feedbackForm).subscribe(
      x => {
        alert("We will contact you as soon as possible!");
        this.router.navigateByUrl('/')
      }
    )
  }
}
