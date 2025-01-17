import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/Models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

constructor(private http:HttpClient){}
  getAllArticles(): Observable<Article[]>
  {
    return this.http.get<Article[]>('http://localhost:9000/articles');
  }
  addArticle(x:Article):Observable<void>{
    return this.http.post<void>('http://localhost:9000/articles',x);
  }

  deleteArticle(id:string): Observable<void> {
    return this.http.delete<void>(`http://localhost:9000/articles/${id}`);  //quote AltGr + 7
  }
  getArticleById(id:string):Observable<Article>{
    return this.http.get<Article>(`http://localhost:9000/articles/${id}`);
  }
  updateArticle(x:Article,id:string):Observable<void>{
    return this.http.put<void>(`http://localhost:9000/articles/${id}`,x);
  }
}
