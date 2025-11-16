import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationParams } from '../../../core/models/api-response.model';
import { ProfesorService } from '../../../core/services/profesor.service';
import { Profesor, ProfesorFilters } from '../../../shared/models/profesor.model';

@Component({
  selector: 'app-Profesor-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './Profesor-list.component.html',
  styleUrl: './Profesor-list.component.scss'
})
export class ProfesorListComponent implements OnInit {
  Profesor: Profesor[] = [];
  loading = false;
  currentPage = 1;
  totalPages = 1;
  pageSize = 10;
  
  filters: ProfesorFilters = {};
  
  // Modal properties
  showModal = false;
  editingProfesor: Profesor | null = null;
  ProfesorForm = {
    nombre: '',
    apellido: '',
    id:'',
    email: '',
  };

  constructor(private ProfesorService: ProfesorService) { }

  ngOnInit(): void {
    this.loadProfesor();
  }

  loadProfesor(): void {
    this.loading = true;
    const pagination: PaginationParams = {
      page: this.currentPage,
      limit: this.pageSize
    };

    
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadProfesor();
  }

  clearFilters(): void {
    this.filters = {};
    this.currentPage = 1;
    this.loadProfesor();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProfesor();
    }
  }

  openCreateModal(): void {
    this.editingProfesor = null;
    this.ProfesorForm = {
        nombre: '',
        apellido: '',
        id:'',
        email: '',
    };
    this.showModal = true;
  }

  editProfesors(Profesor: Profesor): void {
    this.editingProfesor = Profesor;
    this.ProfesorForm = {
      nombre: Profesor.nombre,
      apellido: Profesor.apellido,
      id: Profesor.id,
      email: Profesor.email
    };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingProfesor = null;
    this.ProfesorForm = {
        nombre: '',
        apellido: '',
        id:'',
        email: '',
    };
  }

  saveProfesor(): void {
    if (!this.ProfesorForm.nombre.trim()) {
      alert('El nombre es requerido');
      return;
    }

    if (this.editingProfesor) {
      // Actualizar categoría existente
      const updateData = {
        nombre: this.ProfesorForm.nombre,
        apellido: this.ProfesorForm.apellido,
        email: this.ProfesorForm.email,
        id: this.ProfesorForm.id
        
      };
      
      this.ProfesorService.updateProfesor(this.editingProfesor.id, updateData).subscribe({
        next: () => {
          this.loadProfesor();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al actualizar Profesor:', error);
          alert('Error al actualizar la Profesor');
        }
      });
    } else {
      // Crear nueva Profesor
      const newProfesor = {
        nombre: this.ProfesorForm.nombre,
        apellido: this.ProfesorForm.apellido,
        email: this.ProfesorForm.email,
        id: this.ProfesorForm.id
      };
      
      this.ProfesorService.createProfesor(newProfesor).subscribe({
        next: () => {
          this.loadProfesor();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al crear Profesor:', error);
          alert('Error al crear la Profesor');
        }
      });
    }
  }

  deleteProfesor(Profesor: Profesor): void {
    if (confirm(`¿Está seguro de eliminar el Profesor "${Profesor.nombre}"?`)) {
      this.ProfesorService.deleteProfesor(Profesor.id).subscribe({
        next: () => {
          this.loadProfesor();
        },
        error: (error) => {
          console.error('Error al eliminar Profesor:', error);
        }
      });
    }
  }
}
