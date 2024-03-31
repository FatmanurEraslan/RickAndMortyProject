import { AuthService } from './pages/shared/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./pages/shared/layouts/footer/footer.component";
import { HeaderComponent } from "./pages/shared/layouts/header/header.component";
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule,RouterOutlet, FooterComponent, HeaderComponent]
})
export class AppComponent implements OnInit {
  title = 'rick-and-morty-project';
  constructor(private authService:AuthService,private db:AngularFireDatabase ){

  }
  ngOnInit(): void {
    this.authService.autoSignIn();
  }
}
