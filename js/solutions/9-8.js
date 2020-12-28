function Setup()
{
	SetNoGridCoord(true);
  SetNoLoop(false);
	CreateGrid(10, 10);
}

var speed = 100;
var states = [0, 0, 0, 0];
var blocks = [];

function PreRun()
{
  blocks.push(PutBlock(0, 0));
  blocks.push(PutBlock(0, 30));
  blocks.push(PutBlock(0, 60));
}

function Run()
{  
  for (var i = 0; i < blocks.length; i++) {  
    if (states[i] == 0) {
      if (blocks[i].right < Grid.right) {
        blocks[i].x += PixelsPerSecond(speed);
      }
      else {
        states[i] = 1;
      }
    }
    else if (states[i] == 1) {  	
      if (blocks[i].left > Grid.left) {
        blocks[i].x -= PixelsPerSecond(speed);
      }
      else {
        states[i] = 2;
      }    
    }
  }
}