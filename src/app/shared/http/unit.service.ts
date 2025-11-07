import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Unit } from '../interface/unit.interface'; 
import { Response } from '../../core/interface/response.interface';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private unitChange: Subject<Unit> = new Subject<Unit>();
  private apiUrl = `${environment.apiUrl}/units`;

  constructor(private http: HttpClient) {}
 
  getUnitsPage(page: number, size: number, filter: string = ''): Observable<Response> {
    const pageIndex = page - 1; // Spring Pageable empieza desde 0
    const url = `${this.apiUrl}/page?page=${pageIndex}&size=${size}&filter=${filter}`;
    return this.http.get<Response>(url);
  }
 
  getUnitById(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }
 
  createUnit(unit: Unit): Observable<Response> {
    return this.http.post<Response>(this.apiUrl, unit).pipe(
      map(res => {
        this.setUnitChange(res.data as Unit);
        return res;
      })
    );
  }
 
  updateUnit(id: number, unit: Unit): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, unit).pipe(
      map(res => {
        this.setUnitChange(res.data as Unit);
        return res;
      })
    );
  }
 
  deleteUnit(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.apiUrl}/${id}`).pipe(
      map(res => {
        this.setUnitChange({ nuUnitId: id } as Unit);
        return res;
      })
    );
  }
 
  setUnitChange(unit: Unit) {
    this.unitChange.next(unit);
  }

  getUnitChange(): Observable<Unit> {
    return this.unitChange.asObservable();
  }
}
