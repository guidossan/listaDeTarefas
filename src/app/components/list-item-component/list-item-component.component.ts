import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IListItems } from '../../interface/IListItems.interface';
import { CommonModule } from '@angular/common';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-list-item-component',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './list-item-component.component.html',
  styleUrl: './list-item-component.component.scss',
  animations: [
    trigger('trashAnimation', [
      transition(':leave', [
        animate('500ms ease-in', keyframes([
          style({ transform: 'translateY(0)', offset: 0 }),
          style({ transform: 'translateY(100px)', opacity: 0.5, offset: 0.5 }),
          style({ transform: 'translateY(200px)', opacity: 0, offset: 1 })
        ]))
      ])
    ])
  ]
})
export class ListItemComponentComponent {

  @Input({ required: true }) public inputListItems: IListItems[] = [];
  @Output() public outPutUpdateItemCheckbox = new EventEmitter<{
    checked: boolean; id: string;
  }>();

  public updateItemCheckbox(checked: boolean, id: string){
    return this.outPutUpdateItemCheckbox.emit({checked, id});
  }
  @Output() public outPutUpdateItemText = new EventEmitter<{
    value: string; id: string;
  }>();

  public updateItemText(value: string, id: string){
    return this.outPutUpdateItemText.emit({value, id});
  }
  @Output() public outPutDeleteItemText = new EventEmitter<string>();

  public deleteItemText(id: string){
    return this.outPutDeleteItemText.emit(id);
  }
}
