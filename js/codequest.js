(function() { 
  var blockSize = 30;
  var noBlockCoord = false;
  var noLoop = true;
  var objects = [];
  var canvas = null;
  var context = null;
  var blockDefaultColor = '#D92B41';
  var blockDefaultStrokeColor = 'black';
  var gridDefaultColumns = 10;
  var gridDefaultRows = 10;
  var gridDefaultColor = '#F0DA50';

  function valueTofillStyle(value, def) {
  	var ret;

    if (typeof value === 'string') {
    	ret = value;
    }
    else if (Object.prototype.toString.call(value) === '[object Array]') {
    	ret = `rgb(${value[0]}, ${value[1]}, ${value[2]})`;
    }
    else {
    	ret = def;
    }

    return ret;
  }

  function pixelsPerSecond(pixels) {
    return (1 / 60) * pixels;
  }

  function setBlockSize(value) {
    blockSize = value;
  }

  function SetNoGridCoord(value) {
  	noBlockCoord = value;
  }

  function setNoLoop(value) {
  	noLoop = value;
  }

  function Block(x, y, color) {
  	this.x = x;
    this.y = y;
    this.color = blockDefaultColor;
    if (color) {
      this.color = color;
    }

    this.updatePositions = function() {
      this.left = Math.round(this.x);
      this.top = Math.round(this.y);
      this.right = Math.round(this.left + blockSize - 1);      
      this.bottom = Math.round(this.top + blockSize - 1);
      this.gridX = Math.round(this.x / blockSize);
      this.gridY = Math.round(this.y / blockSize);
    }

    this.draw = function() {
      var x = this.x;
      var y = this.y;

      context.strokeStyle = blockDefaultStrokeColor;
      context.fillStyle = valueTofillStyle(this.color, this.color);

      if (!noBlockCoord) {
        x = x * blockSize;
        y = y * blockSize;
      }

      x = Math.trunc(x);
      y = Math.trunc(y);

      context.fillRect(x, y, blockSize, blockSize);
      context.strokeRect(x + .5, y + .5, blockSize - 1, blockSize - 1);
    }

    this.move = function(xSpeed, ySpeed) {
      x += pixelsPerSecond(xSpeed);
      y += pixelsPerSecond(ySpeed);
    }
	}

  function _Grid(width, height, color) {
    this.left = 0;
    this.top = 0;
    this.right = width - 1;
    this.bottom = height - 1;
    this.color = gridDefaultColor;
    this.width = width;
    this.height = height;

    if (color) {
      this.color = valueTofillStyle(color);
    }

    this.draw = function() {
      if (this.color) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
      }
    }

    this.clear = function() {
      context.clearRect(0, 0, this.width, this.height);
      context.fillStyle = this.color;
      context.fillRect(0, 0, this.width, this.height);
    }
  }

  function putBlock(x, y, color) {
  	var block = new Block(x, y, color);
    block.updatePositions();
    block.draw();
    objects.push(block);
    return block;
  }

  function createGrid(cols, rows, color) {
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.width = cols * blockSize;
    canvas.height = rows * blockSize;
    canvas.style.position = 'absolute';

    context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    context.oImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;

    window.Grid = new _Grid(canvas.width, canvas.height, color);
  }

  function startUp() {    
    if (typeof Setup !== "function") {
      createGrid(gridDefaultColumns, gridDefaultRows);
    }
    else {
      Setup();
    }
    
    Grid.draw();

    function run() {     
      if (typeof PreRun === "function") {
        PreRun();
      }
      if (noLoop) {
        Run();
      }
      else {
        function animationFrame(){
          Grid.clear();
          Run();
          for (var i in objects) {
            objects[i].updatePositions();
            objects[i].draw();
          }
          window.requestAnimationFrame(animationFrame);
        }
        window.requestAnimationFrame(animationFrame);
      }
    }  
    
    run();
    
    // window.onkeydown = function(event) {
      // if (event.keyCode == 32) {
        // run();
      // }
    // }
	}  

  var exports = {
    StartUp: startUp,
    BlockSize: blockSize,
    SetBlockSize: setBlockSize,
    SetNoGridCoord: SetNoGridCoord,
    SetNoLoop: setNoLoop,
    CreateGrid: createGrid,
    PutBlock: putBlock,
    PixelsPerSecond: pixelsPerSecond
  }
  
  for (var i in exports) {
    window[i] = exports[i];
  }
  
  document.addEventListener("DOMContentLoaded", StartUp);
})();
