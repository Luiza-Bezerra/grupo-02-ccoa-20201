function cadastrar() {

  if(senhaCadastrar()){
  var formulario = new URLSearchParams(new FormData(form_cadastro));
  fetch("/usuarios/cadastrar", {
      method: "POST",
      body: formulario
  }).then(function (response) {
      
      if (response.ok) {
          alert('Usuario Inserido com sucesso')
          window.location.href='login.html';

      } else {

          console.log('Erro de cadastro!');
          alert('Erro no cadastro,verifique se as informações estao inseridas corretamente!')
          response.text().then(function (resposta) {
              
          });
     
      }
  });
}else{
  alert('Senhas não coincidem')
}
  return false;
}



function logar() {
  console.log("logou >.<");
}

function entrar() {
  var formulario = new URLSearchParams(new FormData(form_login));
  fetch("/usuarios/autenticar", {
    method: "POST",
    body: formulario
  }).then(resposta => {
    if (resposta.ok) {
      resposta.json().then(json => {
        sessionStorage.login_usuario_meuapp = json.Email;
        sessionStorage.nome_usuario_meuapp = json.Nome;
        sessionStorage.cnpj_empresa_meuapp = json.fkCNPJ;
        sessionStorage.senha_meuapp = json.senha;
        sessionStorage.cpf_usuario_meuapp = json.CPF;
        sessionStorage.rg_usuario_meuapp = json.RG;
        sessionStorage.datanasc_usuario_meuapp = json.DataNasc;

        window.location.href = "dashboard.html";
      });
    } else {
      console.log("Erro de login!");
      alert("Senha ou email incorreto!");
      response.text().then(texto => {
        console.error(texto);
      });
    }
  });

  return false;
}
