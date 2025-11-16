import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationParams } from '../../../core/models/api-response.model';
import { EstudianteService } from '../../../core/services/estudiante.service';
import { Estudiante, EstudianteFilters } from '../../../shared/models/estudiante.model';

@Component({
  selector: 'app-Estudiante-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './Estudiante-list.component.html',
  styleUrl: './Estudiante-list.component.scss'
})
export class EstudianteListComponent implements OnInit {
  Estudiante: Estudiante[] = [];
  loading = false;
  currentPage = 1;
  totalPages = 1;
  pageSize = 10;
  
  filters: EstudianteFilters = {};
  
  // Modal properties
  showModal = false;
  editingEstudiante: Estudiante | null = null;
  EstudianteForm = {
    nombre: '',
    apellido: '',
    id:'',
    email: '',
  };

  constructor(private EstudianteService: EstudianteService) { }

  ngOnInit(): void {
    this.loadEstudiante();
  }

  loadEstudiante(): void {
    this.loading = true;
    const pagination: PaginationParams = {
      page: this.currentPage,
      limit: this.pageSize
    };

    
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadEstudiante();
  }

  clearFilters(): void {
    this.filters = {};
    this.currentPage = 1;
    this.loadEstudiante();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadEstudiante();
    }
  }

  openCreateModal(): void {
    this.editingEstudiante = null;
    this.EstudianteForm = {
        nombre: '',
        apellido: '',
        id:'',
        email: '',
    };
    this.showModal = true;
  }

  editEstudiantes(Estudiante: Estudiante): void {
    this.editingEstudiante = Estudiante;
    this.EstudianteForm = {
      nombre: Estudiante.nombre,
      apellido: Estudiante.apellido,
      id: Estudiante.id,
      email: Estudiante.email
    };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingEstudiante = null;
    this.EstudianteForm = {
        nombre: '',
        apellido: '',
        id:'',
        email: '',
    };
  }

  saveEstudiante(): void {
    if (!this.EstudianteForm.nombre.trim()) {
      alert('El nombre es requerido');
      return;
    }

    if (this.editingEstudiante) {
      // Actualizar categoría existente
      const updateData = {
        nombre: this.EstudianteForm.nombre,
        apellido: this.EstudianteForm.apellido,
        email: this.EstudianteForm.email,
        id: this.EstudianteForm.id
        
      };
      
      this.EstudianteService.updateEstudiante(this.editingEstudiante.id, updateData).subscribe({
        next: () => {
          this.loadEstudiante();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al actualizar Estudiante:', error);
          alert('Error al actualizar la Estudiante');
        }
      });
    } else {
      // Crear nueva Estudiante
      const newEstudiante = {
        nombre: this.EstudianteForm.nombre,
        apellido: this.EstudianteForm.apellido,
        email: this.EstudianteForm.email,
        id: this.EstudianteForm.id
      };
      
      this.EstudianteService.createEstudiante(newEstudiante).subscribe({
        next: () => {
          this.loadEstudiante();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al crear Estudiante:', error);
          alert('Error al crear la Estudiante');
        }
      });
    }
  }

  deleteEstudiante(Estudiante: Estudiante): void {
    if (confirm(`¿Está seguro de eliminar el Estudiante "${Estudiante.nombre}"?`)) {
      this.EstudianteService.deleteEstudiante(Estudiante.id).subscribe({
        next: () => {
          this.loadEstudiante();
        },
        error: (error) => {
          console.error('Error al eliminar Estudiante:', error);
        }
      });
    }
  }
}
