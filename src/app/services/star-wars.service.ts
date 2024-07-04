import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {
  private apiUrl = 'https://swapi.dev/api';

  constructor(private http: HttpClient) { }

  getCharacter(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/people/${id}/`);
  }

  getAllCharacters(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/people/`);
  }

  getSpecies(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  getAllSpecies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/species`);
  }

  getVehicles(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  getAllVehicles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vehicles`);
  }

  getStarships(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  getAllStarships(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/starships`);
  }

  getpanet(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  getMovies(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  getFilms(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/films/`);
  }
}
