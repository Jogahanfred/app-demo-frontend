import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { TimelineModule } from 'primeng/timeline';
import { ChipModule } from 'primeng/chip';
import { BreadcrumbModule } from 'primeng/breadcrumb';
 

interface ContactInfo {
  icon: string;
  label: string;
  value: string;
}

interface TimelineItem {
  title: string;
  subtitle: string;
  date: string;
}

interface Stat {
  value: string;
  label: string;
}

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule, 
    CardModule,
    ButtonModule,
    TabsModule,
    TimelineModule,
    ChipModule,
    BreadcrumbModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  activeTab = 0;
  
  // Breadcrumb items
  breadcrumbItems = [
    { label: 'Inicio', icon: 'pi pi-home', route: '/' },
    { label: 'Médicos', route: '/medicos' },
    { label: 'Medicina General', route: '/medicos/medicina-general' },
    { label: 'Sandra Camacho' }
  ];

  // Datos del perfil
  profile = {
    name: 'Sandra Camacho',
    role: 'Médica General',
    avatar: 'https://ui-avatars.com/api/?name=Sandra+Camacho&size=120&background=003553&color=fff',
    rating: 5.0,
    reviewCount: 248,
    verified: true
  };

  // Estadísticas
  stats: Stat[] = [
    { value: '15+', label: 'Años de experiencia' },
    { value: '2,500+', label: 'Pacientes atendidos' },
    { value: '98%', label: 'Satisfacción' }
  ];

  // Información de contacto
  contactInfo: ContactInfo[] = [
    { icon: 'pi-map-marker', label: 'Dirección', value: 'Cra 5ta #32-45, Bogotá' },
    { icon: 'pi-phone', label: 'Teléfono', value: '+57 300 123 4567' },
    { icon: 'pi-envelope', label: 'Email', value: 'sandra.camacho@example.com' },
    { icon: 'pi-clock', label: 'Horario', value: 'Lun - Vie: 8:00 - 18:00' }
  ];

  // Descripción
  description = {
    about: `La Dra. Sandra Camacho es Médico titulada de Medicina General, actualmente brinda atención en las siguientes áreas: 
            atención primaria en salud, prevención y promoción de la salud, y manejo integral del paciente. Es especialista 
            en Medicina Familiar con más de 15 años de experiencia atendiendo pacientes de todas las edades.`,
    details: `Su enfoque se centra en la atención personalizada y humanizada, estableciendo una relación cercana con sus pacientes 
              para brindar el mejor cuidado posible. Cuenta con formación continua en las últimas tendencias y avances de la 
              medicina moderna.`,
    additionalInfo: [
      { label: 'Registro médico', value: 'RM-123456' },
      { label: 'Institución', value: 'Hospital Central' },
      { label: 'Idiomas', value: 'Español, Inglés' },
      { label: 'Seguro médico', value: 'Todos los seguros' }
    ]
  };

  // Educación
  education: TimelineItem[] = [
    {
      title: 'Especialización en Medicina Familiar',
      subtitle: 'Universidad Nacional de Colombia',
      date: '2015 - 2018'
    },
    {
      title: 'Medicina General',
      subtitle: 'Universidad de Los Andes',
      date: '2008 - 2014'
    },
    {
      title: 'Certificación en Emergencias Médicas',
      subtitle: 'American Heart Association',
      date: '2019'
    }
  ];

  // Experiencia
  experience: TimelineItem[] = [
    {
      title: 'Médica General - Hospital Central',
      subtitle: 'Atención en consulta externa y urgencias',
      date: '2018 - Presente'
    },
    {
      title: 'Médica Residente - Clínica del Norte',
      subtitle: 'Rotación por diferentes servicios',
      date: '2015 - 2018'
    },
    {
      title: 'Médica Rural - Centro de Salud Santa Rosa',
      subtitle: 'Atención primaria en salud',
      date: '2014 - 2015'
    }
  ];

  // Especialidades
  specialties: string[] = [
    'Medicina Familiar',
    'Atención Primaria',
    'Pediatría General',
    'Medicina Preventiva',
    'Geriatría',
    'Control Prenatal',
    'Enfermedades Crónicas',
    'Urgencias',
    'Diabetes',
    'Hipertensión',
    'Salud Mental',
    'Nutrición'
  ];

  // Tabs
  tabs = [
    { label: 'Descripción', icon: 'pi-info-circle' },
    { label: 'Educación', icon: 'pi-book' },
    { label: 'Experiencia', icon: 'pi-briefcase' },
    { label: 'Especialidades', icon: 'pi-star' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Aquí podrías cargar los datos del perfil desde un servicio
    // this.profileService.getProfile(id).subscribe(...)
  }

  requestAppointment() {
    console.log('Solicitar cita');
    // Navegar a página de citas o abrir modal
  }

  startVideoCall() {
    console.log('Iniciar videollamada');
  }

  makeCall() {
    console.log('Llamar');
  }

  onTabChange(event: any) {
    this.activeTab = event.index;
  }

  getRatingStars(): number[] {
    return Array(Math.floor(this.profile.rating)).fill(0);
  }
}