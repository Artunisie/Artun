// src/app/users/users.component.ts

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [DatePipe],
})
export class UsersComponent implements OnInit {
  newUsers: any[] = [];

  constructor(
    private userService: UserService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        this.newUsers = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  calculateTimeAgo(createdAt: string): string {
    const createdDate = new Date(createdAt);
    const now = new Date();

    const seconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
      const formattedDate = this.datePipe.transform(createdDate, 'medium');
      return formattedDate || ''; // Handle possible null
    }

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      const formattedDate = this.datePipe.transform(createdDate, 'medium');
      return formattedDate || ''; // Handle possible null
    }

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval === 1 ? 'Yesterday' : `${interval} days ago`;
    }

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval === 1 ? 'an hour ago' : `${interval} hours ago`;
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval === 1 ? 'a minute ago' : `${interval} minutes ago`;
    }

    return 'last month';
  }

  viewUserProfile(userId: string): void {
    this.router.navigate(['/user-profile', userId]);
  }
}
