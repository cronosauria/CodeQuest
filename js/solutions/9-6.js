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

var rotateCount = 0;
var moveState = 0;
var speed = 100;

function Run()
{  
  if (rotateCount < 5) {  
    if (moveState == 0) {
      if (block.right < Grid.right) {
        block.x += PixelsPerSecond(speed);
      }
      else {
        moveState = 1;
      }
    }
    else if (moveState == 1) {  	
      if (block.bottom < Grid.bottom) {
        block.y += PixelsPerSecond(speed);
      }
      else {
        moveState = 2;
      }    
    }
    else if (moveState == 2) {  	
      if (block.left > Grid.left) {
        block.x -= PixelsPerSecond(speed);
      }
      else {
        moveState = 3;
      }    
    }  
    else if (moveState == 3) {  	
      if (block.top > Grid.top) {
        block.y -= PixelsPerSecond(speed);
      }
      else {        
        moveState = 0;
        speed += 100;
        rotateCount++;
      }    
    }        
  }
}