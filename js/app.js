function Seguro(marca, year, tipo) {
    this.marca = marca
    this.year = year
    this.tipo = tipo
}

//prototype para hacer la cotizacion
Seguro.prototype.cotizarSeguro = function () {
    let cantidad;
    const base = 2000

    switch (this.marca) {

        case '1':
            cantidad = base * 1.15
            break;
        case '2':
            cantidad = base * 1.05
            break;
        case '3':
            cantidad = base * 1.30
            break;

        default:
            break;
    }
    // leer el año
    const diferencia = new Date().getFullYear() - this.year;
    // cada año que la diferencia es mayor el costo se reduce un 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100

    if (this.tipo === 'basico') {
        cantidad *= 1.30
    } else {
        cantidad *= 1.50
    }

    return cantidad;
}

function UI() { }

UI.prototype.llenarSelect = function () {
    const max = new Date().getFullYear()
    const min = max - 20

    const select_year = document.querySelector('#year');
    for (let i = max; i > min; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        select_year.appendChild(option)
    }
}

UI.prototype.mostrarAlerta = function (mensaje, tipo) {

    const alerta = document.createElement('DIV');
    if (tipo === 'error') {
        alerta.classList.add('error')
    } else {
        alerta.classList.add('correcto')
    }
    alerta.classList.add('mensaje', 'mt-10')
    alerta.textContent = mensaje;

    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(alerta, document.querySelector('#resultado'))

    setTimeout(() => {
        alerta.remove()
    }, 3000);
}

const ui = new UI();

document.addEventListener('DOMContentLoaded', function () {
    ui.llenarSelect()
})

eventListenners()
function eventListenners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro)
}

function cotizarSeguro(e) {
    e.preventDefault();

    //!leer la marca
    const marca = document.querySelector('#marca').value;

    //!leer el año
    const year = document.querySelector('#year').value;

    //!leer el tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if (marca === '' || year === '' || tipo === '') {
        ui.mostrarAlerta('Todos los campos deben ser completados', 'error')
        return;
    }
    ui.mostrarAlerta('Cotizando....', 'correcto')

    // instanciar seguro
    const seguro = new Seguro(marca, year, tipo)
    seguro.cotizarSeguro()
}