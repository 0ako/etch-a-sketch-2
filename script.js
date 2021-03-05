const container = document.querySelector('.container')
const colorButtons = document.querySelectorAll('.color-choice');
let slider = document.querySelector('#sizeRange');
let color = 'black';

function createGrid (gridNumber) { // succesfully creates grid
    let gridArea = gridNumber * gridNumber;
    for (let i = 1; i <= gridArea; i++) {
        let gridItem = document.createElement('div');
        container.style.gridTemplateColumns = `repeat(${gridNumber}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${gridNumber}, 1fr)`;
        container.appendChild(gridItem); // ? insertAdjacentElement
    }
    let gridPixels = container.querySelectorAll('div');
    gridPixels.forEach(gridPixel => gridPixel.addEventListener('mouseover', colorGrid));
}

function colorGrid() { 
    switch (color) { // why 'color' makes the switch statement work? 
        case 'rainbow':
            this.style.backgroundColor = `hsl( ${Math.random() * 360 }, 100%, 50%)`;
            this.classList.remove('gray');
            break;
        case 'gray':
            // if the grid already has color, then slice opacity of alpha (opacity) 
            if (this.style.backgroundColor.match(/rgba/)) {
                let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
                if (currentOpacity <= 0.9) {
                    this.style.backgroundColor = `rgba(0,0,0,${currentOpacity + 0.1})`;
                    this.classList.add('gray');
                }
            // else if it's already black then return
            } else if (this.classList == 'gray' && this.style.backgroundColor == 'rgb(0,0,0)') {
                return;
            } else {
            // else make the color black with 10% opacity (effectively 10% black)
                this.style.backgroundColor = 'rgba(0,0,0,0.1)'; 
            }
            break;
        default: // ?
            this.style.backgroundColor = color; 
            this.classList.remove('gray');
            break;
    }
}

function changeColor(event) {
    switch (event.target.dataset.color) { // ? why this can get data-set attribute
        case 'rainbow':
            color = 'rainbow';
            break;
        case 'gray':
            color = 'gray';
            break;
    }
}

function pixelSize() {
    let gridPixels = container.querySelectorAll('div'); // select and turn all divs into an array
    gridPixels.forEach(gridPixel => gridPixel.remove()); // removes all gridPixel/div?
    createGrid(slider.value);
}

// On page load - default size
createGrid(10);

// Event Listeners
colorButtons.forEach(colorButton => colorButton.addEventListener('click', changeColor)); // ?
slider.addEventListener('mouseup', pixelSize);
