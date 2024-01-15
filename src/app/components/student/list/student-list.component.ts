import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

// Services
import { StudentService } from '../../../services/student/student.service';
import { routerTransition } from '../../../services/config/config.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  animations: [routerTransition()],
  host: { '[@routerTransition]': '' },
})
export class StudentListComponent implements OnInit {
  studentList: any;
  studentListData: any;
  filterData: string = '';
  constructor(
    private studentService: StudentService,
    private toastr: ToastrService
  ) {}

  // Call student list function on page load
  ngOnInit() {
    this.getStudentList();
  }

  // Get student list from services
  getStudentList() {
    let studentList = this.studentService.getAllStudents();
    this.success(studentList);
  }

  // Get student list success
  success(data: any) {
    this.studentListData = data.data;
    for (var i = 0; i < this.studentListData.length; i++) {
      this.studentListData[i].name =
        this.studentListData[i].first_name +
        ' ' +
        this.studentListData[i].last_name;

      for (const property in this.studentListData[i]) {
        const value = this.studentListData[i][property];
        if (
          (value == null ||
            value == undefined ||
            value.toString().trim() == '') &&
          property != 'id'
        ) {
          this.studentListData[i][property] = '-';
        }
      }

      if (this.studentListData[i].date_birth != '-') {
        let dateObjBirth = new Date(this.studentListData[i].date_birth);
        let dateStringBirth = `${('0' + dateObjBirth.getDate()).slice(-2)}/${(
          '0' +
          (dateObjBirth.getMonth() + 1)
        ).slice(-2)}/${('0' + dateObjBirth.getFullYear()).slice(-4)}`;
        this.studentListData[i].date_birth = dateStringBirth;
      }

      let dateObjEdit = new Date(this.studentListData[i].last_edit);
      let dateStringEdit = `${('0' + dateObjEdit.getDate()).slice(-2)}/${(
        '0' +
        (dateObjEdit.getMonth() + 1)
      ).slice(-2)}/${('0' + dateObjEdit.getFullYear()).slice(-4)} ${(
        '0' + dateObjEdit.getHours()
      ).slice(-2)}:${('0' + dateObjEdit.getMinutes()).slice(-2)}`;
      this.studentListData[i].last_edit = dateStringEdit;

      if (this.studentListData[i].disabled == true) {
        this.studentListData[i].disabled = 'Áno';
      } else if (this.studentListData[i].disabled == false) {
        this.studentListData[i].disabled = 'Nie';
      }
    }
  }

  // Delete a student with its index
  deleteStudent(index: number) {
    let r = confirm('Ste si istý, že chcete vymazať daného študenta?');
    if (r == true) {
      let studentDelete = this.studentService.deleteStudent(index);
      if (studentDelete) {
        this.toastr.success('Oznam', 'Študent bol úspešne vymazaný');
      }
      this.getStudentList();
    }
  }
}
