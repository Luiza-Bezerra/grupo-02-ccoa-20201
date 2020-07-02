

let login_usuario;
let nome_usuario;
let cnpj_empresa;
let senha;
let nome_empresa

function redirecionar_login() {
    window.location.href = 'login.html';
}
 function trocarTela(){
     cnpj_empresa = sessionStorage.cnpj_empresa_meuapp;
     senha = sessionStorage.senha_meuapp;
     senhaIns.value = senha;
     cn.value =  cnpj_empresa;
     }
function buscarEmpresa(){
    fetch(`/usuarios/Empresa/${cnpj_empresa}`)
    .then(resposta => {
        if (resposta.ok) {
            resposta.json().then(json => {
                nome_empresa = json.Nome
                NE.value =  nome_empresa;
                TELEMPRESA.value = json.Telefone
                TELEMPRESA2.value = json.Celular
              
            })
        
        } else {
            console.error('Não pegou os dados/ou não tem');
           
        } 
    });    

}
function buscarFilial(){
    var formulario = new URLSearchParams(new FormData(Form_bFilial));
    fetch("/usuarios/buscarFilial", {
        method: "POST",
        body: formulario
    }).then(resposta => {
        
        if (resposta.ok) {

            resposta.json().then(json => {

              
                TELFILIAL.value = json.Telefone
                NUMFILIAL.value = json.Numero
                RUAFILIAL.value = json.Rua
                CIDFILIAL.value =json.Cidade
                BAIFILIAL.value =json.Bairro
                FE.value = json.Estado
                CPFFILIAL.value = json.fkCPF
            });

        } else {

            console.log('Erro de login!');

            response.text().then(texto => {
                console.error(texto);
                
            });
        }
    });

    return false;

}
 function ContaDados(){
    cpf_usuario = sessionStorage.cpf_usuario_meuapp;
    rg_usuario = sessionStorage.rg_usuario_meuapp
    datanasc_usuario = sessionStorage.datanasc_usuario_meuapp;
    senha_usuario = sessionStorage.senha_usuario_meuapp;
    cnpj_empresa = sessionStorage.cnpj_empresa_meuapp;
  

    // Ids
    Nome.value = nome_usuario;
    LG.value =  login_usuario;
    CPF.value =  cpf_usuario;
    RG.value =  rg_usuario;
    DN.value =  datanasc_usuario;
    SE.value =  senha_usuario;
    cn.value =  cnpj_empresa;
    

 }
function verificar_autenticacao() {
    login_usuario = sessionStorage.login_usuario_meuapp;
    nome_usuario = sessionStorage.nome_usuario_meuapp;
    
    if (login_usuario == undefined)  {
        redirecionar_login();
    } else {
       if(nome_usuario.length > 8){
           var nome = ''
           for(var c = 0; c <= nome_usuario.length;c++){
            nome += nome_usuario[c]
                if(nome_usuario[c] == ' '){
                    break
                }
                
              
           }
           b_usuario.innerHTML = nome;
           
       }else{
                b_usuario.innerHTML = nome_usuario;
                console.log(nome_usuario)
       }
            
       }
        // trocarTela();
        validar_sessao();
    }
   

    


function logoff() {
    finalizar_sessao();
    sessionStorage.clear();
    redirecionar_login();
}

function validar_sessao() {
    fetch(`/usuarios/sessao/${login_usuario}`, {cache:'no-store'})
    .then(resposta => {
        if (resposta.ok) {
            resposta.text().then(texto => {
                console.log('Sessão :) ', texto);    
            });
        } else {
            console.error('Sessão :.( ');
            logoff();
        } 
    });    
}

function finalizar_sessao() {
    fetch(`/usuarios/sair/${login_usuario}`, {cache:'no-store'}); 
}