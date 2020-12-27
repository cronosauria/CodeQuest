(function() {
  var blockSize = 30;
  var noBlockCoord = false;
  var noLoop = true;
  var objects = [];  
  var canvas = null;
  var context = null;

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
    return Math.trunc((1 / 60) * pixels);
  }

  function setBlockSize(value) {
    blockSize = value;
  }

  function setNoBlockCoord(value) {
  	noBlockCoord = value;
  }

  function setNoLoop(value) {
  	noLoop = value;
  }

  function Block(x, y, color) {
  	this.x = x;
    this.y = y;
    this.color = 'red';
    if (color) {
      this.color = color;
    }

    this.updatePositions = function() {
      this.left = this.x;
      this.top = this.y;
      this.right = this.left + blockSize - 1;
      this.bottom = this.top + blockSize - 1;
    }

    this.draw = function() {
      var x = this.x;
      var y = this.y;
      
      context.strokeStyle = 'black';
      context.fillStyle = valueTofillStyle(this.color, 'red');

      if (!noBlockCoord) {
        x = x * blockSize;
        y = y * blockSize;
      }

      context.fillRect(x, y, blockSize, blockSize);
      context.strokeRect(x + .5, y + .5, blockSize - 1, blockSize - 1);
    }

    this.move = function(xSpeed, ySpeed) {
      x += pixelsPerSecond(xSpeed);
      y += pixelsPerSecond(ySpeed);
    }
	}

  function _Grid(width, height, color) {
    this.boundLeft = 0;
    this.boundTop = 0;
    this.boundRight = width - 1;
    this.boundBottom = height - 1;
    this.color = 'white';
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
      createGrid(20, 20, 'black');
    }
    else {
      Setup();
    }       
    
    Grid.draw();

		if (typeof PreRun === "function") {
      PreRun();
    }
    if (noLoop) {
    	Run();
    }
    else {
      function animationFrame(){
      	Grid.clear();
      	RunInLoop();
        for (var i in objects) {
          objects[i].updatePositions();
          objects[i].draw();
        }
        window.requestAnimationFrame(animationFrame);
      }
      window.requestAnimationFrame(animationFrame);
    }
	}
  
  window.StartUp = startUp;  
  window.BlockSize = blockSize;  
  window.SetBlockSize = setBlockSize;
  window.SetNoBlockCoord = setNoBlockCoord;
  window.SetNoLoop = setNoLoop;
  window.CreateGrid = createGrid;
  window.PutBlock = putBlock;
  window.PixelsPerSecond = pixelsPerSecond;
})();

document.addEventListener("DOMContentLoaded", StartUp);