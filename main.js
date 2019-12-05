/// Forms
let formStep1 = document.querySelector('#formStep1');
// Inputs
let inputQtdAtendentes = document.querySelector('#inputQtdAtendentes');
let inputTempo = document.querySelector('#inputTempo');
let inputQtdInicial = document.querySelector('#inputQtdInicial');
// Selects
let comboCompartimentoSelecionado = document.querySelector('#comboCompartimentoSelecionado');
// Buttons
let btnSalvar = document.querySelector('#btnSalvar');
let btnSimular = document.querySelector('#btnSimular');
// Utils
let configuracoes = document.querySelector('#configuracoes');
let componentConfigCompartimento = document.querySelector('[config-compartimento]');
let alerts = document.querySelector('[alerts]');
let personagem = document.querySelector('[personagem]');
let caixa = document.querySelector('[caixa]');



let listAlerts = [];
let timeouts = [];
let qtdCompartimentos;
let storage = [];
let colors = ['#ffb74d','#ff9800','#f57c00','#e65100','#bf360c','#ff7043','#ffab91','#fbe9e7'];


let qtdPessoas = 1;
let actualF1;
let actualF2;
let scene = document.querySelector('#scene');
let timer;
let timer1 = [];
let timer2 = [];
let timerShow = [];
let velocidade = document.querySelector('#velocidade');

let deslocamentoMax = [];
let x1 = [];
let img1 = [];
let continuar = [];


/**
 * Cria a lista de compartimentos para o combo
 */
function iniciarSimulacao() {
    for (let index = 0; index < timerShow.length; index++) {
        clearTimeout(timerShow[index]);
    }
    for (let index = 0; index < timer1.length; index++) {
        clearInterval(timer1[index]);
    }
    showElement(scene);
    //Qtd de clientes
    qtdPessoas = getRandomArbitrary(4, 30);
    qtdPessoas = ((qtdPessoas).toFixed(0))*1;
    //Objeto clientes
    let persons = ``;

    caixa.innerHTML = `<div class="com-op" id="caixa1">`;
    for (let i = 0; i < qtdPessoas; i++) {
        persons += `<div class="person" id="person${i}"></div>`
    }
    personagem.innerHTML = persons;
    actualF1 = 0;


    deslocamentoMax = new Array(qtdPessoas).fill(1034);
    x1 = new Array(qtdPessoas).fill(52);
    img1 = new Array(qtdPessoas).fill(2);
    continuar = new Array(qtdPessoas).fill(true);

    // movePerson(1);
    move(-1, true);
    // testSleep();

    // if ((qtdAtendentes.toFixed(0))*1 === 1) {
    //     caixa.innerHTML = `<div class="com-op" id="caixa1"></div><div class="sem-op" id="caixa2"></div>`;

    //     for (let i = 0; i < ((qtdPessoas).toFixed(0))*1; i++) {
    //         persons += `<div class="person" id="person${i}"></div>`
    //     }
    //     personagem.innerHTML = persons;
    //     actualF1 = 0;

    //     movePerson(1);
    // } else {
    //     caixa.innerHTML = `<div class="com-op" id="caixa1"></div><div class="com-op" id="caixa2"></div>`;
    //     let total = ((qtdPessoas/2).toFixed(0))*1;
    //     for (let i = 0; i < total; i++) {
    //         persons += `<div class="person" id="person${i}"></div>`
    //     }

    //     for (let i = total + 1; i < ((qtdPessoas).toFixed(0))*1; i++) {
    //         persons += `<div class="person c2" id="person${i}"></div>`
    //     }

    //     personagem.innerHTML = persons;
    //     actualF1 = 0;
    //     actualF2 = (total + 1)*1;

    //     movePerson(2);
    // }

}

