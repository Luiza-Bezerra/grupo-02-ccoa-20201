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