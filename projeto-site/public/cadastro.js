// 

function senhaCadastrar(){
    var S = senhaConf.value;
    var confSenha = conf.value;
    if(S != confSenha){
        div_erros.innerHTML = 'senhas não coincidem'
        return false;
    }else{
        div_erros.innerHTML = ''
        return true;
    }
}