import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { getAuth } from "firebase/auth";

import * as auth from 'firebase/auth';
import { MemberService } from './member.service';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public userClaims: any;
    // private allowedEmails = ['ghorbel.yasmine@enis.tn', 'anotheruser@example.com']; // Liste des emails autorisés
    private userRole: string | null = null;
    private isLoggedInStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private userId :number =0;

    constructor(public afAuth: AngularFireAuth, private memberService: MemberService) {
      this.afAuth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            await this.checkUserAuthorization(user);
            console.log('User is logged in and authorized');
            this.isLoggedInStatus.next(true);
          } catch (error) {
            console.log('User is not authorized:', error);
            this.isLoggedInStatus.next(false);
            await this.afAuth.signOut(); // Sign out unauthorized users
          }
        } else {
          console.log('User is logged out');
          this.isLoggedInStatus.next(false);
        }
      });
    }
  
    // Méthode de connexion Google
    doGoogleLogin(): Promise<any> {
      return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
        .then((result) => {
          const user = result.user;
          if (user) {
            // Vérifier si l'utilisateur est autorisé
            if (user.email == "cherif.youssef@enis.tn"){
              this.userRole = 'admin';
            }
            else {
              this.userRole = 'user';
            }
            return this.checkUserAuthorization(user);
          } else {
            return Promise.reject('No user logged in');
          }
        })
        .catch((error) => {
          console.error('Error during Google login:', error);
          return Promise.reject(error);
        });
    }

    
      // Connexion manuelle avec email et mot de passe
      doManualLogin(email: string, password: string): Promise<any> {
        return this.afAuth.signInWithEmailAndPassword(email, password)
          .then((result) => {
            const user = result.user;
            if (user) {
              return this.checkUserAuthorization(user);
            } else {
              return Promise.reject('No user logged in');
            }
          })
          .catch((error) => {
            console.error('Error during manual login:', error);
            return Promise.reject(error);
          });
      }
    // Vérifier si l'utilisateur est autorisé
    // private checkUserAuthorization(user: any): Promise<any> {
    //   const userEmail = user.email;
    //   this.memberService.getMemberByEmail(userEmail).subscribe(
    //     (reponse)=>{
    //       this.setUserClaims(user);
    //       console.log(this.userClaims)
    //       return Promise.resolve(user);
    //     },
    //     (error)=>{
    //       return Promise.reject('User is not authorized');
    //     })
    //   // if (this.allowedEmails.includes(userEmail)) {
    //   //   // Utilisateur autorisé, vous pouvez continuer à définir les informations de l'utilisateur
    //   //   this.setUserClaims(user);
    //   //   console.log(this.userClaims)
    //   //   return Promise.resolve(user);
    //   // } else {
    //   //   // Utilisateur non autorisé
    //   //   return Promise.reject('User is not authorized');
    //   // }
    // }
    private checkUserAuthorization(user: any): Promise<any> {
      const userEmail = user.email;
    
      return new Promise((resolve, reject) => {
        this.memberService.getMemberByEmail(userEmail).subscribe(
          (response) => {
            this.setUserClaims(user);
            this.memberService.setToken(user.multiFactor.user.accessToken)
            this.memberService.setUserType(response.type)
            this.memberService.setIdUser(response.id)
            this.memberService.saveIdAndUserType(user.multiFactor.user.accessToken,response.type,response.id)
            this.userId = response.id;
            resolve(user); // Résolution de la promesse avec l'utilisateur

          },
          (error) => {
            reject('User is not authorized'); // Rejet de la promesse en cas d'erreur
          }
        );
      });
    }
    
    // Autres méthodes comme la gestion des claims et des tokens...
    getUserClaims(): Promise<any> {
      return new Promise<any>((resolve, reject) => {
        this.afAuth.onAuthStateChanged((user) => {
          if (user) {
            this.setUserClaims(user);
            resolve(user);
          } else {
            reject('No user logged in');
          }
        });
      });
    }
  
    setUserClaims(user: any): void {
      this.userClaims = user;
    }
  
    // Méthode de déconnexion
    doLogout(): Promise<void> {
                return new Promise<void>((resolve, reject) => {
                    if (!!this.afAuth.currentUser) {
                        this.afAuth.signOut().then(() => {
                            this.setUserClaims(null);
                            resolve();
                        }, err => reject(err));
                    } else {
                        reject();
                    }
                });
            }
    getUserRole(): string | null {
      // Cette logique peut être remplacée par une récupération depuis un token décrypté.
      return this.userRole;
    }
  
    // Simule la connexion et définit le rôle
    loginAs(role: string) {
      this.userRole = role;
    }
  
    logout() {
      this.userRole = null;
    }

  authStatusListener(): Observable<boolean> {
    return this.isLoggedInStatus.asObservable(); // Retourne l'observable pour s'abonner dans le composant
  }
  getLoginStatus(): boolean {
    return this.isLoggedInStatus.value; // Retourne l'état actuel de connexion
  }
  getUserId():number{
    return this.userId;
  }
  
}



















//     public userClaims: any;
//   //  public userClaims$ = new Subject<any>();
//     constructor(
//         public afAuth: AngularFireAuth,
//     ) { }
//     getUserClaims(): Promise<any> {
//         return new Promise<any>((resolve, reject) => {
//             this.afAuth.onAuthStateChanged(user => {
//                 if (!!user) {
//                     this.setUserClaims(user);
//                     resolve(user);
//                 } else {
//                     reject('No user logged in');
//                 }
//             });
//         });
//     }

//     getUserToken(): Promise<string> {
//         return new Promise<string>((resolve, reject) => {
//             this.afAuth.onAuthStateChanged(user => {
//                 if (!!user) {
//                     user.getIdToken().then(token => resolve(token)).catch(() => reject('No token Available.'));
//                 } else {
//                     reject('No user logged in');
//                 }
//             });
//         });
//     }

//     setUserClaims(user: any): void {
//         this.userClaims = user;
//     //    this.userClaims$.next(user);
//     }
//     doGoogleLogin(): Promise<any> {
//         console.log(this.userClaims)
//         return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
//     }

//     doLogout(): Promise<void> {
//         return new Promise<void>((resolve, reject) => {
//             if (!!this.afAuth.currentUser) {
//                 this.afAuth.signOut().then(() => {
//                     this.setUserClaims(null);
//                     resolve();
//                 }, err => reject(err));
//             } else {
//                 reject();
//             }
//         });
//     }

// }
 