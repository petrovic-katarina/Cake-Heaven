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

  newUser: User = new User();
  newUserSubscription: Subscription = new Subscription();
  edit: boolean = false;

  constructor(private cakeService: CakeService) { }

  ngOnInit(): void {
    this.getUser();
    this.profileForm.disable();
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
      next: (response: any) => {
        this.user = response;
        this.profileForm.patchValue(this.user);
      },
      error: (response: any) => {
        console.log('error: ', response);
      }
    })
  }

  onEditCliked() {
    this.edit = true;
    this.newUser = new User(this.profileForm.value);
    this.profileForm.enable();
  }

  onCancelCliked() {
    this.profileForm.patchValue(this.user);
    this.edit = false;
    this.profileForm.disable();
  }

  onOkCliked() {
    let newUser: User = new User(this.profileForm.value);
    newUser._id = this.user._id;

    this.newUserSubscription = this.cakeService.changeUserData(newUser).subscribe({
      next: (response: any) => {
        this.edit = false;
        this.user = newUser;
      },
      error: (response: any) => {
        console.log('error: ', response);
      }
    });
  }


  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe();
    this.newUserSubscription.unsubscribe();
  }

}
