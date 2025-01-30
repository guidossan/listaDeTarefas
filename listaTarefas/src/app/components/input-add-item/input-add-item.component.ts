import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { time } from 'console';
import { IListItems } from '../../interface/IListItems.interface';

@Component({
  selector: 'app-input-add-item',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {
  #cdr = inject(ChangeDetectorRef);

  @ViewChild('inputText') public inputText!: ElementRef;
  @Output() public outputListItens = new EventEmitter<IListItems>()
  public focusAndAddItem(value: string){
    if(value){
      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = '';


      const dataAtual = new Date();
      const timestamp = dataAtual.getTime();
      const id = `ID ${timestamp}`

      this.outputListItens.emit({
        id,
        checked: false,
        value,
      })

      return this.inputText.nativeElement.focus();


    }
  }
}
