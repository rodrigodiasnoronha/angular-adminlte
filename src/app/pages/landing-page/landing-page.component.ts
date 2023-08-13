import { LoginModel } from '@/models/login.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '@services/app.service';
import { ToastrService } from 'ngx-toastr';
import { ModalCadastrarUsuarioComponent } from './modal-cadastrar-usuario/modal-cadastrar-usuario.component';
import { ModalEsqueciSenhaComponent } from './modal-esqueci-senha/modal-esqueci-senha.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  public abrirNavbar: boolean = false
  public formLogin: FormGroup;
  public carregandoLogin: boolean = false
    
  ngOnInit() {
    const login = new LoginModel()
    this.formLogin = new FormGroup({
      email: new FormControl(login.email, [Validators.required, Validators.email]),
      senha: new FormControl(login.senha, [Validators.required])
    });
    
  }
  
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private appService: AppService
  ) { }

  async onClickLogin() {
    if (this.formLogin.valid) {
      this.carregandoLogin = true
      await this.appService.loginByAuth(this.formLogin.value)
      this.carregandoLogin = false
    } else {
      this.toastr.error('Preencha os campos do formulário corretamente', 'Campos inválidos');
    }
  }

  toggleAbrirModalCadastrarUsuario() {
    this.modalService.open(ModalCadastrarUsuarioComponent, { fullscreen: true, centered: true, backdrop: false, animation: true, keyboard: false })
  }

  toggleAbrirModalEsqueciSenha() {
    this.modalService.open(ModalEsqueciSenhaComponent, { fullscreen: true, centered: true, backdrop: false, animation: true, keyboard: false })
  }

  // abre/fecha navbar mobile
  toggleNavbar() {
    // // var scroll = $(window).scrollTop();
    this.abrirNavbar = !this.abrirNavbar

    let el = document.getElementById("navigation")
    if (!this.abrirNavbar) {
      this.slideUp(el)
    } else {
      this.slideDown(el)
    }
  }

  // oculta a navbar no mobile
  slideDown(element: any) {
    element.style.display = "block";
    const height = element.clientHeight;
    element.style.height = "0";

    // Animate the height from 0 to the original height
    const animation = element.animate(
      { height: [0, height + "px"] },
      { duration: 300, easing: "ease" }
    );

    animation.onfinish = function () {
      element.style.height = "auto"; // Set height back to auto after animation
    };
  }

  // abre a navbar no mobile
  slideUp(element: any) {
    const height = element.clientHeight;

    // Animate the height from the current height to 0
    const animation = element.animate(
      { height: [height + "px", 0] },
      { duration: 300, easing: "ease" }
    );

    animation.onfinish = function () {
      element.style.display = "none";
    };
  }
}
