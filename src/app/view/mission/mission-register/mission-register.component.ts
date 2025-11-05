import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { TabsModule } from 'primeng/tabs';
import { ListboxModule } from 'primeng/listbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
// -------------------- INTERFACES --------------------
interface Mission {
  id: number;
  name: string;
  fullName: string;
  duration: string;
  difficulty: string;
}

interface Subphase {
  name: string;
  missions: Mission[];
}

interface Phase {
  name: string;
  subphases: Record<number, Subphase>;
}

interface Program {
  name: string;
  fullName: string;
  phases: Record<number, Phase>;
}

interface PilotMissionProgress {
  id: number;
  score: number;
}

interface PilotSubphaseProgress {
  name: string;
  missions: PilotMissionProgress[];
}

interface PilotPhaseProgress {
  name: string;
  status: 'completed' | 'in-progress' | 'not-started';
  subphases: Record<number, PilotSubphaseProgress>;
}

interface PilotProgress {
  program: number;
  phases: Record<number, PilotPhaseProgress>;
}

interface Pilot {
  id: number;
  name: string;
  code: string;
  hours: number;
  role: string;
  status: string;
  img: string;
  progress: PilotProgress;
}

interface Instructor {
  id: number;
  name: string;
  code: string;
  hours: number;
  role: string;
  status: string;
  img: string;
}

interface Aircraft {
  id: number;
  name: string;
  icon: string;
  status: 'Disponible' | 'Mantenimiento';
}

interface SelectedData {
  pilot: number | null;
  instructor: number | null;
  mission: Mission | null;
  aircraft: number | null;
}

// -------------------- COMPONENTE --------------------

@Component({
  selector: 'app-mission-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    TabsModule,
    CardModule,
    ListboxModule,
    AutoCompleteModule,
    DataViewModule,
    PanelModule
  ],
  templateUrl: './mission-register.component.html',
  styleUrls: ['./mission-register.component.css'],
})
export class MissionRegisterComponent {
  // --- Datos principales ---
  selectedData: SelectedData = {
    pilot: null,
    instructor: null,
    mission: null,
    aircraft: null,
  };
  pilotSearch = '';
filteredPrograms: any
  instructorSearch = '';

  selectedMission: any;
  selectedAircraft: any;
  selectedPilot: Pilot | any | null = null;
  selectedInstructor: Instructor | any | null = null;
  selectedProgram: number | null = null;
  selectedPhase: number | null = null;
  selectedSubphase: number | null = null;
  missions: Mission | any[] = [];

  showProgressDialog = false;
  selectedProgressPilot: Pilot | null = null;

  programData: Record<number, Program> = {
    // Aquí pega tus datos de programas (programData)
    1: {
      name: 'PDI',
      fullName: 'Programa de Instrucción Básica',
      phases: {
        1: {
          name: 'Fase 1: Fundamentos',
          subphases: {
            1: {
              name: 'Subfase 1.1: Teoría',
              missions: [
                {
                  id: 1,
                  name: 'M1',
                  fullName: 'Aerodinámica Básica',
                  duration: '2h',
                  difficulty: 'Básico',
                },
                {
                  id: 2,
                  name: 'M2',
                  fullName: 'Meteorología',
                  duration: '2h',
                  difficulty: 'Básico',
                },
                {
                  id: 3,
                  name: 'M3',
                  fullName: 'Navegación',
                  duration: '2h',
                  difficulty: 'Básico',
                },
                {
                  id: 4,
                  name: 'M4',
                  fullName: 'Comunicaciones',
                  duration: '2h',
                  difficulty: 'Básico',
                },
                {
                  id: 5,
                  name: 'M5',
                  fullName: 'Reglamentación',
                  duration: '2h',
                  difficulty: 'Básico',
                },
              ],
            },
            2: {
              name: 'Subfase 1.2: Simulador',
              missions: [
                {
                  id: 6,
                  name: 'M1',
                  fullName: 'Práctica en Simulador 1',
                  duration: '3h',
                  difficulty: 'Básico',
                },
                {
                  id: 7,
                  name: 'M2',
                  fullName: 'Práctica en Simulador 2',
                  duration: '3h',
                  difficulty: 'Básico',
                },
                {
                  id: 8,
                  name: 'M3',
                  fullName: 'Emergencias Simuladas',
                  duration: '3h',
                  difficulty: 'Intermedio',
                },
              ],
            },
          },
        },
        2: {
          name: 'Fase 2: Vuelo Solo',
          subphases: {
            3: {
              name: 'Subfase 2.1: Preparación',
              missions: [
                {
                  id: 9,
                  name: 'M1',
                  fullName: 'Familiarización de Aeronave',
                  duration: '1.5h',
                  difficulty: 'Básico',
                },
                {
                  id: 10,
                  name: 'M2',
                  fullName: 'Despegues y Aterrizajes',
                  duration: '2h',
                  difficulty: 'Intermedio',
                },
                {
                  id: 11,
                  name: 'M3',
                  fullName: 'Vuelo en Patrón',
                  duration: '1.5h',
                  difficulty: 'Intermedio',
                },
              ],
            },
            4: {
              name: 'Subfase 2.2: Solo',
              missions: [
                {
                  id: 12,
                  name: 'M1',
                  fullName: 'Primer Vuelo Solo',
                  duration: '1h',
                  difficulty: 'Avanzado',
                },
                {
                  id: 13,
                  name: 'M2',
                  fullName: 'Navegación Simple Solo',
                  duration: '2h',
                  difficulty: 'Avanzado',
                },
              ],
            },
          },
        },
        3: {
          name: 'Fase 3: Instrumentos',
          subphases: {
            5: {
              name: 'Subfase 3.1: Introducción IFR',
              missions: [
                {
                  id: 14,
                  name: 'M1',
                  fullName: 'Vuelo por Instrumentos Básico',
                  duration: '2h',
                  difficulty: 'Intermedio',
                },
                {
                  id: 15,
                  name: 'M2',
                  fullName: 'Aproximaciones Locales',
                  duration: '2.5h',
                  difficulty: 'Avanzado',
                },
              ],
            },
          },
        },
      },
    },
    2: {
      name: 'PDE',
      fullName: 'Programa de Vuelo Avanzado',
      phases: {
        4: {
          name: 'Fase 4: Maniobras Avanzadas',
          subphases: {
            6: {
              name: 'Subfase 4.1: Acrobacias',
              missions: [
                {
                  id: 16,
                  name: 'M1',
                  fullName: 'Tirabuzones',
                  duration: '1h',
                  difficulty: 'Avanzado',
                },
                {
                  id: 17,
                  name: 'M2',
                  fullName: 'Vuelos Invertidos',
                  duration: '1h',
                  difficulty: 'Avanzado',
                },
              ],
            },
          },
        },
      },
    },
    3: {
      name: 'PCT',
      fullName: 'Programa de Combate Táctico',
      phases: {
        5: {
          name: 'Fase 5: Tácticas de Combate',
          subphases: {
            7: {
              name: 'Subfase 5.1: BVR',
              missions: [
                {
                  id: 18,
                  name: 'M1',
                  fullName: 'Intercepción BVR',
                  duration: '1.5h',
                  difficulty: 'Experto',
                },
                {
                  id: 19,
                  name: 'M2',
                  fullName: 'Manejo de Radar',
                  duration: '1.5h',
                  difficulty: 'Experto',
                },
              ],
            },
          },
        },
      },
    },
  };

