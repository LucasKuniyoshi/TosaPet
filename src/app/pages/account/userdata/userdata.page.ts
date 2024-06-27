import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/model/entities/User';
import { AuthService } from 'src/app/model/services/auth.service';
import { UserfirebaseService } from 'src/app/model/services/userfirebase.service';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.page.html',
  styleUrls: ['./userdata.page.scss'],
})
export class UserdataPage implements OnInit {
  user: User | undefined;

  constructor(
    private router: Router,
    private auth: AuthService,
    private userService: UserfirebaseService
  ) {}

  ngOnInit() {
    this.auth.getUserLogged().subscribe(user => {
      if (user && user.uid) {
        this.userService.getUser(user.uid).subscribe((userData: User | undefined) => {
          this.user = userData;
          console.log('User loaded:', this.user);
        });
      } else {
        console.error('User UID is undefined');
      }
    });
  }

}