async function move(index, first) {
    if (!first) { await sleep(getRandomArbitrary(0, 1000)); }

    if (index < (qtdPessoas - 1)) {
        index++;
        move(index, false);
    }

    // if (timer1.length <= index) {
        showElement(document.querySelector(`#person${index}`));
        while (continuar[index]) {
            // timer1.push(setInterval(() => {
                if (index === 0 || (x1[index] + 50) <= x1[index - 1]) {
                    document.querySelector(`#person${index}`).style.transform = `translate(${x1[index]}px, 213px)`;
                    document.querySelector(`#person${index}`).style.backgroundImage = `url('assets/p${img1[index]}.png')`;
                    document.querySelector(`#person${index}`).style.backgroundSize = img1[index] != 1 ? '50px 110px' : '37px 110px';
                    img1[index]++;
                    if (img1[index] > 3) {
                        img1[index] = 2;
                    }
                    if (x1[index] >= deslocamentoMax[index]) {
                        document.querySelector(`#person${index}`).style.backgroundImage = `url('assets/p1.png')`;
                        document.querySelector(`#person${index}`).style.backgroundSize = '37px 110px';
                        await sleep(getRandomArbitrary(0, 1000));
                        x1[index] += 50;
                        showElement(document.querySelector(`#person${index}`), true);
                        continuar[index] = false;
                        clearInterval(timer1);
                    } else {
                        x1[index]++;
                    }   
                }
            // }, Number(velocidade.value)));
            
            await sleep(velocidade.value);
        }
    // }
    
}


/**
 * Usando o css display esta função mostra ou não um elemento
 * @param el - Elemento HTML 
 */
