import { inject, Injectable } from '@angular/core';
import { User, Visitor } from '../entity/user.interface';
import { AuthenticationService } from '../authentication.service';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../repository/user.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserUseCaseService {
  readonly #authenticationService = inject(AuthenticationService);
  readonly #userService = inject(UserService);

  async execute(visitor: Visitor): Promise<User> {
    // Authentication : 1 & 2
    const response = await firstValueFrom(this.#authenticationService.register(visitor.email, visitor.password));

    //Session storage : 3
    localStorage.setItem('jwtToken', response.jwtToken);
    localStorage.setItem('jwtRefreshToken', response.jwtRefreshToken);
    localStorage.setItem('expiresIn', response.expiresIn);

    //Session 4 & 5
    const user: User = {
      id: response.userId,
      email: visitor.email,
      name: visitor.name
    };
    
    await this.#userService.create(user, response.jwtToken);

    return user;
  }
}
