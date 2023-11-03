import { Component, OnDestroy, OnInit } from '@angular/core';
import { CakeService } from '../service/cake.service';
import { Subscription } from 'rxjs';
import { User } from '../model/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: User = new User();
  profileSubscription: Subscription = new Subscription();

  constructor(private cakeService: CakeService) { }

  ngOnInit(): void {
    this.getUser();
  }

  profileForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  })

  get firstName() {
    return this.profileForm.get('firstName');
  }

  get lastName() {
    return this.profileForm.get('lastName');
  }

  get email() {
    return this.profileForm.get('email');
  }





  getUser() {
    this.profileSubscription = this.cakeService.getUser().subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: (response: any) => {
        console.log('error: ', response);
      }
    })
  }

  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe();
  }

}
