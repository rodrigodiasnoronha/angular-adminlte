import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-esqueci-senha',
  templateUrl: './modal-esqueci-senha.component.html',
  styleUrls: ['./modal-esqueci-senha.component.scss']
})
export class ModalEsqueciSenhaComponent {

  constructor(private modalService: NgbModal) { }

  clickFechaModalLogin() {
    this.modalService.dismissAll()
  }

  clickRecuperarSenha() {
    alert("falta integrar")
  }
}
