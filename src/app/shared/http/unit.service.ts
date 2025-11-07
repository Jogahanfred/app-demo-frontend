import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Unit } from '../interface/unit.interface';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private unitChange: Subject<Unit> = new Subject<Unit>();
  protected apiUrl = `${environment.apiUrl}/units`;

  constructor(private http: HttpClient) {}

  getPageUnitsInit(
    page: number,
    size: number,
    filter: string
  ): Observable<Response> {
    let pageCustom = page - 1;
    const url = `${this.apiUrl}/page?page=${pageCustom}&size=${size}&filter=${filter}`;
    return this.http
      .get<Response>(url)
      .pipe(map((response) => response as Response));
  }

  getPageUnitsFilter(
    page: number,
    size: number,
    filter: string
  ): Observable<Response> {
    let pageCustom = page - 1;
    const url = `${this.apiUrl}/page?page=${pageCustom}&size=${size}&filter=${filter}`;
    return this.http
      .get<Response>(url)
      .pipe(map((response) => response as Response));
  }

  setUnitChange(unit: Unit) {
    return this.unitChange.next(unit);
  }

  getUnitChange() {
    return this.unitChange.asObservable();
  }
}
