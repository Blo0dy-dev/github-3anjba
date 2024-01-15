import { Injectable } from '@angular/core';

@Injectable()
export class StudentService {
  constructor() {}

  getAllStudents() {
    let studentList: any;
    if (
      localStorage.getItem('students') &&
      localStorage.getItem('students') != ''
    ) {
      studentList = {
        code: 200,
        message: 'List študentov bol načítaný úspešne',
        data: JSON.parse(localStorage.getItem('students') || ''),
      };
    } else {
      studentList = {
        code: 200,
        message: 'List študentov bol načítaný úspešne',
        data: JSON.parse(localStorage.getItem('students') || ''),
      };
    }
    return studentList;
  }

  doRegisterStudent(data: any, index: number) {
    let studentList = JSON.parse(localStorage.getItem('students') || '');
    let returnData;
    if (index != null) {
      for (var i = 0; i < studentList.length; i++) {
        if (
          index != i &&
          studentList[i].first_name == data.first_name &&
          studentList[i].last_name == data.last_name
        ) {
          returnData = {
            code: 503,
            message: 'Dané meno a priezvisko sa už používajú',
            data: null,
          };
          return returnData;
        }
      }

      studentList[index] = data;
      localStorage.setItem('students', JSON.stringify(studentList));
      returnData = {
        code: 200,
        message: 'Študent bol úspešne upravený',
        data: JSON.parse(localStorage.getItem('students') || ''),
      };
    } else {
      data.id = this.generateRandomID();
      for (var i = 0; i < studentList.length; i++) {
        if (
          index != i &&
          studentList[i].first_name == data.first_name &&
          studentList[i].last_name == data.last_name
        ) {
          returnData = {
            code: 503,
            message: 'Dané meno a priezvisko sa už používajú',
            data: null,
          };
          return returnData;
        }
      }
      studentList.unshift(data);

      localStorage.setItem('students', JSON.stringify(studentList));

      returnData = {
        code: 200,
        message: 'Študent bol úspešne vytvorený',
        data: JSON.parse(localStorage.getItem('students') || ''),
      };
    }
    return returnData;
  }

  deleteStudent(index: number) {
    let studentList = JSON.parse(localStorage.getItem('students') || '');

    studentList.splice(index, 1);

    localStorage.setItem('students', JSON.stringify(studentList));

    let returnData = {
      code: 200,
      message: 'Študent bol úspešne vymazaný',
      data: JSON.parse(localStorage.getItem('students') || ''),
    };

    return returnData;
  }

  getStudentDetails(index: number) {
    let studentList = JSON.parse(localStorage.getItem('students') || '');

    let returnData = {
      code: 200,
      message: 'Detaily o študentovi boli úspešne načítané',
      studentData: studentList[index],
    };

    return returnData;
  }

  generateRandomID() {
    var x = Math.floor(Math.random() * Math.random() * 9999);
    return x;
  }
}