function showElement(el, hide) {
    if (hide && el != null) {
        el.style.display = "none";
    } else if (el != null ){
        el.style.display = "block";
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}

/**
 * Salva as configurações feitas para o compartimento selecionado
 */
function saveConfigs() {
    let indexAtual = Number(comboCompartimentoSelecionado.value);
    let qtd = 0;
    let saidas = [];
    for (let i = 0; i <= qtdCompartimentos; i++) {
        qtd = indexAtual === 0 && i > 0 ? Number(document.querySelector(`#inputQtdInicial${i}`).value) : Number(inputQtdInicial.value);
        let check = document.querySelector(`#check${i}`);
        let item = document.querySelector(`#taxa${i}`);
        if (i !== indexAtual && check && check.checked && Number(item.value)) {
            saidas.push({
                compartimento: i,
                taxa: -Number(item.value),
                qtdInicial: qtd
            });
            if (!storage[i]) {
                storage[i] = {
                    compartimento: i,
                    qtdInicial: 0,
                    saidas: [],
                    entradas: [{
                        compartimento: indexAtual,
                        taxa: Number(item.value),
                        qtdInicial: qtd
                    }]
                };
            } else {
                storage[i].entradas.push({
                    compartimento: indexAtual,
                    taxa: Number(item.value),
                    qtdInicial: qtd
                });
            }
        }
    }

    if (saidas.length > 0) {
        if (!storage[indexAtual]) {
            storage[indexAtual] = {
                compartimento: indexAtual,
                qtdInicial: qtd,
                saidas: saidas,
                entradas: []
            }
        } else {
            storage[indexAtual].saidas = [...storage[indexAtual].saidas, ...saidas];
            qtd > storage[indexAtual].qtdInicial ? storage[indexAtual].qtdInicial = qtd : storage[indexAtual].qtdInicial = storage[indexAtual].qtdInicial;
        }
        btnSimular.disabled = false;
        showAlert("Dados salvos com sucesso!", 'success');
    } else if (inputQtdInicial.value > 0) {
        storage[indexAtual].qtdInicial = inputQtdInicial.value;
    } else {
        showAlert("Selecione ao menos 1 Compartimento de Transferência ou Altere a Quantidade");
    }
}

/**
 * Muda de step e desenha os comprtimentos com as quantidades iniciais
 */
function continuarSimulacao() {
    $('.carousel').carousel('next');
    let comp = document.querySelector('[compartimentos]');
    let drawAll = ``;
    for (let i = 1; i <= qtdCompartimentos; i++) {
        let atual = storage[i];
        if (atual) {
            let left = `left: ${(atual.compartimento - 1)*250}px`;
            let leftArrow = `left: ${((atual.compartimento - 1)*250)+165}px`;
            const arrow = atual.compartimento < (storage.length - 1) ? `<div class="seta" style="${leftArrow}"><span></span></div>` : ``;
            drawAll += `
            <div style="${left}" id="back-compart${atual.compartimento}" class="compartimento compartimento-background" data-toggle="tooltip" data-placement="top" title="100.00%" delay="0"></div>
            <div style="${left}; background-color: ${colors[(i-1) % colors.length]}" id="compart${atual.compartimento}" class="compartimento" data-toggle="tooltip" data-placement="top" title="100.00%" delay="0"></div>
            ${arrow}
            <span class="title-comp" style="${left}">Compartimento ${atual.compartimento}</span>
            <span id="compValue${i}" class="title-comp" style="${left}; bottom: 0px;">[${atual.qtdInicial}]</span>`
        }
    }
    comp.innerHTML = drawAll;
    setTimeout(() => {
        simularTransferencias();
    }, 1000);
}

function simularTransferencias() {
    time = isNaN(Number(inputTempo.value)) ? 0 : Number(inputTempo.value);
    let calculo = rungeKuttaOrdemQuatro(time, storage);
    console.log(calculo);

    var maxCallback2 = (max, cur) => Math.max(max, cur);
    maiorQtd = storage.map(el => el.qtdInicial).reduce(maxCallback2, -Infinity);

    for (let i = 1; i <= qtdCompartimentos; i++) {
        let label = document.querySelector(`#compValue${i}`);
        let compart = document.querySelector(`#compart${i}`);
        compart.style.height = `${(calculo[i]/maiorQtd)*200}px`;
        compart.title = `${calculo[i].toFixed(4)} - (${((calculo[i]/maiorQtd)*100).toFixed(4)}%)`;
        label.innerHTML = `[${calculo[i].toFixed(4)}]`;
    }
}

// ################################ Alert Component ################################

/**
 * Alert
 * @param message 
 * @param type 
 */
function showAlert(message, type = 'warning') {
    let alert = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert" id="alert${listAlerts.length + 1}">
        <strong>${message}</strong>
        <button type="button" class="close" aria-label="Close" onclick="closeAlert(${listAlerts.length + 1})">
        <span aria-hidden="true">&times;</span>
        </button>
    </div>
    `;
    listAlerts.push(alert);
    drawAlerts();
    timeouts.push(setTimeout(() => {
        listAlerts.shift();
        drawAlerts();
    }, 3000));
}

/**
 * Desenha alerts da fila
 */
function drawAlerts() {
    let temp = ``;
    for (const item of listAlerts) {
        temp += item;
    }
    alerts.innerHTML = temp;
}

/**
 * Remove alert
 * @param indexAlert 
 */
function closeAlert(indexAlert) {
    for (let index = 0; index < listAlerts.length; index++) {
        if (listAlerts[index].indexOf(`alert${indexAlert}`) > -1) {
            listAlerts.splice(index, 1);
            clearTimeout(timeouts[index]);
            break;
        }
    }
    drawAlerts();
}


//############# Funçoes para calculo do Sistema de EDO's ainda em desenvolvimento ##################

function rungeKuttaOrdemQuatro(tFinal, compartimentos) {
    const h = 0.001;
    let k = new Array(compartimentos.length).fill(0).map(() => new Array(4)); // Cria matriz  // O quatro é porque é rungeKuta4
    let cn = compartimentos.map(value => {
        return value.qtdInicial;
    }); // Vetor de quantidades iniciais dos compartimentos
    let cnAuxiliar = [...cn]; // Cópia do vetor de quantidades para auxiliar os calculos 

    for (let tn = 0; tn < tFinal; tn = tn + h) {
        // Calcula todos os k's
        for (let i = 0; i < k.length; i++) {
            k[i][0] = funcaoGeneralizada(compartimentos[i], cn);
            for (let j = 0; j < k.length; j++) {
                cnAuxiliar[j] = cn[j] + (h / 2 * k[i][0]);
            }
            k[i][1] = funcaoGeneralizada(compartimentos[i], cnAuxiliar);
            k[i][2] = funcaoGeneralizada(compartimentos[i], cnAuxiliar);
            for (let j = 0; j < k.length; j++) {
                cnAuxiliar[j] = cn[j] + (h * k[i][0]);
            }
            k[i][3] = funcaoGeneralizada(compartimentos[i], cnAuxiliar);
        }
        // Atualiza a quantidade "cn"
        for (let i = 0; i < k.length; i++) {
            cn[i] = cn[i] + (h / 6 * (k[i][0] + 2 * (k[i][1] + k[i][2]) + k[i][3]));
        }
    }
    return cn;
}

function funcaoGeneralizada(compartimento, c) {
    let calc = 0;
    compartimento.entradas.forEach((entrada, i) => {
        calc += entrada.taxa * c[entrada.compartimento];
    });
    compartimento.saidas.forEach((saida, i) => {
        calc += saida.taxa * c[compartimento.compartimento];
    });
    return calc;
}
