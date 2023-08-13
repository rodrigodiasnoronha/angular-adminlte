import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gatekeeper } from 'gatekeeper-client-sdk';
import { environment } from 'environments/environment';
import { urlEncode } from '@/utils/urlEncoded';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user: any;
    private api = environment.endpoint_api

    constructor(
        private router: Router,
        private toastr: ToastrService,
        private http: HttpClient
    ) {}
    
     public getDadosUsuarioLogadoStorage() {
        this.user = localStorage.getItem('user')
        const userStorage = localStorage.getItem('user')
        if (userStorage) {
            this.user = JSON.parse(userStorage)
            return JSON.parse(userStorage)
        } else {
            return {}
        }
    }

    private getHeaders(data: object = {}): HttpHeaders {
        const accessToken = localStorage.getItem('token')
        // Set up the headers with the Bearer token

        if (accessToken) {
            return new HttpHeaders({
                Authorization: `bearer ${accessToken}`,
                ...data
            })
        } else {
            return new HttpHeaders({
                ...data
            })
        }
    }

    async loginByAuth({ email, senha }) {
        // limpo pra evitar bug
        localStorage.clear()

        // endpoint de login só aceitar form data url encoded, aqui convertermos o objeto pra url encoded e adicionamos um header dizendo que o body é url encoded
        const body = urlEncode({ username: email, password: senha, grant_type: 'password' })
        const headers = this.getHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

        this.http.post(this.api + `/security/token`, body, { headers }).subscribe({
            next: (response: { access_token: string }) => {

                // pega os dados do usuário logado
                const access_token = response.access_token;
                const headers = this.getHeaders({
                    'Authorization': `bearer ${access_token}`
                })
                this.http.get(this.api + `/Usuario/ObterUsuarioLogado`, { headers }).subscribe({
                    next: (usuario: any) => {
                        // seta os dados no storage
                        this.toastr.success('Login efetuado com sucesso.')
                        localStorage.setItem('token', access_token)
                        localStorage.setItem('user', JSON.stringify(usuario))
                        this.router.navigate(['/dashboard']);
                    },
                    error: error => {
                        this.toastr.error('Não foi possível recuperar os dados do usuário.')
                    }
                })

            },
            error: error => {
                if (error?.status == 400) {
                    this.toastr.error('Usuário ou senha inválidos.')
                } else if (error?.status == 500) {
                    this.toastr.error('Serviço indisponível. Tente novamente mais tarde.')
                } else {
                    this.toastr.error('Serviço indisponível.')
                }
            }
        })
    }

    recuperarSenha({ email }) {
        this.http.post(this.api + `/Usuario/RecuperarSenha`, { Email: email }).subscribe({
            next: response => {
                this.toastr.success(response as string)
            },
            error: error => {
                console.log(error)
                if (typeof error?.error?.Message == 'string') {
                    this.toastr.error(error?.error?.Message)
                } else {
                    this.toastr.error("Serviço indisponível.")
                }
            }
        })
    }

    async registerByAuth({ email, password }) {
        try {
            const token = await Gatekeeper.registerByAuth(email, password);
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async loginByGoogle() {
        try {
            const token = await Gatekeeper.loginByGoogle();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Login success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByGoogle() {
        try {
            const token = await Gatekeeper.registerByGoogle();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async loginByFacebook() {
        try {
            const token = await Gatekeeper.loginByFacebook();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Login success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByFacebook() {
        try {
            const token = await Gatekeeper.registerByFacebook();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async getProfile() {
        const headers = this.getHeaders()
        return this.http.get(this.api + `/Usuario/ObterUsuarioLogado`, { headers }).subscribe({
            next: (usuario: any) => {
                this.user = usuario
                localStorage.setItem('user', JSON.stringify(usuario))
            },
            error: error => {
                this.logout();
                throw error;
            }
        })
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // localStorage.removeItem('gatekeeper_token');
        this.user = null;
        this.router.navigate(['/']);
    }

}
