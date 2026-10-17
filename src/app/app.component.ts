import { Component, ChangeDetectionStrategy } from '@angular/core';

import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [LoginComponent],
})
export class AppComponent {
  title = 'IFMT-Devops-AOMS';
}
