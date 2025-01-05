import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  iconEye: string = 'pi pi-eye';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private readonly servicioMensajesSwal: MensajesSwalService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {+
    this.loginForm.reset();
  }

  loginForm = this.fb.group({
    usuario: [null, [Validators.required]],
    contrasena: [null, [Validators.required]],
  });

  get usuario() {
    return this.loginForm.get('usuario');
  }

  get contrasena() {
    return this.loginForm.get('contrasena');
  }


  iniciarSesion() {
    this.loadingService.mostrarLoading();
    const header = this.loginForm.value;
    this.authService.login(header).subscribe((res) => {
     if(res.usuario.length > 0){
        this.router.navigate(['./dashboard']);
        this.loadingService.ocultarLoading();
     } else {
      this.servicioMensajesSwal.mensajeAdvertencia('Verifique usuario y contraseña');
      this.loadingService.ocultarLoading();
      this.loginForm.reset();
     }
    }, (error) => {
      this.servicioMensajesSwal.mensajeError(error);
      this.loadingService.ocultarLoading();
      this.loginForm.reset();
    } );
  }

  viewPassword(input:any) {
    console.log(input);
    input.type = input.type === 'password' ? 'text' : 'password';
    this.iconEye = input.type === 'password' ? 'pi pi-eye' : 'pi pi-eye-slash';
  }

}
