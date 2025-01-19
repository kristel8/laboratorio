import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IItemMenu } from '../sidebar/models/sidebar';

@Component({
  selector: 'app-sidebar-template',
  templateUrl: './sidebar-template.component.html',
  styleUrls: ['./sidebar-template.component.scss']
})
export class SidebarTemplateComponent implements OnInit {

  menu: IItemMenu [] = [];
  usuario!: any;


  constructor(  private authService: AuthService) { }

  ngOnInit(): void {
    //this.getUsuario();
    this.getMenu();
  }

  // getUsuario () {
  //   this.usuario = this.authService.usuario;
  // }

  getMenu () {
   //this.menu = this.authService.permisos;
  }
}
