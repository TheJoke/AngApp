import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//@injectable : décorateur qui permet d'injecter le service dans les composants/services 
import { Observable } from 'rxjs';
import { Member } from 'src/Models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private TOKEN_KEY = 'authToken';
  private USER_TYPE_KEY = 'userType';
  private USER_ID_KEY = 'userId';
  constructor(private http:HttpClient){}
  getAllMembers(): Observable<Member[]>
  {
    return this.http.get<Member[]>('http://localhost:9000/membres');
  }
  addEtudiant(x:Member):Observable<void>{
    return this.http.post<void>('http://localhost:9000/membres/etudiant',x);
  }
  addEnseignant(x:Member):Observable<void>{
    return this.http.post<void>('http://localhost:9000/membres/enseignant',x);
  }
  deleteMember(id:string): Observable<void> {
    return this.http.delete<void>(`http://localhost:9000/membres/${id}`);  //quote AltGr + 7
  }
  getMemberById(id:string):Observable<Member>{
    return this.http.get<Member>(`http://localhost:9000/membres/${id}`);
  }
  
  updateEtudiant(x:Member,id:string):Observable<void>{
    return this.http.put<void>(`http://localhost:9000/membres/${id}`,x);
  }
  updateEnseignant(x:Member,id:string):Observable<void>{
    return this.http.put<void>(`http://localhost:9000/membres/${id}`,x);
  }
  getMemberByEmail(email: string): Observable<Member> {
    const url = `http://localhost:9000/membres/search/email?email=${encodeURIComponent(email)}`;
    return this.http.get<Member>(url);
  }
   // Stocker le token d'authentification dans le localStorage
   setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Récupérer le token d'authentification
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Stocker le type d'utilisateur dans le localStorage
  setUserType(userType: string): void {
    localStorage.setItem(this.USER_TYPE_KEY, userType);
  }

  // Récupérer le type d'utilisateur
  getUserType(): string | null {
    return localStorage.getItem(this.USER_TYPE_KEY);
  }

  // Stocker l'ID utilisateur dans le localStorage
  setIdUser(userId: number): void {
    localStorage.setItem(this.USER_ID_KEY, userId.toString());
  }

  // Récupérer l'ID utilisateur
  getIdUser(): string | null {
    return localStorage.getItem(this.USER_ID_KEY);
  }
  saveIdAndUserType(token: string, userType: string, userId: number): void {
    this.setToken(token);
    this.setUserType(userType);
    this.setIdUser(userId);
  }

  // Effacer toutes les informations utilisateur (lors de la déconnexion, par exemple)
  clearUserData(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_TYPE_KEY);
    localStorage.removeItem(this.USER_ID_KEY);
  }
}

