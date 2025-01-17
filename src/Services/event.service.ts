import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from 'src/Models/evenement';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:9000/events';

  constructor(private http : HttpClient) {
   }
   getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }
   addEvent(x:Event):Observable<void>{
    return this.http.post<void>("http://localhost:9000/events",x);
   }
   getEventByID(id:string):Observable<Event>{
    return this.http.get<Event>(`http://localhost:9000/events/${id}`);
   }
   update(data:Event,id:string):Observable<void>{
    return this.http.put<void>(`http://localhost:9000/events/${id}`,data);
   }
   delete(id:string):Observable<void>{
    return this.http.delete<void>(`http://localhost:9000/events/${id}`);
   }
}
