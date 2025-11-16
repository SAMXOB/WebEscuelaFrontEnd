import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudiante, CreateEstudianteRequest, UpdateEstudianteRequest, EstudianteFilters } from '../../shared/models/estudiante.model';
import { PaginationParams } from '../models/api-response.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private readonly endpoint = '/estudiantes';

  constructor(private apiService: ApiService) { }

  /**
   * Obtiene un Estudiante por ID
   */
  getEstudianteById(pagination: PaginationParams, filters: EstudianteFilters, id: string): Observable<Estudiante> {
    return this.apiService.get<Estudiante>(`${this.endpoint}/${id}`);
  }

  /**
   * Crea una nueva Estudiante
   */
  createEstudiante(Estudiante: CreateEstudianteRequest): Observable<Estudiante> {
    return this.apiService.post<Estudiante>(this.endpoint, Estudiante);
  }

  /**
   * Actualiza un Estudiante existente
   */
  updateEstudiante(id: string, Estudiante: UpdateEstudianteRequest): Observable<Estudiante> {
    return this.apiService.put<Estudiante>(`${this.endpoint}/${id}`, Estudiante);
  }

  /**
   * Elimina una estudiante
   */
  deleteEstudiante(id: string): Observable<any> {
    return this.apiService.delete<any>(`${this.endpoint}/${id}`);
  }

  /**
   * Obtiene un estudiante por nombre
   */
  getEstudianteByNombre(nombre: string): Observable<Estudiante> {
    return this.apiService.get<Estudiante>(`${this.endpoint}/nombre/${nombre}`);
  }
}