import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '@services/app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-esqueci-senha',
  templateUrl: './modal-esqueci-senha.component.html',
  styleUrls: ['./modal-esqueci-senha.component.scss']
})
export class ModalEsqueciSenhaComponent implements OnInit {
  public formRecuperarSenha: FormGroup
  public carregandoRecuperarSenha: boolean = false

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.formRecuperarSenha = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
    });
  }


  clickFechaModalLogin() {
    this.modalService.dismissAll()
  }

  onClickRecuperarSenha() {
    if (this.formRecuperarSenha.valid) {
      this.carregandoRecuperarSenha = true
      this.appService.recuperarSenha(this.formRecuperarSenha.value)
      this.carregandoRecuperarSenha = false
    } else {
      this.toastr.error('Preencha o campo de e-mail corretamente')
    }
  }
}
