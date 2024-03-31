import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn = false;
  constructor(private authService: AuthService, private router: Router,
  ) {

  }
  ngOnInit(): void {
    this.authService.user.subscribe(res => {
      this.isLoggedIn = !!res;
    });

  }
  onSignOut() {
    this.authService.signOut();
  }
  goPage(name) {
    this.router.navigateByUrl('/' + name);

  }
}
