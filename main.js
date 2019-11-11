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
let timer1;
let timer2;
let velocidade = document.querySelector('#velocidade');


/**
 * Cria a lista de compartimentos para o combo
 */
function iniciarSimulacao() {
    clearInterval(timer1);
    clearInterval(timer2);
    showElement(scene);
    qtdPessoas = getRandomArbitrary(4, 30);
    let qtdAtendentes = getRandomArbitrary(1.5, 2);
    let tempoAtendimento = getRandomArbitrary(1, 10);
    let persons = ``;

    if ((qtdAtendentes.toFixed(0))*1 === 1) {
        caixa.innerHTML = `<div class="com-op" id="caixa1"></div><div class="sem-op" id="caixa2"></div>`;

        for (let i = 0; i < ((qtdPessoas).toFixed(0))*1; i++) {
            persons += `<div class="person" id="person${i}"></div>`
        }
        personagem.innerHTML = persons;
        actualF1 = 0;

        movePerson(1);
    } else {
        caixa.innerHTML = `<div class="com-op" id="caixa1"></div><div class="com-op" id="caixa2"></div>`;
        let total = ((qtdPessoas/2).toFixed(0))*1;
        for (let i = 0; i < total; i++) {
            persons += `<div class="person" id="person${i}"></div>`
        }

        for (let i = total + 1; i < ((qtdPessoas).toFixed(0))*1; i++) {
            persons += `<div class="person c2" id="person${i}"></div>`
        }

        personagem.innerHTML = persons;
        actualF1 = 0;
        actualF2 = (total + 1)*1;

        movePerson(2);
    }

}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}


function movePerson(param) {
    if (param === 1 && actualF1 < ((qtdPessoas/2).toFixed(0))*1) {
        showElement(document.querySelector(`#person${actualF1}`));
        showElement(document.querySelector(`#person${actualF2}`));

        let deslocamentoP1 = 850;
        let x1 = 52;
        let img1 = 2;
        timer1 = setInterval(() => {
            document.querySelector(`#person${actualF1}`).style.transform = `translate(${x1}px, 62px)`;
            document.querySelector(`#person${actualF1}`).style.backgroundImage = `url('assets/p${img1}.png')`;
            document.querySelector(`#person${actualF1}`).style.backgroundSize = img1 != 1 ? '50px 110px' : '37px 110px';
            img1++;
            if (img1 > 3) {
                img1 = 2;
            }
            if (x1 === deslocamentoP1) {
                document.querySelector(`#person${actualF1}`).style.backgroundImage = `url('assets/p1.png')`;
                document.querySelector(`#person${actualF1}`).style.backgroundSize = '37px 110px';
                clearInterval(timer1);
                actualF1++;
                movePerson(param);
            }
            x1++;
        }, Number(velocidade.value));
    } else if (actualF1 < ((qtdPessoas/2).toFixed(0))*1 && actualF2 < ((qtdPessoas).toFixed(0))*1) {
        showElement(document.querySelector(`#person${actualF1}`));
        showElement(document.querySelector(`#person${actualF2}`));

        let deslocamentoP1 = 850;
        let x1 = 52;
        let img1 = 2;
        timer1 = setInterval(() => {
            document.querySelector(`#person${actualF1}`).style.transform = `translate(${x1}px, 62px)`;
            document.querySelector(`#person${actualF1}`).style.backgroundImage = `url('assets/p${img1}.png')`;
            document.querySelector(`#person${actualF1}`).style.backgroundSize = img1 != 1 ? '50px 110px' : '37px 110px';
            img1++;
            if (img1 > 3) {
                img1 = 2;
            }
            if (x1 === deslocamentoP1) {
                document.querySelector(`#person${actualF1}`).style.backgroundImage = `url('assets/p1.png')`;
                document.querySelector(`#person${actualF1}`).style.backgroundSize = '37px 110px';
                clearInterval(timer1);
                actualF1++;
                movePerson(param);
            }
            x1++;
        }, Number(velocidade.value));

        let deslocamentoP2 = 850;
        let x2 = 52;
        let img2 = 2;
        timer2 = setInterval(() => {
            document.querySelector(`#person${actualF2}`).style.transform = `translate(${x2}px, 200px)`;
            document.querySelector(`#person${actualF2}`).style.backgroundImage = `url('assets/p${img2}.png')`;
            document.querySelector(`#person${actualF2}`).style.backgroundSize = img2 != 1 ? '50px 110px' : '37px 110px';
            img2++;
            if (img2 > 3) {
                img2 = 2;
            }
            x2++;
            if (x2 === deslocamentoP2) {
                document.querySelector(`#person${actualF2}`).style.backgroundImage = `url('assets/p1.png')`;
                document.querySelector(`#person${actualF2}`).style.backgroundSize = '37px 110px';
                clearInterval(timer2);
                actualF2++;
                movePerson(param);
            }
        }, Number(velocidade.value));
    }
}


