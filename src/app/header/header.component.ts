import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  sub: Subscription;

  constructor(private data: DataStorageService, private auth: AuthService) { }

  ngOnInit(): void {
    this.sub = this.auth.user.subscribe(u => {
      if(u != null) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  storeRecipes() {
    this.data.storeRecipes();
  }

  fetchRecipes() {
    this.data.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  logout() {
    this.auth.logout();
  }
}

