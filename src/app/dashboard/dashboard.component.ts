import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface RequestDetail {
  id: number

  name: string

  phoneNumber: string

  email: string

  date: Date

  state: number
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {

  list: RequestDetail[]
  constructor(private httpClient: HttpClient) {
    this.list = []
    httpClient.get<RequestDetail[]>('/api/assistancerequests').subscribe(
      x => this.list = x
    )
  }

  processing(itemIndex: number) {
    let copy = this.list[itemIndex]
    copy.state = 1
    this.httpClient.put('/api/AssistanceRequests/' + this.list[itemIndex].id,
      this.list[itemIndex]).subscribe(
        () => this.list[itemIndex] = copy,
        error => alert(error.message),
      )
  }

  solved(itemIndex: number) {
    let copy = this.list[itemIndex]
    copy.state = 2
    this.httpClient.put('/api/AssistanceRequests/' + this.list[itemIndex].id,
      this.list[itemIndex]).subscribe(
        () => this.list[itemIndex] = copy,
        error => alert(error.message),
      )
  }

  reject(itemIndex: number) {
    let copy = this.list[itemIndex]
    copy.state = 3
    this.httpClient.put('/api/AssistanceRequests/' + this.list[itemIndex].id,
      this.list[itemIndex]).subscribe(
        () => this.list[itemIndex] = copy,
        error => alert(error.message),
      )
  }
  ngOnInit(): void {
  }

}
