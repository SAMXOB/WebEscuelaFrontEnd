/**
 * Modelo para la entidad Estudiante
 */
export interface Estudiante {
  apellido: string; 
  nombre: string;
  email: string;
  id: string;
}

/**
 * Modelo para crear una nuevo estudiante
 */
export interface CreateEstudianteRequest {
  nombre: string;
  descripcion?: string;
}

/**
 * Modelo para actualizar un Estudiante
 */
export interface UpdateEstudianteRequest {
  nombre?: string;
  descripcion?: string;
}

/**
 * Modelo para filtro de Estudiante
 */
export interface EstudianteFilters {
  nombre?: string;
  activa?: boolean; // Status filter
}

/**
 * Modelo para respuesta paginada de Estudiante
 */
export interface EstudianteListResponse {
  data: Estudiante[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}
