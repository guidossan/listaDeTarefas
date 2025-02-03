import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../components/input-add-item/input-add-item.component';
import { IListItems } from '../../interface/IListItems.interface';
import { ListItemComponentComponent } from '../../components/list-item-component/list-item-component.component';
import { ELocalStorage } from '../../enum/ELocalStorage.enum';
import Swal from 'sweetalert2';


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
      return JSON.parse(localStorage.getItem(ELocalStorage.MY_LIST) || '[]');
    }
    return [];
  }
  #updateLocalStorage(){
    return localStorage.setItem(ELocalStorage.MY_LIST, JSON.stringify(this.#setListItens()))
  }

  public getInputAndAddItem(value: IListItems){

    localStorage.setItem(ELocalStorage.MY_LIST, JSON.stringify([...this.#setListItens(),value]));
    return this.#setListItens.set(this.#parseItens())
  }

  public updateItemCheckbox(newItem: {checked: boolean; id: string}){
    this.#setListItens.update((oldValue: IListItems[]) => {
      oldValue.filter((res) => {
        if(res.id === newItem.id){
          res.checked = newItem.checked;
          return res;
        }
        return res;
      });
      return oldValue;
    });
    this.#updateLocalStorage()
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

  public updateItemText(newItem:{value: string, id: string}){
    this.#setListItens.update((oldValue: IListItems[]) => {
      oldValue.filter((res) => {
        if(res.id === newItem.id){
          res.value = newItem.value;
          return res;
        }
        return res;
      });
      return oldValue;
    });
    this.#updateLocalStorage()
  }
  public deleteAllItens(){

    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, delete todos!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem(ELocalStorage.MY_LIST);
        return this.#setListItens.set(this.#parseItens());
      }
    });
  }
  public deleteItemText(id: string){
    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, delete o item!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.#setListItens.update((oldValue: IListItems[])=>{
          return oldValue.filter((res) => res.id !==id);
        })
        this.#updateLocalStorage()
      }
    });


  }
}
