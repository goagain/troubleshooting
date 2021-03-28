import { Injectable } from '@angular/core';
import { interpret, Machine, StateMachine } from 'xstate'
import { TS_Machine } from './tsMachine';

@Injectable({
  providedIn: 'root'
})
export class SmService {
  public machine = interpret(TS_Machine)
  constructor() {
    this.machine.start()
  }
}
