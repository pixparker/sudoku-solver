function renderTable(model) { //model is table

  console.log('Table', model);


  const table = document.getElementById('table');
  Array.from(table.children).forEach(c => c.remove());

  model.cells.forEach(row => {
    table.appendChild(createRow(row));
  });

  updateNumbers(model.cells);
}


function createRow(model) { //model is cell[]
  const div = document.createElement('div');
  div.classList='row';

  model.forEach(cell=> div.appendChild(createCell(cell)))
  
  return div;
}


function createCell(model) { //model is cell
  const div = document.createElement('div');
  div.classList = 'cell';
  div.id = getCellId(model.row, model.col);

  const number = document.createElement('div');
  number.classList = 'number';
  number.innerText = 'M'

  div.appendChild(number);

  return div;
}

function updateNumbers(model) {//model cell[][]
  model.forEach(row => {
    row.forEach(cell => {
      const id = getCellId(cell.row, cell.col);
      const elm = document.getElementById(id);
      const [number] = elm.getElementsByClassName('number');
      number.innerText = cell.filled === undefined? '': cell.filled;
      
    })
  })
}

function getCellId(row, col) {
  return `cell-${row}-${col}`
}