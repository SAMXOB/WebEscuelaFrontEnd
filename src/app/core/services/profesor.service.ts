import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profesor, CreateProfesorRequest, UpdateProfesorRequest, ProfesorFilters } from '../../shared/models/profesor.model';
import { PaginationParams } from '../models/api-response.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private readonly endpoint = '/Profesores';

  constructor(private apiService: ApiService) { }

  /**
   * Obtiene un Profesor por ID
   */
  getProfesorById(pagination: PaginationParams, filters: ProfesorFilters, id: string): Observable<Profesor> {
    return this.apiService.get<Profesor>(`${this.endpoint}/${id}`);
  }

  /**
   * Crea una nueva Profesor
   */
  createProfesor(Profesor: CreateProfesorRequest): Observable<Profesor> {
    return this.apiService.post<Profesor>(this.endpoint, Profesor);
  }

  /**
   * Actualiza un Profesor existente
   */
  updateProfesor(id: string, Profesor: UpdateProfesorRequest): Observable<Profesor> {
    return this.apiService.put<Profesor>(`${this.endpoint}/${id}`, Profesor);
  }

  /**
   * Elimina una Profesor
   */
  deleteProfesor(id: string): Observable<any> {
    return this.apiService.delete<any>(`${this.endpoint}/${id}`);
  }

  /**
   * Obtiene un Profesor por nombre
   */
  getProfesorByNombre(nombre: string): Observable<Profesor> {
    return this.apiService.get<Profesor>(`${this.endpoint}/nombre/${nombre}`);
  }
}