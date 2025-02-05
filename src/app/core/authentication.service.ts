import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

interface FirebaseResponseSignUp{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}
interface FirebaseResponseSignIn{
  displayName: string;
  email: string;
  expiresIn: string;
  idToken: string;
  localId: string;
  refreshToken: string;
  registered: boolean
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  readonly #http = inject(HttpClient)
  
  register(email: string, password: string): Observable<FirebaseResponseSignUp> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.apiKey}`;
    const body = { email, password, returnSecureToken: true };
    
    return this.#http.post<FirebaseResponseSignUp>(url, body);
  }

  login(email: string, password: string): Observable<FirebaseResponseSignIn> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`;
    const body = { email, password, returnSecureToken: true };
  
    return this.#http.post<FirebaseResponseSignIn>(url, body) 
  }

  save (email: string, userId: string, bearerToken: string): Observable<unknown>{
    const baseUrl = `https://firestore.googleapis.com/v1/projects/${environment.firebaseConfig.projectId}/databases/(default)/documents`
    
    const userFirestoreCollectionId = 'users'
    const Url = `${baseUrl}/${userFirestoreCollectionId}?key=${environment.firebaseConfig.apiKey}&documentId=${userId}`

    const body = {
      fields: {
        email: {stringValue: email}
      }
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${bearerToken}`
    })
    const options = { headers} ;

    return this.#http.post<unknown>(Url, body, options)
  }
}
/*
https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]
AIzaSyAZE7hGzoxsIITViYGzZZy5v90ocRvXhbo
*/