import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';

// Services
import { ValidationService } from '../../../services/config/config.service';
import { StudentService } from '../../../services/student/student.service';
import { routerTransition } from '../../../services/config/config.service';

import { ToastrService } from 'ngx-toastr';

import { minYearValidator } from '../../../validators/dateValidator';
import { averageValidator } from '../../../validators/averageValidator';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css'],
  animations: [routerTransition()],
  host: { '[@routerTransition]': '' },
})
export class StudentAddComponent implements OnInit {
  // create studentAddForm of type FormGroup
  studentAddForm: FormGroup;
  index: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private toastr: ToastrService
  ) {
    // Check for route params
    this.route.params.subscribe((params) => {
      this.index = params['id'];
      // check if ID exists in route & call update or add methods accordingly
      if (this.index && this.index != null && this.index != undefined) {
        this.getStudentDetails(this.index);
      } else {
        this.createForm(null);
      }
    });
  }

  ngOnInit() {}

  // Submit student details form
  doRegister() {
    if (this.index && this.index != null && this.index != undefined) {
      this.studentAddForm.value.id = this.index;
    } else {
      this.index = null;
    }

    for (const property in this.studentAddForm.value) {
      const value = this.studentAddForm.value[property];
      if (
        (value == null ||
          value == undefined ||
          value.toString().trim() == '') &&
        property != 'id'
      ) {
        this.studentAddForm.get(property).setValue('-');
      }
    }

    let first_name = this.studentAddForm.get('first_name');
    let last_name = this.studentAddForm.get('last_name');
    first_name.setValue(first_name.value.trim());
    last_name.setValue(last_name.value.trim());

    this.studentAddForm.get('last_edit').setValue(new Date().toISOString());

    let studentRegister = this.studentService.doRegisterStudent(
      this.studentAddForm.value,
      this.index
    );
    if (studentRegister) {
      if (studentRegister.code == 200) {
        this.toastr.success('Oznam', studentRegister.message);
        this.router.navigate(['/']);
      } else {
        this.toastr.error('Chyba', studentRegister.message);
      }
    }
  }

  // If this is update form, get user details and update form
  getStudentDetails(index: number) {
    let studentDetail = this.studentService.getStudentDetails(index);
    this.createForm(studentDetail);
  }

  // If this is update request then auto fill form
  createForm(data: any) {
    if (data == null) {
      this.studentAddForm = this.formBuilder.group({
        first_name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        last_name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        date_birth: [
          '',
          [
            minYearValidator(
              new Date().getFullYear() - 70,
              new Date().getFullYear() - 14
            ),
          ],
        ],
        average: ['', [averageValidator()]],
        class: ['', []],
        subject: ['', []],
        gender: ['', []],
        info: ['', [Validators.maxLength(100)]],
        disabled: ['', []],
        last_edit: ['', []],
      });
    } else {
      let fetched = data.studentData;

      this.studentAddForm = this.formBuilder.group({
        first_name: [
          fetched.first_name,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        last_name: [
          fetched.last_name,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        date_birth: [
          fetched.date_birth,
          [
            minYearValidator(
              new Date().getFullYear() - 70,
              new Date().getFullYear() - 14
            ),
          ],
        ],
        average: [fetched.average, [averageValidator()]],
        class: [fetched.class, []],
        subject: [fetched.subject, []],
        gender: [fetched.gender, []],
        info: [fetched.info, [Validators.maxLength(100)]],
        disabled: [fetched.disabled, []],
        last_edit: [fetched.last_edit, []],
      });
    }
  }
}
