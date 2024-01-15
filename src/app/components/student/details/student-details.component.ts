import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// Services
import { StudentService } from '../../../services/student/student.service';
import { routerTransition } from '../../../services/config/config.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
  animations: [routerTransition()],
  host: { '[@routerTransition]': '' },
})
export class StudentDetailsComponent implements OnInit {
  index: any;
  studentDetail: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private toastr: ToastrService
  ) {
    // Get user detail index number sent in params
    this.route.params.subscribe((params) => {
      this.index = params['id'];
      if (this.index && this.index != null && this.index != undefined) {
        this.getStudentDetails(this.index);
      }
    });
  }

  ngOnInit() {}

  // Get student details
  getStudentDetails(index: number) {
    let getStudentDetail = this.studentService.getStudentDetails(index);
    this.success(getStudentDetail);
    this.toastr.success('Oznam', getStudentDetail.message);
  }

  success(data: any) {
    this.studentDetail = data.studentData;

    for (const property in this.studentDetail) {
      const value = this.studentDetail[property];
      if (
        (value == null ||
          value == undefined ||
          value.toString().trim() == '') &&
        property != 'id'
      ) {
        this.studentDetail[property] = '-';
      }
    }

    if (this.studentDetail.date_birth.date_birth != '-') {
      let dateObjBirth = new Date(this.studentDetail.date_birth);
      let dateStringBirth = `${('0' + dateObjBirth.getDate()).slice(-2)}/${(
        '0' +
        (dateObjBirth.getMonth() + 1)
      ).slice(-2)}/${('0' + dateObjBirth.getFullYear()).slice(-4)}`;
      this.studentDetail.date_birth = dateStringBirth;
    }

    let dateObjEdit = new Date(this.studentDetail.last_edit);
    let dateStringEdit = `${('0' + dateObjEdit.getDate()).slice(-2)}/${(
      '0' +
      (dateObjEdit.getMonth() + 1)
    ).slice(-2)}/${('0' + dateObjEdit.getFullYear()).slice(-4)} ${(
      '0' + dateObjEdit.getHours()
    ).slice(-2)}:${('0' + dateObjEdit.getMinutes()).slice(-2)}`;
    this.studentDetail.last_edit = dateStringEdit;

    if (this.studentDetail.disabled == true) {
      this.studentDetail.disabled = 'Áno';
    } else if (this.studentDetail.disabled == false) {
      this.studentDetail.disabled = 'Nie';
    }
  }
}
