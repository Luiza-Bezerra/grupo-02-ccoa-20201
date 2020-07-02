var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Usuario = require('../models').Usuario;
var Empresa = require('../models').Empresa;
var Filial = require('../models').Filial
var nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({ 
    host:"SMTP.office365.com",
    port:"587",
    secure:false,
    auth:{
        user:"201grupo2c@bandtec.com.br",
        pass:"Luminous@@2020"
    }
}
)


let sessoes = [];
// enviar email da luminous
router.post('/enviarEmail',function(req,res,nexy){
    
    console.log('Enviando...')
    var email = req.body.email
    transporter.sendMail(
        {
            from:"Luminous <201grupo2c@bandtec.com.br>",
            to:email,
            subject:"Novidades Luminous",
            text:"Ola, Bem vindo a Luminous, agora você recebera todas as novidades e promoções da empresa atraves deste email,nosso intuito é sua confortabilidade ao usar nosso produto, afim de economizar tempo e facilitar sua vida.Obrigado por contar com a gente, Assinado:Equipe de TI Luminous!"
        }
    ).then(message =>{
		console.log(message)
    }).catch(err =>{
        console.log(err)
    })
    console.log(req.body.email)

  
})

/* Recuperar usuário por login e senha */
router.post('/autenticar', function(req, res, next) {
	console.log('Recuperando usuário por login e senha');

	var email = req.body.emailLogin; // depois de .body, use o nome (name) do campo em seu formulário de login
	var senha = req.body.senhaLogin; // depois de .body, use o nome (name) do campo em seu formulário de login	
	email = email.trim()
	senha = senha.trim()
	let instrucaoSql = `select * from usuario where Email='${email}' and Senha='${senha}'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Usuario
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);

		if (resultado.length == 1) {
			sessoes.push(resultado[0].dataValues.Email); 
			console.log('sessoes: ',sessoes);
			res.json(resultado[0]);
		} else if (resultado.length == 0) {
			res.status(403).send('Login e/ou senha inválido(s)');
		} else {
			res.status(403).send('Mais de um usuário com o mesmo login e senha!');
		}

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

/* Cadastrar usuário */
router.post('/cadastrar', function(req, res, next) {
	console.log('Criando um usuário');
	 Empresa.create({
	 	idempresa: req.body.cnpj,
	 	nome : req.body.nomeEmpresa,
		telefone : req.body.tel1,
		celular : req.body.tel2
		
	 	}).then(resultado => {
	 	console.log(`Registro criado:`,resultado)
         res.send(resultado);
     }).catch(erro => {
	 	console.error(erro);
	 	res.status(500).send(erro.message);
  	 });
	
	Usuario.create({
		id:req.body.cpf,
		nome : req.body.nomeRepre,
		email : req.body.email,
		tipousuario: "A",
		rg: req.body.rg,
		datanasc: req.body.dataNasc,
		senha: req.body.senha,
		fkcnpj:req.body.cnpj
		}).then(resultado => {
		console.log(`Registro criado:`,resultado)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	  });
	
});
//cadastrar filial
router.post('/filial',function(req,res,nexy){
	console.log('Criando filial');

	Usuario.create({
		id: req.body.cpf,
        nome : req.body.nome,
        email : req.body.email,
        tipousuario: "G",
        rg: req.body.rg,
        datanasc: req.body.dataNasc,
        senha: req.body.senha,
        fkcnpj:req.body.fkCnpj
        }).then(resultado => {
			console.log(`Registro criado:`,resultado)
        res.send(resultado);
    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
      });
      Filial.create({
          telefone: req.body.telefone,
          rua: req.body.rua,
		  bairro: req.body.bairro,
		  estado:"sp",
          cidade: req.body.cidade,
          numero: req.body.numero,
          fkcnpj: req.body.fkCnpj,
          fkcpf: req.body.cpf
      }).then(resultado =>{
          console.log(`Registro criado:`,resultado)
          res.send(resultado);
      }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
      });

														
	 

})

/* Verificação de usuário */
router.get('/sessao/:login', function(req, res, next) {
	let login = req.params.login;
	console.log(`Verificando se o usuário ${login} tem sessão`);
	
	let tem_sessao = false;
	for (let u=0; u<sessoes.length; u++) {
		if (sessoes[u] == login) {
			tem_sessao = true;
			break;
		}
	}

	if (tem_sessao) {
		let mensagem = `Usuário ${login} possui sessão ativa!`;
		console.log(mensagem);
		res.send(mensagem);
	} else {
		res.sendStatus(403);
	}
	
});


/* Logoff de usuário */
router.get('/sair/:login', function(req, res, next) {
	let login = req.params.login;
	console.log(`Finalizando a sessão do usuário ${login}`);
	let nova_sessoes = []
	for (let u=0; u<sessoes.length; u++) {
		if (sessoes[u] != login) {
			nova_sessoes.push(sessoes[u]);
		}
	}
	sessoes = nova_sessoes;
	res.send(`Sessão do usuário ${login} finalizada com sucesso!`);
});

// pegar dados da empresa
router.get('/Empresa/:cnpj', function(req, res, next) {
	let cnpj = req.params.cnpj;
	var insSQL = `select * from Empresa where CNPJ = '${cnpj}'`
	sequelize.query(insSQL,{
		model:Empresa
	}).then(resultado =>{
		console.log(resultado[0].dataValues.Nome)
		res.json(resultado[0])
	})
	
});
// pegar dados Filial
router.post('/buscarFilial', function(req, res, next) {
	let id = req.body.nFilial;
	var insSQL = `select * from Filial where idFilial = '${id}'`
	sequelize.query(insSQL,{
		model:Filial
	}).then(resultado =>{
		res.json(resultado[0])
	})
	
});

/* Recuperar todos os usuários */
router.get('/', function(req, res, next) {
	console.log('Recuperando todos os usuários');
	Usuario.findAndCountAll().then(resultado => {
		console.log(`${resultado.count} registros`);

		res.json(resultado.rows);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

module.exports = router;
