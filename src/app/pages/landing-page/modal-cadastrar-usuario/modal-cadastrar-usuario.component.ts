import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-cadastrar-usuario',
  templateUrl: './modal-cadastrar-usuario.component.html',
  styleUrls: ['./modal-cadastrar-usuario.component.scss']
})
export class ModalCadastrarUsuarioComponent {

  constructor(private modalService: NgbModal) { }


  submitCadastrarUsuario() {
    alert("falta integrar")
  }

  clickAbrirModalLogin() {
    alert("falta integrar")
  }

  clickFechaModalLogin() {
    this.modalService.dismissAll()
  }
}
