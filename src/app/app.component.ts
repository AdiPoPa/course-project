import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loadedSelection = 'recipe';

  onNavigate(selection: string) {
    this.loadedSelection = selection;
    console.log('navigating to ' + selection);
  }

}
