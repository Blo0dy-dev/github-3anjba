import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Manažment Študentov';

  studentsList = [
    {
      id: 1,
      first_name: 'Jožko',
      last_name: 'Mrkvička',
      date_birth: '2007-04-07',
      average: 2.45,
      class: '1. D',
      subject: 'PDT',
      gender: 'Muž',
      info: 'Je to delikvent.',
      disabled: false,
      last_edit: new Date(2023, 4, 13, 22, 5),
    },
    {
      id: 2,
      first_name: 'Lucie',
      last_name: 'Nováková',
      date_birth: '2005-09-15',
      average: 1.98,
      class: '-',
      subject: '-',
      gender: 'Žena',
      info: 'Má talent na matematiku.',
      disabled: false,
      last_edit: new Date(2023, 8, 21, 14, 30),
    },
    {
      id: 3,
      first_name: 'Tomáš',
      last_name: 'Veselý',
      date_birth: '2006-11-23',
      average: 3.75,
      class: '2. C',
      subject: 'SLP',
      gender: 'Muž',
      info: 'Aktivní ve školním sboru.',
      disabled: false,
      last_edit: new Date(2023, 6, 8, 18, 45),
    },
    {
      id: 4,
      first_name: 'Anna',
      last_name: 'Procházková',
      date_birth: '2008-02-14',
      average: 2.89,
      class: '1. B',
      subject: 'SIP',
      gender: 'Žena',
      info: '-',
      disabled: false,
      last_edit: new Date(2023, 2, 19, 10, 15),
    },
    {
      id: 5,
      first_name: 'Petr',
      last_name: 'Krátký',
      date_birth: '2007-06-03',
      average: 2.15,
      class: '2. D',
      subject: 'UI',
      gender: 'Muž',
      info: 'Oblíbený ve třídě pro svůj smysl pro humor.',
      disabled: true,
      last_edit: new Date(2023, 11, 5, 20, 10),
    },
    {
      id: 6,
      first_name: 'Karolína',
      last_name: 'Machová',
      date_birth: '2006-04-28',
      average: '',
      class: '3. B',
      subject: 'INT',
      gender: 'Žena',
      info: 'Vynikající znalost anglické literatury.',
      disabled: false,
      last_edit: new Date(2023, 9, 16, 12, 0),
    },
  ];

  constructor() {
    // Save students to localStorage
    localStorage.setItem('students', JSON.stringify(this.studentsList));
  }
}
