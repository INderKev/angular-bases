import { Component, Input, EventEmitter, Output} from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'dbz-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css']
})

export class ListDBZComponent   {

  @Output()
  public deleteCharacter: EventEmitter<string> = new EventEmitter();

  @Input()
  public characterList: Character [] = [];

  onDeleteCharacter(id: string): void {
    this.deleteCharacter.emit(id);
  }
}
