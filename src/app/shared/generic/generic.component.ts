import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'generic',
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.scss']
})
export class GenericComponent {

  alertProps: {
    icon: string,
    text: string,
    alertText: string,
    callback: () => any;
  }

  protected constructor() { }

  public getFormControl(form: FormGroup, name: string): FormControl {
    return form.get(name) as FormControl;
  }

  public getFormControls(form: FormGroup, name: string): FormControl[] {
    return form.get(name) as unknown as FormControl[];
  }

  isValidForm(form: FormGroup) {
    if (form.invalid) {
      this.checkFormValidation(form);
      return false;
    } else {
      return true
    }
  }

  checkFormValidation(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(field => {

      const control = formGroup.get(field);
      control.markAsDirty();
      control.markAsTouched();

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.checkFormValidation(control);
      }

    })
  }

  checkFomControlValidation(formControl: FormControl) {
    formControl.markAsDirty();
    formControl.markAsTouched();

  }

  protected dynamicCheckboxValidator(control: FormArray) {
    let returnValue = false;
    for (let index = 0; index < control.length; index++) {
      if (control.value[index]) {
        returnValue = true;
      }
    }

    if (!returnValue) {
      return { required: true };
    } else {
      return null;
    }
  }

}
