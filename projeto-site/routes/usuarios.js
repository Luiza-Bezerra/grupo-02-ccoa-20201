var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Usuario = require('../models').Usuario;
var Empresa = require('../models').Empresa;

let sessoes = [];

/* Recuperar usuário por login e senha */
router.post('/autenticar', function(req, res, next) {
	console.log('Recuperando usuário por login e senha');

	var email = req.body.emailLogin; // depois de .body, use o nome (name) do campo em seu formulário de login
	var senha = req.body.senhaLogin; // depois de .body, use o nome (name) do campo em seu formulário de login	
	email.trim()
	senha.trim()
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
	
	Usuario.create({
		nome : req.body.nomeRepre,
		email : req.body.email,
		tipousuario: "A",
		cpf: req.body.cpf,
		rg: req.body.rg,
		datanasc: req.body.dataNasc,
		senha: req.body.senha,
		fkcnpj:req.body.cnpj
		}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	  });
	 Empresa.create({
	 	idempresa: req.body.cnpj,
	 	nome : req.body.nomeEmpresa,
		telefone : req.body.tel1,
		celular : req.body.tel2
		
	 	}).then(resultado => {
	 	console.log(`Registro criado: ${resultado}`)
         res.send(resultado);
     }).catch(erro => {
	 	console.error(erro);
	 	res.status(500).send(erro.message);
  	 });
});
//cadastrar filial
router.post('/filial',function(res,req,nexy){
	console.log('Criando filial');
	Usuario.create({
		nome : req.body.nome,
		email : req.body.email,
		tipousuario: "G",
		cpf: req.body.cpf,
		rg: req.body.rg,
		datanasc: req.body.dataNasc,
		senha: req.body.senha,
		fkcnpj:req.body.fkCnpj
		}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	  });
	  Filial.create({
		  telefone: req.body.telefone,
		  rua: req.body.rua,
		  bairro: req.body.bairro,
		  cidade: req.body.cidade,
		  numero: req.body.numero,
		  fkcnpj: req.body.fkCnpj,
		  fkusuario: Usuario.Usuario
	  }).then(resultado =>{
		  console.log(`Registro criado: ${resultado}`)
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