  allPilots: Pilot[] = [
    /* tus pilotos */
  ];
  allInstructors: Instructor[] = [
    /* tus instructores */
  ];
  allAircrafts: Aircraft[] = [
    /* tus aeronaves */
  ];

  // --- Funciones de Lógica ---

  filterPilots(searchTerm: string): void {
    searchTerm = searchTerm.toLowerCase();
    // Aquí solo filtras en memoria, en Angular se hace con *ngFor + pipe o filter
  }

  selectPilot(pilotId: number): void {
    this.selectedData.pilot = pilotId;
    this.updateAssignmentSummary();
  }

  selectInstructor(instructorId: number): void {
    this.selectedData.instructor = instructorId;
    this.updateAssignmentSummary();
  }

  selectMission(
    programId: number,
    phaseId: number,
    subphaseId: number,
    missionId: number
  ): void {
    const mission =
      this.programData[programId].phases[phaseId].subphases[
        subphaseId
      ].missions.find((m) => m.id === missionId) || null;
    this.selectedData.mission = mission;
    this.updateAssignmentSummary();
  }

  selectAircraft(aircraftId: number): void {
    const aircraft = this.allAircrafts.find((a) => a.id === aircraftId);
    if (!aircraft) return;
    if (aircraft.status === 'Mantenimiento') {
      alert(`La aeronave ${aircraft.name} está en mantenimiento.`);
      return;
    }
    this.selectedData.aircraft = aircraftId;
    this.updateAssignmentSummary();
  }

  // --- Actualiza el estado del resumen ---
  updateAssignmentSummary(): void {
    // Aquí podrías actualizar datos visibles en el template (por ejemplo, variables públicas)
    // En Angular, se reflejarán automáticamente en la vista (HTML)
  }

  // --- Asignar misión ---
  assignMission(): void {
    const { pilot, instructor, mission, aircraft } = this.selectedData;
    if (pilot && instructor && mission && aircraft) {
      const p = this.allPilots.find((x) => x.id === pilot)!;
      const i = this.allInstructors.find((x) => x.id === instructor)!;
      const a = this.allAircrafts.find((x) => x.id === aircraft)!;

      alert(`Misión asignada con éxito:
Piloto: ${p.name}
Instructor: ${i.name}
Misión: ${mission.fullName}
Aeronave: ${a.name}`);

      this.resetForm();
    } else {
      alert('Por favor completa todos los campos antes de asignar.');
    }
  }

  resetForm(): void {
    this.selectedData = {
      pilot: null,
      instructor: null,
      mission: null,
      aircraft: null,
    };
  }

  // --- Ver progreso de un piloto ---
  // viewProgress(pilotId: number): void {
  //   const pilot = this.allPilots.find((p) => p.id === pilotId);
  //   if (!pilot) return;
  //   console.log('Progreso del piloto:', pilot);
  //   // Aquí puedes abrir un modal o renderizar datos en el HTML
  // }

  filteredPilots = this.allPilots;
  filteredInstructors = this.allInstructors;

  isReadyToAssign(): boolean {
    return (
      this.selectedPilot &&
      this.selectedInstructor &&
      this.selectedMission &&
      this.selectedAircraft &&
      this.selectedAircraft.status === 'Disponible'
    );
  }

  viewProgress(pilot: Pilot): void {
    this.selectedProgressPilot = pilot;
    this.showProgressDialog = true;
  }
}
