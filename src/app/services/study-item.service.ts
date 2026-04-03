import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface StudyItem {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class StudyItemService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<StudyItem[]> {
    return this.http.get<StudyItem[]>(`${environment.apiUrl}/study-items`);
  }

  create(title: string, description: string): Observable<StudyItem> {
    return this.http.post<StudyItem>(`${environment.apiUrl}/study-items`, { title, description });
  }

  update(id: number, title: string, description: string): Observable<StudyItem> {
    return this.http.put<StudyItem>(`${environment.apiUrl}/study-items/${id}`, { title, description });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/study-items/${id}`);
  }
}
