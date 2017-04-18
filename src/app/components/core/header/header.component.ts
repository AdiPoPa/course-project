import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../../shared/data-storage.service';
import { Response } from '@angular/http';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService, public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe(
      (response: Response) => console.log(response)
    );
    this.router.navigate(['/recipes']);
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
    this.router.navigate(['/recipes']);
  }

  onLogout() {
    this.authService.logout();
  }

}
