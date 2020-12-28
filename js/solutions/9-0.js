function Setup()
{
	SetNoGridCoord(true);
  SetNoLoop(false);
	CreateGrid(10, 10);
}

var block;

function PreRun()
{
	block = PutBlock(0, 0);
}

function Run()
{
  block.x += PixelsPerSecond(100);
}
