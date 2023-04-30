import { Character } from './../../interfaces/character.interface';

import { Component, EventEmitter, Output } from '@angular/core';



@Component({
  selector: 'dbz-add-character',
  templateUrl: 'add-character.component.html',
  styleUrls: ['add-character.component.css'],
})

export class AddCharacterComponent  {

  @Output()
  public onNewCharacter: EventEmitter<Character> = new EventEmitter();

  public character: Character ={
    id : '',
    name: '',
    power: 0
  };

  emitCharacter(): void{
    if(this.character.name.length == 0 || this.character.power <0 ){
      return;
    }
    //debugger;
    this.onNewCharacter.emit(this.character);
    this.character = {id :'', name: '', power : 0};

  }

}
