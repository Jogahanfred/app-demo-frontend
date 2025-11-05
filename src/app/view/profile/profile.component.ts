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
    BreadcrumbModule,
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
    { label: 'Sandra Camacho' },
  ];

  // Datos del perfil
  profile = {
    name: 'Andersson Marcos',
    role: 'Ingeniero de Sistemas',
    avatar: '/assets/images/perfil.jpg',
    rating: 5.0,
    reviewCount: 248,
    verified: true,
  };

  // Estadísticas
  stats: Stat[] = [
    { value: '9+', label: 'Años de experiencia' },
    { value: '5+', label: 'Proyectos web' },
    { value: '98%', label: 'Satisfacción' },
  ];

  // Información de contacto
  contactInfo: ContactInfo[] = [
    { icon: 'pi-map-marker', label: 'Dirección', value: 'Calle Oscar #229' },
    { icon: 'pi-phone', label: 'Teléfono', value: '+51 916 186 577' },
    {
      icon: 'pi-envelope',
      label: 'Email',
      value: 'anderssonml050796@gmail.com',
    },
    { icon: 'pi-clock', label: 'Horario', value: 'Lun - Vie: 8:00 - 18:00' },
  ];

  // Descripción
  description = {
    about: `Soy desarrollador web con más de 8 años de experiencia en tecnologías Java y Angular. Actualmente curso el 8vo ciclo de Ingeniería de Sistemas en la UPC.
            Cuento con formación previa como Técnico Informático por la Escuela de Suboficiales de la Fuerza Aérea del Perú, lo que me ha brindado una sólida base en sistemas y tecnologías de la información.`,
    details: `Mi enfoque profesional se centra en el desarrollo de soluciones eficientes y escalables, con atención al detalle y compromiso en la entrega de proyectos de calidad. Me mantengo en constante actualización para dominar las últimas tendencias en desarrollo web y mejores prácticas de la industria.`,
    additionalInfo: [
      { label: 'CIP', value: 'En proceso' },
      { label: 'Institución', value: 'NTT DATA' },
      { label: 'Idiomas', value: 'Español' },
      { label: 'Seguro médico', value: 'Todos los seguros' },
    ],
  };

  // Educación
  education: TimelineItem[] = [
    {
      title: 'Técnico Informático',
      subtitle: 'Escuela de Suboficiales de la Fuerza Aérea del Perú (ESOFA)',
      date: '2013 - 2015',
    },
    {
      title: 'Cursos de Programación',
      subtitle: 'Diversas instituciones y formación autodidacta',
      date: '2015 - Actualidad',
    },
    {
      title: 'Ingeniería de Sistemas',
      subtitle: 'Universidad Peruana de Ciencias Aplicadas (UPC)',
      date: '2022 - Actualidad',
    },
  ];

  // Experiencia
  experience: TimelineItem[] = [
    {
      title: 'Desarrollador de Microservicios y Microfrontends',
      subtitle: 'Proyectos con Angular y Java Spring Boot',
      date: '2024 - Actualidad',
    },
    {
      title: 'Desarrollador Java y Angular',
      subtitle: 'Desarrollo de aplicaciones web corporativas',
      date: '2017 - 2024',
    },
    {
      title: 'Desarrollador Oracle Forms & Reports',
      subtitle: 'Mantenimiento y desarrollo de aplicaciones empresariales',
      date: '2016 - 2017',
    },
  ];

  // Especialidades
  specialties: string[] = [
    'Oracle SQL / PLSQL',
    'Java Spring Boot',
    'Angular',
    'MFE Angular',
    'MS Java',
    'BD Oracle',
    'BD PostgreSql',
    'Android Kotlin',
    'Informática',
    'Full Stack',
    'Scrum',
    'Web Services',
  ];

  // Tabs
  tabs = [
    { label: 'Descripción', icon: 'pi-info-circle' },
    { label: 'Educación', icon: 'pi-book' },
    { label: 'Experiencia', icon: 'pi-briefcase' },
    { label: 'Especialidades', icon: 'pi-star' },
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
