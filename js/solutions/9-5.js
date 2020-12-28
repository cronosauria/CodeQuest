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

var rotateState = 0;
var moveState = 0;

function Run()
{  
  if (rotateState == 0) {
    if (moveState == 0) {
      if (block.right < Grid.right) {
        block.x += PixelsPerSecond(100);
      }
      else {
        moveState = 1;
      }
    }
    else if (moveState == 1) {  	
      if (block.bottom < Grid.bottom) {
        block.y += PixelsPerSecond(100);
      }
      else {
        moveState = 2;
      }    
    }
    else if (moveState == 2) {  	
      if (block.left > Grid.left) {
        block.x -= PixelsPerSecond(100);
      }
      else {
        moveState = 3;
      }    
    }  
    else if (moveState == 3) {  	
      if (block.top > Grid.top) {
        block.y -= PixelsPerSecond(100);
      }
      else {
        rotateState = 1;
        moveState = 0;
      }    
    }    
  }
  else if (rotateState == 1) {
    if (moveState == 0) {      
      if (block.bottom < Grid.bottom) {
        block.y += PixelsPerSecond(100);
      }
      else {
        moveState = 1;
      }
    }
    else if (moveState == 1) {  	
      if (block.right < Grid.right) {
        block.x += PixelsPerSecond(100);
      }
      else {
        moveState = 2;
      }    
    }
    else if (moveState == 2) {  	
      if (block.top > Grid.top) {
        block.y -= PixelsPerSecond(100);
      }
      else {
        moveState = 3;
      }    
    }  
    else if (moveState == 3) {  	
      if (block.left > Grid.left) {
        block.x -= PixelsPerSecond(100);
      }
      else {
        moveState = 4;
      }    
    }      
  }
}