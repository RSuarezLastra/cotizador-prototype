function Seguro(marca, año, tipo) {
    this.marca = marca
    this.año = año
    this.tipo = tipo
}

function UI() { }

UI.prototype.llenarSelect = () => {
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

const ui = new UI();

document.addEventListener('DOMContentLoaded', function(){
    ui.llenarSelect()
})