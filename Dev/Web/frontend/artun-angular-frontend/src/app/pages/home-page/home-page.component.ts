import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OptionCliProfessComponent } from '../../components/option-cli-profess/option-cli-profess.component';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements AfterViewInit {


  @ViewChild('about') aboutSection!: ElementRef;
  @ViewChild('services') servicesSection!: ElementRef;
  @ViewChild('contact') contactSection!: ElementRef;

  constructor(public dialog: MatDialog, private router: Router) {}

  ngAfterViewInit() {
    $(document).ready(() => {
      $('.gallery').featherlightGallery({
        previousIcon: '«',
        nextIcon: '»',
        galleryFadeIn: 100,
        galleryFadeOut: 300
      });
    });
  }

  ngOnInit(): void {}



  login() {
    this.router.navigate(['/login_register', { mode: 'login' }]);
  }

  signup() {
    const dialogRef = this.dialog.open(OptionCliProfessComponent, {
      width: 'auto',
    });
  }

  scrollTo(section: keyof HomePageComponent) {
    const targetSection = this[section];
    if (targetSection instanceof ElementRef) {
      targetSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