/**
 * Usando o css display esta função mostra ou não um elemento
 * @param el - Elemento HTML 
 */
function showElement(el) {
    el.style.display = "block";
}

/**
 * Observa qualquer alteração feita no combo dos compartimentos para preencher os formularios que ja foram salvos
 */
function changeCompartimento() {
    // Rendereriza opções para o compartimento selecionado
    componentConfigCompartimento.innerHTML = configSelect(Number(comboCompartimentoSelecionado.value));
    // Preenche os campos que ja foram salvos
    inputQtdInicial.value = 0;
    if (comboCompartimentoSelecionado.value !== "") {
        btnSalvar.disabled = false;
        configuracoes.style.display = "block";
        let atual = storage[comboCompartimentoSelecionado.value];
        if (atual) {
            inputQtdInicial.value = atual.qtdInicial < 0 ? (atual.qtdInicial * -1) : atual.qtdInicial;
            for (let i = 0; i <= qtdCompartimentos; i++) {
                if (i !== Number(comboCompartimentoSelecionado.value)) {
                    let check = document.querySelector(`#check${i}`);
                    let taxa = document.querySelector(`#taxa${i}`);
                    // let item = document.querySelector(`#form${i}`);
                    for (let j = 0; j < atual.saidas.length; j++) {
                        if (atual.saidas[j].compartimento === i && check && taxa) {
                            check.checked = true;
                            taxa.value = atual.saidas[j].taxa;
                            // item.style.display = "flex";
                        }
                    }
                }
            }
        }
        if (Number(comboCompartimentoSelecionado.value) === 0) {
            formQtdInicial.style.display = "none";
        } else {
            formQtdInicial.style.display = "flex";
        }
    } else {
        btnSalvar.disabled = true;
        configuracoes.style.display = "none";
    }
}

/**
 * Renderiza os compartimentos possiveis, onde o compartimento selecionado possa realizar tranferencias
 * @param atual - Compartimento atual 
 */
function configSelect(atual) {
    let result = ``;
    for (let i = 0; i <= qtdCompartimentos; i++) {
        if (i !== atual) {
            qtdIndividual = ``;
            if (atual === 0) {
                qtdIndividual += `
                <div class="input-group row">
                    <label for="inputQtdInicial${i}" class="col-sm-3 col-form-label"> Quantidade Inicial </label>
                    <div class="input-group-prepend">
                        <div class="input-group-text"> # </div>
                    </div>
                    <input type="number" class="form-control" id="inputQtdInicial${i}" placeholder="Quantidade">
                </div>`
            }
            result += `
            <div class="input-group row">
                <div class="col-sm-3"></div>
                <div class="col-sm-10">
                    <div class="custom-control custom-checkbox mr-sm-2" for="check${i}">
                        <input class="custom-control-input" type="checkbox" id="check${i}" style="cursor: pointer" onchange="return showElement(form${i})">
                        <label class="custom-control-label" style="cursor: pointer" for="check${i}">
                            ${i !== 0 ? `Transf. Compartimento ${i}` : `Transf. Meio Externo`}
                        </label>
                    </div>
                </div>
            </div>
            <div id="form${i}" style="display: none">
                ${qtdIndividual}
                <div class="input-group row">
                    <label class="col-sm-3 col-form-label"> Taxa Transferência</label>
                    <div class="input-group-prepend">
                        <div class="input-group-text"> % </div>
                    </div>
                    <input type="number" class="form-control" id="taxa${i}" placeholder="Taxa">
                </div>
            </div>`;
        }
    }
    return result;
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
