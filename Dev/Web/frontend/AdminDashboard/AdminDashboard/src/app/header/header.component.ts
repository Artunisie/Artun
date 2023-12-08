import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  sideMenu: HTMLElement | null = null;
  menuBtn: HTMLElement | null = null;
  closeBtn: HTMLElement | null = null;
  darkMode: HTMLElement | null = null;

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

      this.darkMode.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode-variables');
        this.darkMode!.querySelector('span:nth-child(1)')!.classList.toggle('active');
        this.darkMode!.querySelector('span:nth-child(2)')!.classList.toggle('active');
      });

      this.addLinkClickListener('dashboard-link');
      this.addLinkClickListener('users-link');
      // Add listeners for other links as needed
      // ...
    }
  }

  addLinkClickListener(linkId: string) {
    const link = document.getElementById(linkId) as HTMLElement;

    if (link) {
      link.addEventListener('click', () => this.handleLinkClick(link));
    }
  }

  handleLinkClick(clickedLink: HTMLElement) {
    // Remove "active" class from all links
    const navLinks = document.querySelectorAll('.sidebar a');
    navLinks.forEach(link => {
      link.classList.remove('active');
    });

    // Add "active" class to the clicked link
    clickedLink.classList.add('active');
  }
}
