import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { isEmpty } from '../utils/utils';

@Component({
  template: '',
})
export class FormValidation {

  constructor() {}

  static phone(control: FormControl) {
    const value = control.value;
    const regex = /^[0-9]\d*$/;

    if (value === null || value === '') {
      return null
    }

    return regex.test(value) ? null : { phone: true }
  }

  static nuit(control: FormControl) {
    const value = control.value;
    const regex = /^\d{9}$/;

    if (value === null || value === '') {
      return null
    }

    return regex.test(value) ? null : { nuit: true }
  }

  static confirmPassword(formGroup: FormGroup) {       
    const password = formGroup.controls['password'].value;
    const confirmPassword = formGroup.controls['confirmPassword'].value;
    if(isEmpty(password) || isEmpty(confirmPassword)) {
      return null;
    }
    let result = password === confirmPassword ? null : formGroup.controls['confirmPassword'].setErrors({ confirmPassword: true });

    return result;
  }



  static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) : string {    
    const config = {
      'required': `${fieldName} é obrigatório!`,
      'phone': `${fieldName} deve conter apenas números!`,
      'email': `${fieldName} deve ser válido!`,
      'nuit': `${fieldName} deve conter 9 dígitos!`,
      'confirmPassword': `As senhas não coincidem!`,
    }

    return config[validatorName];
  }

}
