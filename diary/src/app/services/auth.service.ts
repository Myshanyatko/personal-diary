import { getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { Firestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firestore: Firestore, private router: Router) { }

login(email: string, password: string){
  const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredentinals) => {
    sessionStorage.setItem('email', userCredentinals.user.uid)
   this.router.navigate(['/'])
  })
  
}
logout(){
  const auth = getAuth();
signOut(auth).then(() => {
  sessionStorage.removeItem('email')
  this.router.navigate(['auth'])
}).catch((error) => {
  // An error happened.
});
}

}
