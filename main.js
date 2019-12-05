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

function next() {
    $('.carousel').carousel('next');
}

function previous() {
    $('.carousel').carousel('prev');
}

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

    deslocamentoMax = new Array(qtdPessoas).fill(1034);
    x1 = new Array(qtdPessoas).fill(52);
    img1 = new Array(qtdPessoas).fill(2);
    continuar = new Array(qtdPessoas).fill(true);

    move(-1, true);

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

    showElement(document.querySelector(`#person${index}`));
    while (continuar[index]) {
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
            } else {
                document.querySelector(`#person${index}`).style.backgroundImage = `url('assets/p1.png')`;
                document.querySelector(`#person${index}`).style.backgroundSize = '37px 110px';
            }
        await sleep(velocidade.value);
    }
}

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
