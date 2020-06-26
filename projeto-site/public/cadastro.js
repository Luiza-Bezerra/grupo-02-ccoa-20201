function cpf(){
    var c = Cpf.value;
    c = c.trim()
        if(c.length == 11){
            return true;
        } else {
            erros.push("O CPF deve ter esse formato: 000.000.000-00 (Os caractéres especiais devem ser ignorados.)")
            return false;
        }
}

function cnpj(){
    var c = Cnpj.value;
    c =c.trim()
    if(c.length == 14){
        return true;
    } else {
        erros.push("O CNPJ deve ter formato: XX.XXX.XXX/XXXX-XX (Os caractéres especiais devem ser ignorados.)")
        return false;
    }
}

function tratar_nome(tipo){
    var nome = Nome.value;
    nome = nome.trim()
    if(tipo == 1){
        if(nome == ""){
            return false
            erros.push("Insira o Nome da Empresa");
        } else{
            return true;
        }
    } else if (tipo == 2){
        if(nome.value.search(" ") == -1){
            return false
            erros.push("Insira o Nome Completo do Representante");
        } else{
            return true;
        }
    }
}

function telefone(){
    var tel = Telefone.value
    tel = tel.trim()
        if(tel >= 10 && tel <= 11){
            return true;
        } else{
            return false
            erros.push("O telefone deve ter formato: 00 90000-0000 (Os caractéres especiais devem ser ignorados.)");
        }
    }

function nasc(){
    var dataNasc = DataNasc.value;
    dataNasc = dataNasc.trim()
    if(dataNasc.value.search("-") == -1 ||
    dataNasc.value.length > 10 ||
    dataNasc.value[dataNasc.value.length - 2 && -5] != "/"){
        erros.push("A Data de Nascimento deve ter esse formato: dd/mm/aaaa")
        return false;
    } else{
        return true;
    }
}

function rg(){
    var r = Rg.value
    r = r.trim()
    if(r.value.search("-") == -1 ||
    r.value.length == 9){
        return true;
    } else{
        return false
        erros.push("O RG deve ter esse formato: 00.000.000-0 (Os caractéres especiais devem ser ignorados.)");
    }
}

function email(){
    var e = Email.value;
    e = e.trim()
    if(e.indexOf("@") == -1 || e.indexOf(".com") == -1){
        return false
        erros.push("O formato de email é: usuario@dominio.com");
    } else{
        return true;
    }
}

function senha(){
    var s = Senha.value;
    var cs =ConfSenha.value;
    s = s.trim();
    cs = cs.trim()
    if(s > 6){
        if(s == cs){
            return true;
        } else{
            return false 
            erros.push("As senhas não iguais.");
        }
    } else{
        return false
            erros.push("A senha ter ter no mínimo 6 dígitos.");
        }
}
function tudo(){
    if(cpf() && cnpj() && tratar_nome() && telefone() && nasc() && rg() && email() && senha()){
        return true;
    }else{
        return false;
    }
} 