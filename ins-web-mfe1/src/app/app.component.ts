import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InsUserComponent } from './insurance/ins-user.component';

@Component({
  selector: 'app-root',
  imports: [ InsUserComponent],
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = 'ins-web-mfe1';
}
