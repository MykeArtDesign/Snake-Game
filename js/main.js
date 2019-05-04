// CANVAS DOM
const canvas = document.querySelector('#zone')
canvas.width = '400'
canvas.height = '400'
const ctx = canvas.getContext('2d')

// Snake
let largeur = 20
let hauteur = 20
let x = Math.floor(Math.random()*canvas.width/largeur)*largeur
let y = Math.floor(Math.random()*canvas.height/hauteur)*hauteur
let moveX = 0
let moveY = 0
let tail = []
let lastMove
let tailLength = 5
let initialLength = 5
let upTail = 1
let tailMaxLength = 100
let cycle = 0
let nbCycle = 10

//Apple
let appleX = Math.floor(Math.random()*canvas.width/largeur)*largeur
let appleY = Math.floor(Math.random()*canvas.height/hauteur)*hauteur
const appleRadius = 10;

// Extra
let score = 0;
let interval = 100
window.onload = function () 
{

let intervalID = setInterval(game, interval)
document.addEventListener("keydown", keyboard)

}


const game = () =>
{
	ctx.clearRect(0, 0, canvas.width, canvas.height)	

	x += moveX * largeur
	y += moveY * hauteur

	if ( x < 0) 
	{
		x = canvas.width
	} 
	else if ( x > canvas.width) 
	{
		x = 0
	}

	if ( y < 0)
	{
		y = canvas.height
	}
	else if ( y > canvas.height )
	{
		y = 0
	}


	if((tailLength <= tailMaxLength) && ((moveX != 0) || (moveY!=0)))
	{
		if( (cycle++)%10 == 1)
		{
			nbCycle--
			if(nbCycle < 0) {
				tailLength += upTail
			}
		}
	}

	tail.push({x:x, y:y})

	while (tail.length > tailLength) {
		tail.shift()
	}

	ctx.fillStyle = "#f1c40f"

	for( let i = 0; i < tail.length; i++) 
	{
		ctx.fillRect(tail[i].x, tail[i].y, largeur - 3, hauteur - 3)
	}


 	if(x === appleX && y === appleY) {
 		score += 10 + 2 * ((tailLength - initialLength) / upTail)
	 		tailLength += upTail

	 	// if (tailLength > initialLength) {
	 	// }
	 	nbCycle = 10
	 	appleX = Math.floor(Math.random()*canvas.width/largeur)*largeur
		appleY = Math.floor(Math.random()*canvas.height/hauteur)*hauteur
 	}

	ctx.beginPath();
 	ctx.arc(appleX + appleRadius, appleY + appleRadius,appleRadius, 0, Math.PI * 2);
 	ctx.fillStyle="#e74c3c";
 	ctx.fill();
 	ctx.closePath();

 	ctx.beginPath();
 	ctx.arc(appleX + appleRadius + 3, appleY + appleRadius, appleRadius / 2, 0, Math.PI * 2);
 	ctx.fillStyle="#ed7365";
 	ctx.fill();
 	ctx.closePath();

 	ctx.font = '16px Arial';
 	ctx.fillStyle = '#fff';
 	ctx.fillText('Score: ' + score, 5, 20);
}


const keyboard = evt => 
{

	switch(evt.keyCode)
	{
		// left
		case 37:
			if(lastMove === 39) {break}
			moveX = -1
			moveY = 0
			lastMove = evt.keyCode
		break

		// top
		case 38:
			if(lastMove === 40) {break}
			moveX = 0
			moveY = -1
			lastMove = evt.keyCode
		break

		// right
		case 39:
			if(lastMove === 37) {break}
			moveX = 1
			moveY = 0
			lastMove = evt.keyCode
		break

		// bottom
		case 40:
			if(lastMove === 38) {break}
			moveX = 0
			moveY = 1
			lastMove = evt.keyCode
		break

		// space
		case 32:
			moveX = 0
			moveY = 0
		break

		case 82:
		window.location.reload()
		break
	}
}
