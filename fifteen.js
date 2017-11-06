var div;
var blink;
var Posx;
var PosY;

window.onload = function ()
{
	var puzzlearea = document.getElementById('puzzlearea');
	
	div = puzzlearea.getElementsByTagName('div');
	// This for-loop arranges the numbers into a puzzle grid and 
	// attaches event-handler functions to make the game logic work
	for (var i = 0;  i < div.length;  i++)
	{
		div[i].className = 'puzzlepiece';
		
		// Used to arrange the pieces into a grid formation
		div[i].style.top = (parseInt(i / 4)*100) + 'px';
        div[i].style.left = (i % 4 * 100)+'px';
		
		// Evaluates to "-XXX px -YYY px" to position the image on the squares using X and Y coordinates
		div[i].style.backgroundPosition= '-' + div[i].style.left + ' ' + '-' + div[i].style.top;
		
		// Used to show the user if a piece can be moved when hovered
		// by changing the colour of the piece
		div[i].onmouseover = function()
		{
			if (moveable(parseInt(this.innerHTML)))
			{
				this.classList.add("movablepiece");

			}
		};

		// Used to revert the colour of the piece back to default 
		// when the user's cursor leaves the piece
		div[i].onmouseout = function()
		{
			this.classList.remove("movablepiece");
		};

		// Used to move a piece if it can be moved when clicked
		div[i].onclick = function()
		{
			if (moveable(parseInt(this.innerHTML)))
			{
				swap(this.innerHTML-1);
				if (checkFinish())
			
	{
					gameWon();
				}
				return;
			}
		};
	}

	Posx = '300px';
	PosY = '300px';
	
	var shufflebutton = document.getElementById('shufflebutton');
	
	// Function used to shuffle pieces on the grid when called
	shufflebutton.onclick = function()
	{   
	    var bod = document.getElementsByTagName('body');
	        bod[0].style.backgroundColor = "#FFFFFF";
		for (var i=0; i<100; i++)
		{   
			var rand = parseInt(Math.random()* 100) %4;
			if (rand == 0)
			{
				var tmp = checkUp(Posx, PosY);
				if ( tmp != -1)
				{
					swap(tmp);
				}
			}
			if (rand == 1)
			{
				var tmp = checkDown(Posx, PosY);
				if ( tmp != -1) 
				{
					swap(tmp);
				}
			}

			if (rand == 2)
			{
				var tmp = checkLeft(Posx, PosY);
				if ( tmp != -1)
				{
					swap(tmp);
				}
			}

			if (rand == 3)
			{
				var tmp = checkRight(Posx, PosY);
				if (tmp != -1)
				{
					swap(tmp);
				}
			}
		}
	};
};

// Function to check if the piece can be moved
function moveable(puzzpiece)
{
	if (checkLeft(Posx, PosY) == (puzzpiece-1))
	{
		return true;
	}

	if (checkDown(Posx, PosY) == (puzzpiece-1))
	{
		return true;
	}

	if (checkUp(Posx, PosY) == (puzzpiece-1))
	{
		return true;
	}

	if (checkRight(Posx, PosY) == (puzzpiece-1))
	{
		return true;
	}
}

function Blink()
{
	blink --;
	if (blink == 0)
	{
		var body = document.getElementsByTagName('body');
		body[0].style.backgroundColor = "#FFFFFF";
		alert('Congrats, you win!!');
		return;
	}
	if (blink % 2)
	{
		var body = document.getElementsByTagName('body');
	
	body[0].style.backgroundColor = "#00FF00";	
	}
	else
	{
		var body = document.getElementsByTagName('body');
		body[0].style.backgroundColor = "#FF0000";
	}
	timer = setTimeout(Blink, 100);
}

function gameWon()
{
	var body = document.getElementsByTagName('body');
	body[0].style.backgroundColor = "green";
	blink = 10;
	timer = setTimeout(Blink, 100);

}

function checkFinish()
{
	var t = true;
	for (var i = 0; i < div.length; i++) {
		var y = parseInt(div[i].style.top);
		var x = parseInt(div[i].style.left);

		if (x != (i%4*100) || y != parseInt(i/4)*100)
		{
			t = false;
			break;
		}
	}
	return t;
}

// Checks if there's a piece to the left of the empty space
function checkLeft(x, y)
{
	var x = parseInt(x);
	var y = parseInt(y);

	if (x > 0)
	{
		for (var i = 0; i < div.length; i++) 
		{
			if (parseInt(div[i].style.left) + 100 == x && parseInt(div[i].style.top) == y)
			{
				return i;
			} 
		}
	}
	else 
	{
		return -1;
	}
}

// Check if there's a piece to the right of the empty space
function checkRight (x, y) {
	var x = parseInt(x);
	var y = parseInt(y);
	if (x < 300)
	{
		for (var i =0; i<div.length; i++){
		
	if (parseInt(div[i].style.left) - 100 == x && parseInt(div[i].style.top) == y) 
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	} 
}

// Check if there's a piece above the empty space
function checkUp (x, y) {
	var x = parseInt(x);
	var y = parseInt(y);
	if (y > 0)
	{
		for (var i=0; i<div.length; i++)
		{
			if (parseInt(div[i].style.top) + 100 == y && parseInt(div[i].style.left) == x) 
			{
				return i;
		
	}
		} 
	}
	else 
	{
		return -1;
	}
}

// Checks if there's a piece below the empty space
function checkDown (x, y)
{
	var x = parseInt(x);
	var y = parseInt(y);
	if (y < 300)
	{
		for (var i=0; i<div.length; i++)
		{
			if (parseInt(div[i].style.top) - 100 == y && parseInt(div[i].style.left) == x) 
			{
				return i;
			}
		}
	}
	else

	{
		return -1;
	} 
}

// This switches the pieces by swapping the X and Y coordinates 
// between the empty space and the puzzle piece passed as an argument.
function swap (puzzpiece) {
	// Swap X positions
	var temp = div[puzzpiece].style.left;
	div[puzzpiece].style.left = Posx;
	Posx = temp;
	// Swap Y positions
	temp = div[puzzpiece].style.top;
	div[puzzpiece].style.top = PosY;
	PosY = temp;
}

