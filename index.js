// the sudoku board
// looks like:
//
//  | 0,0 | 0,1 | 0,2 | 0,3 | 0,4 | 0,5 | 0,6 | 0,7 | 0,8 |
//  | 1,0 | 1,1 | 1,2 | 1,3 | 1,4 | 1,5 | 1,6 | 1,7 | 1,8 |
//  | 2,0 | 2,1 | 2,2 | 2,3 | 2,4 | 2,5 | 2,6 | 2,7 | 2,8 |
//  | 3,0 | 3,1 | 3,2 | 3,3 | 3,4 | 3,5 | 3,6 | 3,7 | 3,8 |
//  | 4,0 | 4,1 | 4,2 | 4,3 | 4,4 | 4,5 | 4,6 | 4,7 | 4,8 |
//  | 5,0 | 5,1 | 5,2 | 5,3 | 5,4 | 5,5 | 5,6 | 5,7 | 5,8 |
//  | 6,0 | 6,1 | 6,2 | 6,3 | 6,4 | 6,5 | 6,6 | 6,7 | 6,8 |
//  | 7,0 | 7,1 | 7,2 | 7,3 | 7,4 | 7,5 | 7,6 | 7,7 | 7,8 |
//  | 8,0 | 8,1 | 8,2 | 8,3 | 8,4 | 8,5 | 8,6 | 8,7 | 8,8 |
//
var Board = exports.Board = function(vals){

  this.cells = []
  for (var i=0; i<9; i++) this.cells[i] = []

  for(var i=0; i<81; i++){
    var x = Math.floor(i / 9)
    var y = i % 9
    this.cells[x][y] = new Cell(x, y, vals[i]==0 ? undefined : vals[i])
  }
}


// a simple struct for a cell
var Cell = function(x,y,val){
  this.x = x
  this.y = y
  this.val = val
}


// return the 3x3 box of a given cell
Board.prototype.box = function(cell){
  var box = []
  var box_x = Math.floor(cell.x / 3) * 3
  var box_y = Math.floor(cell.y / 3) * 3

  for (var x=0; x<3; x++){
    for (var y=0; y<3; y++){
      box.push(this.cells[box_x+x][box_y+y])
    }
  }
  return box
}


// return cells for the horizontal row (y) of a given cell
Board.prototype.row = function(cell){
  var row = []
  for (var x=0; x<9; x++) row.push(this.cells[x][cell.y])
  return row
}


// return cells for the vertical col (x) of a given cell
Board.prototype.col = function(cell){
  var col = []
  for (var y=0; y<9; y++) col.push(this.cells[cell.x][y])
  return col
}


// return a list of values this cell can't be
Board.prototype.blacklist = function(cell){
  var vals = {}
  function exclude(newcell){
    if (cell !== newcell && newcell.val) vals[newcell.val] = true
  }
  this.box(cell).forEach(exclude)
  this.row(cell).forEach(exclude)
  this.col(cell).forEach(exclude)
  return Object.keys(vals).map(function(num){
    return parseInt(num)
  })
}


// return a list of values this cell CAN be
Board.prototype.whitelist = function(cell){
  var vals = {}
  for (var i=1; i<10; i++) vals[i] = true
  this.blacklist(cell).forEach(function(val){
    delete vals[val]
  })
  return Object.keys(vals).map(function(num){
    return parseInt(num)
  })
}


// evaluate (attempt to solve) a cell
Board.prototype.evaluate = function(cell){
  if(!cell.val && this.whitelist(cell).length == 1) cell.val = this.whitelist(cell)[0]
}


// solve the board (solve each cell, looping while the board is still changing)
Board.prototype.solve = function(){
  var curstate
  do {
    curstate = this.state()
    for (var x=0; x<9; x++){
      for (var y=0; y<9; y++){
        this.evaluate(this.cells[x][y])
      }
    }
  } while ( curstate != this.state() )
  return this
}


// a string representation of the state of the board, could get rid of this by tracking changes in each loop
Board.prototype.state = function(){
  return this.cells.map(
    function(row){ return row.map(function(cell){
      return cell.val
    }) }
  ).join(',')
}


// pretty-print the board
Board.prototype.print = function(){
  this.cells.forEach(function(row){
    console.log(
      row.map( function(cell){
        return cell.val == undefined ? ' ' : parseInt(cell.val)
      }).join('  ')
    )
  })
}