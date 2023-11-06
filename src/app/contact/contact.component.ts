import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user.model';
import { Message } from '../model/message.model';
import { CakeService } from '../service/cake.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  @Input() user: User = new User();

  userMessage: Message = new Message();

  constructor(private cakeService: CakeService, private router: Router) { }

  ngOnInit() {
    this.geUser();
  }

  contactForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required]),
  })

  get name() {
    return this.contactForm.get('name');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get message() {
    return this.contactForm.get('message');
  }

  geUser() {
    this.cakeService.getUser().subscribe({
      next: (user: User) => {
        this.user = user;
        this.userMessage.name = user.firstName + ' ' + user.lastName;
        this.userMessage.email = user.email;

        this.contactForm.patchValue(this.userMessage);
      },
      error: (response: any) => {
        console.log('error: ', response);
      }
    })
  }

  sendMessage() {
    this.userMessage = new Message(this.contactForm.value);
    this.cakeService.postMessage(this.userMessage).subscribe((message: Message) => {
      this.router.navigate(['/cakes']);
    });
  }


}
