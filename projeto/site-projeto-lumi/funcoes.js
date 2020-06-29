let login_usuario;
let nome_usuario;
let cnpj_empresa;
let senha;

function redirecionar_login() {
    window.location.href = 'login.html';
}
function trocarTela(){
    cnpj_empresa = sessionStorage.cnpj_empresa_meuapp;
    senha = sessionStorage.senha_meuapp;
    cn.value =  cnpj_empresa;
}
function verificar_autenticacao() {
    login_usuario = sessionStorage.login_usuario_meuapp;
    nome_usuario = sessionStorage.nome_usuario_meuapp;
    
    if (login_usuario == undefined)  {
        redirecionar_login();
    } else {
        if(nome_usuario.length > 8){
            for(var c = 0;c < 8;c++){
                if(nome_usuario[c] == ' '){
                    break
                }
                b_usuario.innerHTML += nome_usuario[c];
            }
       }else{
        b_usuario.innerHTML = nome_usuario;
       }
        trocarTela()
        validar_sessao();
    }
    
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