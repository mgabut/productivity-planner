import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../core/authentication.service';

@Component({
  imports: [FormsModule],
  templateUrl: './signin.page.component.html',
  styleUrl: './signin.page.component.scss'
})
export class SigninPageComponent {
  readonly authenticationService = inject(AuthenticationService);
  
  readonly email = signal('');
  readonly password = signal('');

  onSubmit() {
    console.log('Form submitted');

    this.authenticationService
      .login(this.email(), this.password())
      .subscribe((response) => {
        console.log('User logged', response.userId);
      })
  }
}
