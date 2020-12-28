function Setup()
{
	SetNoGridCoord(true);
  SetNoLoop(false);
	CreateGrid(10, 10);
}

var speed = 100;
var states = [0, 0, 0, 0, 0];
var colors = ['red', 'green', 'blue', 'maroon', 'olive'];
var blocks = [];
var rotateCount = 0;

function PreRun()
{
  for (var i = 0; i < states.length; i++) {  
    blocks.push(PutBlock(i * 30, i * 30, colors[i]));
  }
}

function Run()
{   
  for (var i = 0; i < blocks.length; i++) {  
    var speed = 100 + i * 10 + rotateCount * 10;
    if (states[i] == 0) {
      if (blocks[i].right < Grid.right - (i * BlockSize)) {
        blocks[i].x += PixelsPerSecond(speed);
      }
      else {
        states[i] = 1;
      }
    }
    else if (states[i] == 1) {  	
      if (blocks[i].bottom < Grid.bottom - (i * BlockSize)) {
        blocks[i].y += PixelsPerSecond(speed);
      }
      else {
        states[i] = 2;
      }    
    }
    else if (states[i] == 2) {  	
      if (blocks[i].left > Grid.left + (i * BlockSize)) {
        blocks[i].x -= PixelsPerSecond(speed);
      }
      else {
        states[i] = 3;
      }    
    }  
    else if (states[i] == 3) {  	
      if (blocks[i].top > Grid.top + (i * BlockSize)) {
        blocks[i].y -= PixelsPerSecond(speed);
      }
      else {
        states[i] = 0;
        rotateCount++;
      }    
    } 
  }
}