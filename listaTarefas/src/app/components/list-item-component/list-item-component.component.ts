import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IListItems } from '../../interface/IListItems.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-item-component',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './list-item-component.component.html',
  styleUrl: './list-item-component.component.scss'
})
export class ListItemComponentComponent {

  @Input({ required: true }) public inputListItems: IListItems[] = []


  @Output() public outPutUpdateItemCheckbox = new EventEmitter<{
    checked: boolean; id: string;
  }>();

  public updateItemCheckbox(checked: boolean, id: string){
    return this.outPutUpdateItemCheckbox.emit({checked, id});
  }
}
