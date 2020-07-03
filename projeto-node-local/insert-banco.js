/*
 abrir a pasta deste arquivo via git bash e executar:
 npm i
 npm start
 talvez mostre uma mensagem de erro de placa arduino 
 mas depois vai começar a registrar os dados
*/ 

// se usar 'true' aqui, os dados serão gerados aleatórios e não recebidos da placa arduíno
const gerar_dados_aleatorios = true; 
const intervalo_geracao_aleatoria_segundos = 5; // intervalo, em segundos, no qual os dados aleatórios serão gerados

// leitura dos dados do Arduino

const banco = require(`./banco`);

// prevenir problemas com muitos recebimentos de dados do Arduino
require('events').EventEmitter.defaultMaxListeners = 15;






// função que recebe valores de temperatura e umidade
// e faz um insert no banco de dados
function registrar_leitura(lumi){

    console.log('\nIniciando inclusão de novo registro...');

    console.log(`luminosidade: ${lumi}`);

    banco.conectar().then(() => {

        return banco.sql.query(`
        INSERT into Eventos (GrauLum, DataEvento,fkSensor)
        values (${lumi}, CONVERT(Datetime, '${agora()}', 120),2);`)
        .then(() => {
            console.log('Registro inserido com sucesso!');
        });
        

    }).catch(erro => {

        console.error(`Erro ao tentar registrar aquisição na base: ${erro}`);

    }).finally(() => {
        banco.sql.close();
    });

}

// função que retorna data e hora atual no formato aaaa-mm-dd HH:mm:ss
function agora() {
	const momento_atual = new Date();
	var retorno = `${momento_atual.toLocaleDateString()} ${momento_atual.toLocaleTimeString()}`;
	console.log(`Data e hora atuais: ${retorno}`);
	return retorno;
}

if (gerar_dados_aleatorios) {
	// dados aleatórios
	setInterval(function() {
        console.log('Gerando valores aleatórios!');

        registrar_leitura(Math.random()*1023);
        
	}, intervalo_geracao_aleatoria_segundos * 1000);
} else {
	// iniciando a "escuta" de dispositivos Arduino.
	console.log('Iniciando obtenção de valores do Arduino!');
	iniciar_escuta();
}

/*
 abrir a pasta deste arquivo via git bash e executar:
 npm i
 npm start
 talvez mostre uma mensagem de erro de placa arduino 
 mas depois vai começar a registrar os dados
*/

