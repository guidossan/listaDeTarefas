import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { IListItems } from '../../interface/IListItems.interface';

@Component({
  selector: 'app-list',
  standalone:true,
  imports: [CommonModule,InputAddItemComponent],
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

  public deleteAllItens(){
    localStorage.removeItem('@my-list');
    return this.#setListItens.set(this.#parseItens());
  }
}
