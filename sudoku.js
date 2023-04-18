class Cell {
  filled;
  possible;
  row;
  col;
  constructor(filled,row,col) {
    this.filled = filled;
    this.row = row;
    this.col = col;
    this.possible = [];
  }
}


class Table {
  cells;
  columnsCount;
  rowsCount;
  constructor() {
    this.columnsCount = 9;
    this.rowsCount = 9;
    this.init();
  }

  init() {
    this.cells = [];
    for (let r = 0; r < this.rowsCount; r++) {
      const row = [];
      for (let c = 0; c < this.columnsCount; c++) {
        row.push(new Cell(undefined, r, c));
      }
      this.cells.push(row);
    }
  }

  fill(numbers) {
    for (let r = 0; r < this.rowsCount; r++) {
      const row = [];
      for (let c = 0; c < this.columnsCount; c++) {
        this.set(r, c, numbers[r][c]);
      }
    }
  }

  get(row, col) {
    return this.cells[row][col] ?? new Cell();
  }

  set(row, col, num){
    const cell = this.get(row, col);
    cell.filled = num;
  }
}




function updatePossibles(table) {
  for (let r = 0; r < table.rowsCount; r++) {
    const row = [];
    for (let c = 0; c < table.columnsCount; c++) {
      const cell = table.get(r, c);
      cell.possible = cell.filled ? [] : [1,2,3,4,5,6,7,8,9];
    }
  }

  // removeNotPossibleForRows(table.cells);
  // removeNotPossibleForColumns(table.cells);

  const cells = table.cells;
  updatePossibleForGroup(getGroup(table, 0, 0, 2, 2));
  updatePossibleForGroup(getGroup(table, 0, 3, 2, 5));
  updatePossibleForGroup(getGroup(table, 0, 6, 2, 8));

  updatePossibleForGroup(getGroup(table, 3, 0, 5, 2));
  updatePossibleForGroup(getGroup(table, 3, 3, 5, 5));
  updatePossibleForGroup(getGroup(table, 3, 6, 5, 8));

  updatePossibleForGroup(getGroup(table, 6, 0, 8, 2));
  updatePossibleForGroup(getGroup(table, 6, 3, 8, 5));
  updatePossibleForGroup(getGroup(table, 6, 6, 8, 8));

  for(let i=0;i<9;i++){
    updatePossibleForGroup(getGroup(table, 0, i, 8, i)); //columns
    updatePossibleForGroup(getGroup(table, i, 0, i, 8)); // rows
  }


  table.cells.forEach(row=>row.forEach(cell=>console.log({r: cell.row, c: cell.col, filled: cell.filled, possible: cell.possible.join(',')})))
}

function removeNotPossibleForRows(cells){
  cells.forEach(row => {
    row.forEach(cell=>{
      if(cell.filled){
        row.filter(item=>!item.filled).forEach(c=>c.possible = c.possible?.filter(n=>n!=cell.filled));
      }
    });
  });
}


function updatePossibleForGroup(cells) {
  cells.filter(cell => cell.filled).forEach(filledCell => {
    cells.forEach(cell => cell.possible = cell.possible?.filter(n => n != filledCell.filled))
  });
}