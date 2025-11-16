/**
 * Modelo para la entidad Profesor
 */
export interface Profesor {
  apellido: string; 
  nombre: string;
  email: string;
  id: string;
}

/**
 * Modelo para crear una nuevo Profesor
 */
export interface CreateProfesorRequest {
  nombre: string;
  descripcion?: string;
}

/**
 * Modelo para actualizar un Profesor
 */
export interface UpdateProfesorRequest {
  nombre?: string;
  descripcion?: string;
}

/**
 * Modelo para filtro de Profesor
 */
export interface ProfesorFilters {
  nombre?: string;
  activa?: boolean; // Status filter
}

/**
 * Modelo para respuesta paginada de Profesor
 */
export interface ProfesorListResponse {
  data: Profesor[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}
