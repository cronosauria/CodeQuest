function Setup()
{
	SetNoGridCoord(true);
  SetNoLoop(false);
	CreateGrid(10, 10);
}

var speed = 100;
var states = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var colors = ['red', 'green', 'blue', 'maroon', 'olive', 'lime', 'aqua', 'fuchsia', 'orange', 'purple'];
var blocks = [];

function PreRun()
{
  for (var i = 0; i < states.length; i++) {  
    blocks.push(PutBlock(0, i * 30, colors[i]));
  }
}

function Run()
{  
  for (var i = 0; i < blocks.length; i++) {  
    if (states[i] == 0) {
      if (blocks[i].right < Grid.right) {
        blocks[i].x += PixelsPerSecond((i + 1) * 100);
      }
      else {
        states[i] = 1;
      }
    }
    else if (states[i] == 1) {  	
      if (blocks[i].left > Grid.left) {
        blocks[i].x -= PixelsPerSecond((i + 1) * 100);
      }
      else {
        states[i] = 2;
      }    
    }
  }
}