function gastos_lamp() {
    var calcConsumo = Number(tipoLampada.value) / 1000 * Number(txtQtLampadas.value) * Number(txtQtHoras.value) * Number(txtQtdias.value);
    var gasto_mes = calcConsumo * 0.25971;
    var gasto_ano = gasto_mes * 12;
    const indexOpt = tipoLampada.selectedIndex
    const objSel = document.forms["frmSimulador"].elements["tipoLampada"];

    tipoLamp.innerHTML = `${objSel.options[indexOpt].innerText}`;

    consumo.innerHTML = `${calcConsumo.toFixed(2)} (kWh/mês)`;
    gastoMes.innerHTML = `R$ ${gasto_mes.toFixed(2)}`;
    gastoAno.innerHTML = `R$ ${gasto_ano.toFixed(2)}`;

    let element = document.getElementById("gastosLampada");
    element.classList.add("divResult");
    grpEconomia.style.display = "block";
}

function calcEconomia() {
    var calcConsumo = Number(tipoLampada.value) / 1000 * Number(txtQtLampadas.value) * Number(txtQtHoras.value) * Number(txtQtdias.value);
    var gasto_mes = calcConsumo * 0.25971;
    var gasto_ano = gasto_mes * 12;
    const ecoCalc = Number(tipoLampada.value) / 1000 * Number(txtQtLampadas.value) * Number(txtNovasHoras.value) * Number(txtQtdias.value);
    const ecoGastoMes = ecoCalc * 0.25971;
    const ecoGastoAno = ecoGastoMes * 12;

    custo.innerHTML = `${ecoCalc.toFixed(2)} (kWh/mês)`;
    custoMes.innerHTML = `R$ ${ecoGastoMes.toFixed(2)}`;
    custoAno.innerHTML = `R$ ${ecoGastoAno.toFixed(2)}`;

    let diferenca = gasto_ano - ecoGastoAno;
    valorEco.innerHTML = `R$ ${diferenca.toFixed(2)} 
    ( ${((diferenca * 100) / gasto_ano).toFixed(0)} % )`;

    let element = document.getElementById("economia");
    element.classList.add("divResult");
}