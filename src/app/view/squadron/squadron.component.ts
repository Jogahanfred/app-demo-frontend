import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { IconField, IconFieldModule } from 'primeng/iconfield';
import { InputIcon, InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { BadgeModule } from 'primeng/badge';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-squadron',
  imports: [
    TableModule,
    CardModule,
    CommonModule,
    FormsModule,
    InputIcon,
    InputTextModule,
    IconField,
    ToggleSwitch,
    ButtonModule,
    SelectModule,
    BadgeModule,ChipModule
  ],
  templateUrl: './squadron.component.html',
  styleUrl: './squadron.component.css',
})
export class SquadronComponent {
  referencias: any[] = [
    { name: 'Código', code: 'CO' },
    { name: 'Nombre', code: 'NO' },
  ];
  customers: any[] = [
    {
      id: 1000,
      name: 'James Butt',
      country: {
        name: 'Algeria',
        code: 'dz',
      },
      company: 'Benton, John B Jr',
      date: '2015-09-13',
      status: 'unqualified',
      verified: true,
      activity: 17,
      representative: {
        name: 'Ioni Bowcher',
        image: 'ionibowcher.png',
      },
      balance: 70663,
    },
  ];
}
