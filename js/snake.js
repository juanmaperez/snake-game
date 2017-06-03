function Snake(){
  this.direction = "right";
  this.body = [
    {row: 1, column: 5 },
    {row: 1, column: 4 },
    {row: 1, column: 3 },
    {row: 1, column: 2 },
    {row: 1, column: 1 },
  ];
}


Snake.prototype.moveForward = function(maxRows, maxColumns){
  var head = this.body[0];
  switch(this.direction){
    //row: (head.row -1 + maxRows) % maxRows,
    // esta función la realizamos para que si la posición es cero cuando vamos hacia arriba
    // le sumamos el número máximo de columnas y le hacemos el módulo del max-rows. De esta forma
    // nuestra serpiente aparecera por la última row de la tabla.
    // quedaría así: (0-1 + 49) % 49 = 49
    case 'up':
      this.body.unshift({
        row: (head.row -1 + maxRows) % maxRows,
        column : head.column
      });
    break;

    case 'down':
      this.body.unshift({
        row: (head.row +1 ) % maxRows,
        column : head.column
      });
    break;

    case 'left':
      this.body.unshift({
        /**/
        row: head.row,
        column : (head.column -1 + maxColumns) % maxColumns,
      });
    break;

    case 'right':
      this.body.unshift({
        row: head.row,
        column : (head.column +1) % maxColumns,
      });
    break;
  }

  this.previousTail = this.body.pop();
};

// Limitamos los movimientos de la serpiete y le decimos que si la serpiente no va haciea la derecha
// no podemos decirle que vaya a la izquierda porque se chocaría con ella misma.

Snake.prototype.goLeft = function() {
  if (this.direction === 'up' || this.direction === 'down'){
    this.direction = 'left';
  }
};

Snake.prototype.goRight = function() {
  if (this.direction === 'up' || this.direction === 'down'){
    this.direction = 'right';
  }
};

Snake.prototype.goUp = function() {
  if (this.direction === 'left' || this.direction === 'right'){
    this.direction = 'up';
  }
};

Snake.prototype.goDown = function() {
  if (this.direction === 'left' || this.direction === 'right'){
    this.direction = 'down';
  }
};


// Esta función nos comprobará si la posición de la serpiente y la de la comida,
// coinciden en algún momento.

Snake.prototype.hasEatenFood = function(foodPosition){
  return this.body.some(function (element){
    return element.row === foodPosition.row && element.column === foodPosition.column;
  });
};


Snake.prototype.grow = function(){
  this.body.push(this.previousTail);
  this.previousTail = undefined;
};



Snake.prototype.hasEatenItself = function(){
  return this.body.some(function (element, index, array) {
    return (element.row === array[0].row && element.column === array[0].column && index != 0)
  });
};
