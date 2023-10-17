import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalManagementService {

  constructor(private location: Location, private router: Router) { }


  public sweetAlterError(errorMsg: string, navigateTo?: string) {
    
    Swal.fire({
      icon: "error",
      title: "",
      text: errorMsg,
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-primary",
      },
    }).then(() => {
      if(!navigateTo) {
        return;
      } else {       
        this.router.navigate(Array.of(navigateTo));
      }
    })
  }


  public sweetAlterSuccess(successrMsg: string, navigateTo?: string) {
    Swal.fire({
      icon: "success",
      title: "",
      text: successrMsg,
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-primary",
      },
    }).then(() => {
      if(!navigateTo) {
        return;
      } else {
        this.router.navigate(Array.of(navigateTo));
      }
    })
  }

  public showAlert(alertProps) {
    Swal.fire({
      icon: alertProps.icon,
      title: 'Confirme a operação!',
      text: alertProps.text,
      showCancelButton: true,
      confirmButtonColor: '#403D39',
      cancelButtonColor: '#dbd9d6',
      confirmButtonText: 'Confirmar!',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        alertProps.callback();
      }

    })
  }
}
