import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MensajesGlobales } from 'src/app/global/mensajes';
import { MensajesSwalService } from '../../services/mensajes-swal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService, private mensajeSwal: MensajesSwalService) { }

  ngOnInit(): void { }

  cerrarSesion() {
    this.mensajeSwal.mensajePregunta(MensajesGlobales._MENSAJE_PREGUNTA_LOGOUT).then(
      response => {
        if (response.isConfirmed) {
          this.authService.logout();
          this.router.navigate(['./']);
        }
      });
  }
}
