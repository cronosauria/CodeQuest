function Setup()
{
	SetNoGridCoord(true);
  SetNoLoop(false);
	CreateGrid(10, 10);
}

function PreRun()
{
	block = PutBlock(0, 0);
}

var state = 0;

function Run()
{  
  if (state == 0) {
    if (block.right < Grid.right) {
      block.x += PixelsPerSecond(100);
    }
    else {
      state = 1;
    }
  }
  else if (state == 1) {  	
    if (block.bottom < Grid.bottom) {
      block.y += PixelsPerSecond(100);
    }
    else {
      state = 2;
    }    
  }
  else if (state == 2) {  	
    if (block.left > Grid.left) {
      block.x -= PixelsPerSecond(100);
    }
    else {
      state = 3;
    }    
  }  
  else if (state == 3) {  	
    if (block.top > Grid.top) {
      block.y -= PixelsPerSecond(100);
    }
    else {
      state = 4;
    }    
  }    
}