import { Component, ElementRef } from '@angular/core';
import { LocalUserModel } from 'app/security/models/local-user';
import { SecurityService } from 'app/security/services/security.service';
import { isEmpty } from 'app/shared/utils/utils';

@Component({
  selector: 'guest-home',
  templateUrl: './guest-home.component.html',
  styleUrls: ['./guest-home.component.scss']
})
export class GuestHomeComponent {

  focus;
  focus1;
  focus2;
    test : Date = new Date();
    private toggleButton;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    public loggedUser: LocalUserModel;
    public canShowBackOfficeSection: boolean = false;
    public canShowCitezenSection: boolean = false;

    constructor(private element : ElementRef, private securityService: SecurityService) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }
    checkFullPageBackgroundImage(){
        var $page = $('.full-page');
        var image_src = $page.data('image');
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('register-page');
        if(image_src !== undefined){
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };

    ngOnInit(){

        this.securityService.localUserObservar.subscribe((user) => {
            this.loggedUser = user;
            let profiles = this.loggedUser?.profiles;
            if(!isEmpty(profiles)) {
                if(profiles.some((profile) => profile.code === 'COMPLAINER')) {
                    this.canShowCitezenSection = true;
                } else {
                    this.canShowBackOfficeSection = true;
                    this.canShowCitezenSection = true;
                }
            }
            
        })



        this.checkFullPageBackgroundImage();

        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        setTimeout(function(){
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    }
    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('register-page');
    }
    sidebarToggle(){
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if(this.sidebarVisible == false){
            setTimeout(function(){
                toggleButton.classList.add('toggled');
            },500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }

}
