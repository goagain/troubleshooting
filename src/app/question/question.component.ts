import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { State, StateNode } from 'xstate';
import { SmService } from '../sm.service'
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questions = []
  constructor(private smService: SmService, private router: Router) { }
  machine() { return this.smService.machine }

  message() {
    let meta = this.mergeMeta(this.machine().state.meta)
    return meta['message']
  }
  picture() {
    let meta = this.mergeMeta(this.machine().state.meta)
    return meta['picture']
  }

  pictures() {
    let meta = this.mergeMeta(this.machine().state.meta)
    return meta['pictures'];
  }

  mergeMeta(meta:any): any{
    if (!meta){
      return {}
    }
    return Object.keys(meta).reduce((acc, key) => {
      const value = meta[key];

      // Assuming each meta value is an object
      Object.assign(acc, value);

      return acc;
    }, {});
  }

  ngOnInit(): void {
    console.log(this.machine().state)
  }

  onclick(option: string): void {
    console.log(option)
    this.machine().send(option)

    let meta = this.mergeMeta(this.machine().state.meta)
    if (meta.redirect) {
      this.router.navigate([meta.redirect])
    }
  }
}
