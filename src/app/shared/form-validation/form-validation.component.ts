import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

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

  static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) : string {
    const config = {
      'required': `${fieldName} é obrigatório!`,
      'phone': `${fieldName} deve conter apenas números!`,
      'email': `${fieldName} deve ser válido!`,
    }

    return config[validatorName];
  }

}
