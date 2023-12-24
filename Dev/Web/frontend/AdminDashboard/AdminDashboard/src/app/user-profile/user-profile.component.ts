import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');

    if (userId !== null) {
      this.userService.getUserById(userId).subscribe(
        (user) => {
          this.user = user;
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
      console.log(userId);
    } else {
      console.error('User ID is null.');
    }
  }

  blockUser(userId: string): void {
    this.userService.blockUser(userId).subscribe(
      () => {
        console.log('User blocked successfully');
        this.user.isBlocked = true;
      },
      (error) => {
        console.error('Error blocking user:', error);
      }
    );
  }

  unblockUser(userId: string): void {
    this.userService.unblockUser(userId).subscribe(
      () => {
        console.log('User unblocked successfully');
        this.user.isBlocked = false;
      },
      (error) => {
        console.error('Error unblocking user:', error);
      }
    );
  }

  deleteUser(userId: string): void {
    // Assuming you have a deleteUser method in your UserService
    this.userService.deleteUser(userId).subscribe(
      () => {
        console.log('User deleted successfully');
        // Handle successful deletion (e.g., navigate to a different page)
      },
      (error) => {
        console.error('Error deleting user:', error);
        // Handle error (e.g., show an error message)
      }
    );
    this.router.navigate(['/dashboard']);

  }

}