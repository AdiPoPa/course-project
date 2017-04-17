import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadedSelection = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyCs_YOIz5dw4q6v1wvOQDl3rKoTGt9jlEE",
      authDomain: "ng-course-project.firebaseapp.com"
    })
  }

  onNavigate(selection: string) {
    this.loadedSelection = selection;
    console.log('navigating to ' + selection);
  }

}
