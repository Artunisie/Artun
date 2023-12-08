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
    this.sideMenu = document.querySelector('aside');
    this.menuBtn = document.getElementById('menu-btn');
    this.closeBtn = document.getElementById('close-btn');
    this.darkMode = document.querySelector('.dark-mode');

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
    }
  }

}