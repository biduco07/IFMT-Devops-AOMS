import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, LoginComponent],
})
export class AppComponent {
  title = 'IFMT-Devops-AOMS';
}
