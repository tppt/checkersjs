window.onload = function checkers () {
  //board is 8x8
  //each player (red, white) has 12 pieces
  //darker (red) goes first
  //
  //move rules:
  //simple move - uncrowned move one space diagonally forward
  //kinged move one space diagonally any direction
  //jump - jump diagonally over adjacent opponent piece.  opponent piece
  //is captured and removed.  uncrowned can only jump forward, king any dir
  //multiple jumps possible.  jumping is mandatory
  //
  //an uncrowned piece that moves into the opponents kings row is
  //crowned (kinged).  if the piece arrived in the kings row by way of a jump
  //the jump sequence does not continue back out.

  //win conditions
  //- capture all opponents pieces
  //- leave opponenet with no legal move

  //draw condition
  //- neither player can make a legal move

  var boardSize = 400,
      playerColor = { red: 0, white: 1},
      spaceSize = 50,
      myBoard
  ;

  (function loadGame () {
    myBoard = new board();
    loadBoard();
  }());

  function board () {
    var maxSquares = 32;
    var totalSquares = 0;
    var squares = [];

    return {
      addSquare: function (square) {
        if (totalSquares < maxSquares) {
          squares.push(square);
          totalSquares++;
        }
      },
      getSquare: function (index) {
        return squares[index];
      },
      getSquares: function () {
        return squares;
      }
    };
  };

  function loadBoard () {
    var checkerboard = document.getElementById('checkerboard');
    var cbContext = checkerboard.getContext('2d');
    var spaceNum = 1,
        col,
        row,
        x,
        y
    ;

    //Draw board and add usable squares to the board when applicable.
    for (row = 0; row < 8; row++) {
      for (col = 0; col < 8; col++) {

        x = col * spaceSize;
        y = row * spaceSize;

        if ((row % 2) == (col % 2)) {
          cbContext.fillStyle = '#FFFFCC';
        }
        else {

          (function (spaceNum, x, y) {
            myBoard.addSquare(new square(spaceNum, x, y));
          }(spaceNum, x, y));

          spaceNum++;

          cbContext.fillStyle = '#336600';
        }

        cbContext.fillRect(x, y, spaceSize, spaceSize);
      }
    }

    //Add red pieces to the board.
    for (i = 0; i < 12; i++) {
      (function (i) {
        var image = new Image(),
            thisSquare = myBoard.getSquare(i)
        ;

        thisSquare.addPiece(new piece(playerColor.red));

        //Add piece images to canvas
        image.src = 'imgs/Draughts_mdt45.svg';
        image.onload = function () {
          cbContext.drawImage(
            image,
            thisSquare.getXPos(),
            thisSquare.getYPos(),
            44,
            44);
        };
      }(i));
    }

    //Add white pieces to the board.
    for (i = 20; i < 32; i++) {
      (function (i) {
        var image = new Image(),
            thisSquare = myBoard.getSquare(i)
        ;

        thisSquare.addPiece(new piece(playerColor.white));

        //Add piece images to canvas
        image.src = 'imgs/Draughts_mlt45.svg';
        image.onload = function () {
          cbContext.drawImage(
            image,
            thisSquare.getXPos(),
            thisSquare.getYPos(),
            44,
            44);
          };
      }(i));
    }
  };

  function piece (color) {
    var color = color,
        isKing = false
    ;

    return {
      getColor: function () {
        return color;
      },
      isKing: function () {
        return isKing;
      },
      kingMe: function () {
        isKing = true;
      }
    }
  };

  function player (color) {

  };

/*
  function piece (color) {
    var color = color,
        isKing = false
    ;

    return {
      canMoveTo: function (fromSquare, toSquare) {

        var direction = toSpace.getNumber() - fromSpace.getNumber();
        var distance = Math.abs(direction);

        //simple move
        if (distance >= 3 && distance <= 5) {

          if (isKing) {
            return true;
          }

          if (color == playerColor.red) {
            if (direction > 0) {
              return true;
            }
            return false;
          }

          if (color == playerColor.white) {
            if (direction < 0) {
              return true;
            }
            return false;
          }
        }
      },
      getColor: function () {
        return color;
      },
      isKing: function () {
        return isKing;
      },
      kingMe: function () {
        isKing = true;
      }
    };
  };

  function player(color) {
    var color = color;
    return {
      getColor: function () {
        return color;
      },
      movePiece: function (piece, newSpaceNum) {
        if (piece.color == this.color) {
          if (this.color == playerColor.red) {
            //singleMove
            if ()
          }
          else {

          }
        }
      }
    };
  }
  */
  function square (number, xpos, ypos) {
    var number = number;
    var xpos = xpos;
    var ypos = ypos;
    var piece = null;

    return {
      addPiece: function (piece) {
        if (this.piece == null) {
          this.piece = piece;
        }
      },
      getNumber: function () {
        return number;
      },
      getPiece: function () {
        return piece;
      },
      getXPos: function () {
        return xpos;
      },
      getYPos: function () {
        return ypos;
      },
      removePiece: function () {
        piece = null;
      }
    };
  };
};
