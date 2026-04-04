import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface StudyItem {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

@Injectable({ providedIn: 'root' })
export class StudyItemService {

  constructor(private http: HttpClient) {}

  getAll(page = 0, size = 20): Observable<PageResponse<StudyItem>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PageResponse<StudyItem>>(
      `${environment.apiUrl}/study-items`, { params }
    );
  }

  create(title: string, description: string): Observable<StudyItem> {
    return this.http.post<StudyItem>(
      `${environment.apiUrl}/study-items`, { title, description }
    );
  }

  update(id: number, title: string, description: string): Observable<StudyItem> {
    return this.http.put<StudyItem>(
      `${environment.apiUrl}/study-items/${id}`, { title, description }
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/study-items/${id}`);
  }

  deleteAll(): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/study-items`);
  }
}
