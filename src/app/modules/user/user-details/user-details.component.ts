import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'app/models/user-model';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  public user: UserModel;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.fetchUser(this.route.snapshot.params['id']);
  }

  public fetchUser(userId: number): void {
    this.userService.fetchUser(userId).subscribe(
      (user) => { this.user = user }
    )
  }



}
