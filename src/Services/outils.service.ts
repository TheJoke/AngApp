import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Outils } from 'src/Models/outils';

@Injectable({
  providedIn: 'root'
})
export class OutilsService {

  constructor(private httpClient: HttpClient) {   }
  getAllOutils() : Observable<Outils[]>{
    return this.httpClient.get<Outils[]>("http://localhost:9000/tools");
  }
  getOutilById(id:string) :Observable<Outils>{
    return this.httpClient.get<Outils>(`http://localhost:9000/tools/${id}`);
  }
  deleteOutil(id:string):Observable<void>{
    return this.httpClient.delete<void>(`http://localhost:9000/tools/${id}`);
  }
  addOutil(outil:Outils):Observable<void>{
    return this.httpClient.post<void>("http://localhost:9000/tools",outil);
  }
  updateOutil(id:string,outil:Outils):Observable<void>{
    return this.httpClient.put<void>(`http://localhost:9000/tools/${id}`,outil);
  }
}
