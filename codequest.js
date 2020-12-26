(function() { 
	var canvas;
  var canvasContext;
  var blockSize = 30;
  
  function createCanvas(width, height, color) {
    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.width = width;
    canvas.height = height;
    canvas.style.position = 'absolute';
    
    canvasContext = canvas.getContext("2d");    
    
    if (color) {
      canvasContext.fillStyle = color;
      canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    }
  }
  
  function setBlockSize(size) {
    blockSize = size;
  }

  function putBlock(x, y) {
    canvasContext.strokeStyle = 'black';
    canvasContext.fillStyle = 'red';              
    canvasContext.fillRect(x * blockSize + 0.5, y * blockSize + 0.5, blockSize, blockSize);
    canvasContext.strokeRect(x * blockSize + 0.5, y * blockSize + 0.5, blockSize, blockSize);
  }    
  
  window.createCanvas = createCanvas;
  window.setBlockSize = setBlockSize;
  window.putBlock = putBlock;
})();

document.body.onload = function() { 	
  if (typeof setup !== "function") { 
    createCanvas(600, 600);
  }  
  else {
  	setup();
  }
  run();
}
