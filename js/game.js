function Game(options){
  this.rows = options.rows;
  this.columns = options.columns;
  this.snake = options.snake;
  this.food = {
    row: Math.floor(Math.random() * this.rows),
    column: Math.floor(Math.random() * this.columns)
  };


  for (var rowIndex = 0; rowIndex < options.rows; rowIndex++){
    for (var columnIndex = 0; columnIndex < options.columns; columnIndex++){
      $('.container').append($('<div>')
        .addClass('cell board')
        .attr('data-row', rowIndex)
        .attr('data-col', columnIndex)
      );
    }
  }

}

//
Game.prototype.drawSnake = function() {
  this.snake.body.forEach( function(position, index) {
    var selector = '[data-row=' + position.row + '][data-col=' + position.column + ']';
    $(selector).addClass('snake');
  });
};

Game.prototype.start = function(){
  this.assignControlsToKeys();
  this.generateFood();
  this.drawFood();

  this.intervalID = setInterval(this.update.bind(this), 100);
};

Game.prototype.update = function(){

  this.snake.moveForward(this.rows, this.columns);
  if(this.snake.hasEatenFood(this.food)){
    this.snake.grow();
    this.clearFood();
    this.generateFood();
    this.drawFood();
  }
  if(this.snake.hasEatenItself()){
    this.stop();
    alert("Game Over!");
  }
  this.clearSnake();
  this.drawSnake();
};

//Borramos todas las clases SNAKE para volver a pintarlas de nuevo con las nuevas posiciones que nos dé la función Update
Game.prototype.clearSnake = function() {
  $('.snake').removeClass('snake');
};

// Asignamos los controles a cada uno de los botones del teclado

Game.prototype.assignControlsToKeys = function(){
  $('body').on('keydown', function(e) {
    switch (e.keyCode) {
      case 87: // arrow up
        this.snake.goUp();
        break;
      case 83: // arrow down
        this.snake.goDown();
        break;
      case 65: // arrow left
        this.snake.goLeft();
        break;
      case 68: // arrow right
        this.snake.goRight();
        break;
      case 80:
       if (this.intervalID) {
         this.stop();
       } else {
         this.start();
       }
       break;
    }
  }.bind(this));
};

// Generar y dibujar la comida

Game.prototype.generateFood = function(){
  while(this.snake.hasEatenFood(this.food)){
    this.food = {
      row: Math.floor(Math.random() * this.rows),
      column: Math.floor(Math.random() * this.columns)
    };
  }
};

Game.prototype.drawFood = function() {
    var selector = '[data-row=' + this.food.row + '][data-col=' + this.food.column + ']';
    $(selector).addClass('food');
};


Game.prototype.clearFood = function(){
  $(".food").removeClass('food');
};

Game.prototype.stop = function (){
  if(this.intervalID){
    clearInterval(this.intervalID);
    this.intervalID = undefined;
  }
};

var game = new Game({
  rows: 50,
  columns: 50,
  snake: new Snake()
});

game.start();
