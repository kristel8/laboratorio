import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajesSwalService } from 'src/app/shared/services/mensajes-swal.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  iconEye: string = 'pi pi-eye';
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private readonly servicioMensajesSwal: MensajesSwalService,
  ) { }

  ngOnInit(): void {
    +
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
    const header = this.loginForm.value;

    this.authService.login(header).subscribe((res) => {
      if (res[0].usuario) {
        this.isLoading = true;
        setTimeout(() => {
          this.router.navigate(['./dashboard']);
          this.isLoading = false;
        }, 2000);

      } else {
        this.servicioMensajesSwal.mensajeAdvertencia('Verifique usuario y contraseña');
        this.isLoading = false;
        this.loginForm.reset();
      }
    }, (error) => {
      this.servicioMensajesSwal.mensajeError(error);
      this.isLoading = false;

      this.loginForm.reset();
    });
  }

  viewPassword(input: any) {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.iconEye = input.type === 'password' ? 'pi pi-eye' : 'pi pi-eye-slash';
  }

}
