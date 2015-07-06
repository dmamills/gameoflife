(function() {
  
  var canvas = document.getElementById('life');
  var ctx = canvas.getContext('2d');
  
  //canvas context, width, height, size, time interval, live color, dead color
  function GameOfLife(ctx, w, h, s, t, lc, dc) {
     
     this.ctx = ctx;
     this.width = w;
     this.height = h;
     this.size = s;
     this.timer = t;
     this.liveColor = lc;
     this.deadColor = dc;
    
     this.init = function() {

        console.log('called init');

        //create board
        this.board = new Array(this.width / this.size);
        for(var i =0; i < this.board.length;i++) {
          this.board[i] = new Array(this.height / this.size);
        }
        
        //create a bunch of random cells?
        for(var i =0; i < this.board.length;i++) {
           for(var j = 0; j < this.board[i].length; j++) {
               var t = Math.ceil(Math.random() * 10);
               this.board[i][j] = (t > 5) ? 1 : 0;
           }
        }
     }
     
     this.update = function() {

        console.log('update called!');

        //init replacement board
        this.newBoard = new Array(this.width);
        for(var i=0; i < this.newBoard.length;i++) {
            this.newBoard[i] = new Array(this.height);
        }

        //loop through each square
        for(var x = 0; x < this.board.length; x++) {
            for(var y = 0; y < this.board[x].length; y++) {
                var neighbours = 0;

                //check for neighbours
                for(var dx = -1; dx < 2; dx++) {
                    for(var dy = -1; dy < 2; dy++) {
                        //ignore yo self
                        if(dx === 0 && dy === 0) continue;

                        //count neighbour if found
                        if(this.board[x+dx] !== undefined &&
                           this.board[x+dx][y+dy] !== undefined &&
                           this.board[x+dx][y+dy]) {

                            neighbours++;
                        }  
                    }
                }

                //update cell's status
                var cell = this.board[x][y];

                if(neighbours < 2) cell = 0;
                else if(neighbours === 2) {}
                else if(neighbours === 3) cell = 1;
                else cell = 0;

                this.newBoard[x][y] = cell;
            }
        }

        //replace board
        this.board = this.newBoard;
     }
     
     this.render = function() {
         //empty board
         this.ctx.fillStyle = '#FFFFFF';
         this.ctx.fillRect(0,0, this.width, this.height);
         
         //draw each cell
         for(var x =0; x < this.board.length;x++) {
           for(var y =0; y < this.board[x].length;y++) {
              this.ctx.fillStyle = (this.board[x][y]) ? this.liveColor : this.deadColor;
              this.ctx.fillRect(x*this.size, y*this.size, this.size, this.size);
           } 
         }
     }
    
     this.start = function() {
         var self = this;
         this.init();
         this.interval = setInterval(function() {
            self.update();
            self.render();
         }, this.timer);
     }

    this.reset = function() {
        clearInterval(this.interval);
        this.start();
    }

    return this;
  }
  
    var liveColor = '#c0392b';
    var deadColor = '#ecf0f1';

    var gol = new GameOfLife(ctx, 500, 500, 10, 10, liveColor, deadColor);
    gol.start();

    document.getElementById('reset').addEventListener('click', function() {
        gol.reset();
    });
  
}).call(this);

