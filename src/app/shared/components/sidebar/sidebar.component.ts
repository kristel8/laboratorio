import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, OnInit, Output, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IItemMenu } from './models/sidebar';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms',
          style({ opacity: 1 }))
      ]),

      transition(':leave', [
        style({ opacity: 1 }),
        animate('250ms',
          style({ opacity: 0 }))
      ])
    ]),

    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(180deg)', offset: '1' })
          ]))
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  menu: IItemMenu[] = [];
  screenWidth: number = 0;
  usuario!: string;
  cargo!: string;
  isFixed: boolean = true;
  collapsed: boolean = true;
  isSeleccionado!: string;

  constructor(private authService: AuthService, private render: Renderer2) { }


  @HostListener('mouseenter') mouseEnter() {
    if (this.isFixed) { return; }
    this.screenWidth = 0;
    this.collapsed = true;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  @HostListener('mouseleave') mouseLeave() {
    if (this.isFixed) { return; }
    this.screenWidth = 0;
    this.collapsed = false;
  }

  @HostListener('window:resize', ['$event'])


  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.isFixed = true;
      this.closeSidenav();
    } else {
      this.isFixed = false;
      this.closeSidenav();
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
    this.getUsuario();
    this.getMenu();
  }

  closeSidenav() {
    if (this.isFixed) {
      this.collapsed = false;
      this.isFixed = false;
    } else {
      this.isFixed = true;
      this.collapsed = true;
      this.screenWidth = window.innerWidth;
    }
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }


  getUsuario() {
    this.usuario = `${this.authService.usuario.nombre} ${this.authService.usuario.apellido}`;
    this.cargo = this.authService.usuario.tipoUsuario;
  }

  getMenu() {
    this.menu = [];
    this.menu = this.authService.detallePermisos;
  };

}
