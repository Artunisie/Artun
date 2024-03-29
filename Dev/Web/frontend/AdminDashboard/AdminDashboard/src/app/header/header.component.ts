import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  sideMenu: HTMLElement | null = null;
  menuBtn: HTMLElement | null = null;
  closeBtn: HTMLElement | null = null;
  darkMode: HTMLElement | null = null;
  categoryCount: number = 0;

  constructor(private categoryService: CategoryService, private keycloakService: KeycloakService) { }

  ngOnInit() {
    this.sideMenu = document.querySelector('aside') as HTMLElement;
    this.menuBtn = document.getElementById('menu-btn') as HTMLElement;
    this.closeBtn = document.getElementById('close-btn') as HTMLElement;
    this.darkMode = document.querySelector('.dark-mode') as HTMLElement;

    if (this.menuBtn && this.closeBtn && this.sideMenu && this.darkMode) {
      this.menuBtn.addEventListener('click', () => {
        this.sideMenu!.style.display = 'block';
      });

      this.closeBtn.addEventListener('click', () => {
        this.sideMenu!.style.display = 'none';
      });

      document.body.classList.toggle('dark-mode-variables');
      this.darkMode!.querySelector('span:nth-child(1)')!.classList.toggle('active');
      this.darkMode!.querySelector('span:nth-child(2)')!.classList.toggle('active');

      this.darkMode.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode-variables');
        this.darkMode!.querySelector('span:nth-child(1)')!.classList.toggle('active');
        this.darkMode!.querySelector('span:nth-child(2)')!.classList.toggle('active');
      });

      this.addLinkClickListener('dashboard-link');
      this.addLinkClickListener('users-link');
      this.addLinkClickListener('History-link');
      this.addLinkClickListener('Analytics-link');
      this.addLinkClickListener('Categories-link');
      this.addLinkClickListener('Services-link');
      this.addLinkClickListener('Reports-link');
      this.addLinkClickListener('Settings-link');
      this.addLinkClickListener('Login-link');
      this.addLinkClickListener('logout-link');
    }
  }

  addLinkClickListener(linkId: string) {
    const link = document.getElementById(linkId) as HTMLElement;

    if (link) {
      link.addEventListener('click', (event) => this.handleLinkClick(event, linkId));
    }
  }

  handleLinkClick(event: Event, linkId: string) {
    if (linkId === 'logout-link') {
      // Prevent the default link behavior
      event.preventDefault();

      // Call the logout method when the logout link is clicked
      this.logout();
    }

    const navLinks = document.querySelectorAll('.sidebar a');
    navLinks.forEach(link => {
      link.classList.remove('active');
    });

    const clickedLink = document.getElementById(linkId);
    if (clickedLink) {
      clickedLink.classList.add('active');
    }
  }

  logout() {
    this.keycloakService.logout();
  }
}
