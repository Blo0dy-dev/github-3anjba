import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  constructor() {}

  doLogin(data: any) {
    if (data.username == 'admin' && data.password == 'admin123') {
      return {
        code: 200,
        message: 'Prihlásenie bolo úspešné',
        data: data,
      };
    } else {
      return {
        code: 503,
        message: 'Zlé meno alebo heslo',
        data: null,
      };
    }
  }

  // doRegister(data){
  // 	return this.http.post('user-add.php',data);
  // }
}
