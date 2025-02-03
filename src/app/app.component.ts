import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from "./pages/list/list.component";

@Component({
  selector: 'app-root',
  imports: [ListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'listaTarefas';
}
