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

function gastos_lamp() {
  if (lampada.value == "") {
      alert('Escolha um tipo de lampada,Por favor')
      resultado_economia.style.display = 'none';
  } else {
      let consumo = Number(lampada.value) / 1000 * Number(qtd_lamp.value) * Number(horas.value)
          * Number(dias.value);
      let gasto_mes = consumo * 0.25971;
      let gasto_ano = gasto_mes * 12;

      //lamp.innerHTML = `${lampada.value}`;
      b_consumo.innerHTML = `${consumo.toFixed(2)}(kWh/mês)`;
      despesa_mes.innerHTML = `R$ ${gasto_mes.toFixed(2)}`;
      despesa_ano.innerHTML = `R$ ${gasto_ano.toFixed(2)}`;

      // direita.style.display = 'block';
  }
}

function calcularEconomia() {

  let consumo = Number(lampada.value) / 1000 * Number(qtd_lamp.value) * Number(horas.value)
      * Number(dias.value);
  let gasto_mes = consumo * 0.25971;
  let gasto_ano = gasto_mes * 12;

  let consumo2 = Number(lampada.value) / 1000 * Number(qtd_lamp.value) * Number(novas_horas.value)
      * Number(dias.value);
  let gasto_mes2 = consumo2 * 0.25971;
  let gasto_ano2 = gasto_mes2 * 12;

  b_consumo2.innerHTML = `${consumo2.toFixed(2)}(kWh/mês)`;
  despesa_mes2.innerHTML = `R$ ${gasto_mes2.toFixed(2)}`;
  despesa_ano2.innerHTML = `R$ ${gasto_ano2.toFixed(2)}`;

  var diferenca = gasto_ano - gasto_ano2;
  valor_economizado.innerHTML = `R$ ${diferenca.toFixed(2)} (${((diferenca * 100) / gasto_ano).toFixed(1)}%)`;

  // resultado_economia.style.display = 'block';
}