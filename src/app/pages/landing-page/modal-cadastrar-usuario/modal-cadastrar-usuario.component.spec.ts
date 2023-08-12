import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastrarUsuarioComponent } from './modal-cadastrar-usuario.component';

describe('ModalCadastrarUsuarioComponent', () => {
  let component: ModalCadastrarUsuarioComponent;
  let fixture: ComponentFixture<ModalCadastrarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCadastrarUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCadastrarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
