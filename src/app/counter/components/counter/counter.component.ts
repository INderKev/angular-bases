import { Component } from "@angular/core"


@Component({
  selector: 'app-counter',
  template: `
    <h3> {{ title}} </h3>
    <h2> {{ counter }} </h2>
    <button (click)="increseBy(1)">+1</button>
    <button (click)="resetCounter()">reset</button>
    <button (click)="increseBy(-1)">-1</button>
  `

})
export class CounterComponent{
  public title: string = 'Hola mundo';
  public counter: number = 10;

  increseBy(value: number):void{
    this.counter +=value;
  }

  resetCounter(): void{
    this.counter = 10;
  }
}
