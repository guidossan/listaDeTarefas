import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { IListItems } from '../../interface/IListItems.interface';
import { ListItemComponentComponent } from '../../components/list-item-component/list-item-component.component';

@Component({
  selector: 'app-list',
  standalone:true,
  imports: [CommonModule,InputAddItemComponent,ListItemComponentComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public addItem = signal(true);

  #setListItens = signal<IListItems[]>(this.#parseItens());
  public getListItens= this.#setListItens.asReadonly();

  #parseItens(){
    if (typeof localStorage !== 'undefined') {
      return JSON.parse(localStorage.getItem('@my-list') || '[]');
    }
    return [];
  }


  public getInputAndAddItem(value: IListItems){

    localStorage.setItem('@my-list', JSON.stringify([...this.#setListItens(),value]));
    return this.#setListItens.set(this.#parseItens())
  }

  public updateItemCheckbox(newItem: {checked: boolean; id: string}){
    this.#setListItens.update((oldValue: IListItems[]) => {
      oldValue.filter(res => {
        if(res.id === newItem.id){
          res.checked = newItem.checked;
          return res;
        }
        return res;
      });
      return oldValue;
    });
    return localStorage.setItem('@my-list', JSON.stringify(this.#setListItens()))
  }

  public listItemsStage(value: 'pending' | 'completed'){
    return this.getListItens().filter((res: IListItems) => {
      if(value === 'pending'){
        return !res.checked;
      }
      if(value === 'completed'){
        return res.checked;
      }
      return res;
    })
  }

  public deleteAllItens(){
    localStorage.removeItem('@my-list');
    return this.#setListItens.set(this.#parseItens());
  }
}
