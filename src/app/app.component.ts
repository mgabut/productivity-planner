import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from './core/authentication.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'productivity-planner';

  readonly #authenticationService = inject(AuthenticationService)

  onLogin(){
    const email = 'john.doe@gmail.com'
    const password = 'qwertz'

    this.#authenticationService.login(email, password)
    .subscribe((response) => {console.log(response)})
  }
}
