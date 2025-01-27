import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-auth-admin',
  standalone: true,
  imports: [],
  templateUrl: './auth-admin.component.html',
  styleUrl: './auth-admin.component.css'
})
export class AuthAdminComponent implements AfterViewInit {
  
  // Variáveis
  entidade : string = "Empresa Modelo Ryan"


  // Elementos:
  @ViewChild('entidade') user_entidade !: ElementRef<HTMLInputElement>;
  @ViewChild('login') user_login !: ElementRef<HTMLInputElement>;
  @ViewChild('senha') user_senha !: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    this.user_entidade.nativeElement.value = this.entidade
  }

  async admin_login(){
    if((this.user_login.nativeElement.value).replaceAll(" ","") == ""){
      alert("Login e Senha são obrigatórios!");
      return
    };

    if(this.user_senha.nativeElement.value == ""){
      alert("Login e Senha são obrigatórios!");
      return
    }

    try{

      let request = await fetch('http://192.168.1.5:8080/auth/admin', {
        method: "POST",
        headers: {
          "Token":"21232f297a57a5a743894a0e4a801fc3",
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          login: this.user_login.nativeElement.value,
          senha: this.user_senha.nativeElement.value
        })
      });

      if(!request.ok){ console.log(request); return };

      let data = await request.json();

      alert(data.mensagem || data.sucesso)
      
    }
    catch(erro){
      alert(erro)
    }
  }
}
