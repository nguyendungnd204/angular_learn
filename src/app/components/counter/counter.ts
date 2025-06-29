import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.scss'
})
export class Counter {
  count = signal(0);

  increment() {
    this.count.update((val) => val + 1);
  }

  decrement() {
    this.count.update((val) => val -1);
  }

  reset() {
    this.count.set(0);
  }
}
