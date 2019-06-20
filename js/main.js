// CANVAS DOM
const canvas = document.querySelector('#zone')
canvas.width = '600'
canvas.height = '600'
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
let score = 0
let vie = 5
let interval = 100
let randomColor = 0 
let intervalID;
let collisionTrace = false
window.onload = function () 
{

  intervalID = setInterval(game, interval)
  document.addEventListener("keydown", keyboard)

}


const game = () =>
{
  ctx.clearRect(0, 0, canvas.width, canvas.height)  

  x += moveX * largeur
  y += moveY * hauteur

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

    if(typeof tail[1].x != 'undefined') {
      if(tail[0].x == tail[1].x && tail[0].y == tail[1].y){
        tail.shift()
      } 
    }

    let collision = false

    if(tail.length>5){
      for(let i = 0; i < tail.length-1;i++) {
        if(tail[i].x==tail[tail.length-1].x && tail[i].y==tail[tail.length-1].y){
          collisionTrace= true
          break
        }
      }
    }

  while (tail.length > tailLength) {
    tail.shift()
  }

  ctx.fillStyle = "#f1c40f"

  for(let i = 0; i < tail.length; i++) {
    if(i==tail.length-1){
      switch(randomColor){
        case 0:
        ctx.fillStyle="#d35400"
        break
        case 1:
        ctx.fillStyle="#9b59b6"
        break
        default:
        ctx.fillStyle="#1abc9c" 
      } 
    }
    ctx.fillRect(tail[i].x,tail[i].y, largeur-3, hauteur-3);
  }


  if(x === appleX && y === appleY) {
    randomColor++
    randomColor%=3

    score += 10 + 2 * ((tailLength - initialLength) / upTail)
    tailLength += upTail

    nbCycle = 10
    appleX = Math.floor(Math.random()*canvas.width/largeur)*largeur
    appleY = Math.floor(Math.random()*canvas.height/hauteur)*hauteur
  }

  ctx.beginPath()
  ctx.arc(appleX + appleRadius, appleY + appleRadius,appleRadius, 0, Math.PI * 2)
  ctx.fillStyle="#e74c3c"
  ctx.fill()
  ctx.closePath()


  ctx.beginPath()
  ctx.arc(appleX + appleRadius + 3, appleY + appleRadius, appleRadius / 2, 0, Math.PI * 2)
  ctx.fillStyle="#ed7365"
  ctx.fill()
  ctx.closePath()

  ctx.font = '16px Arial'
  ctx.fillStyle = '#2ecc71'
  ctx.fillText('√', appleX+3, appleY+3 )

  ctx.font = '16px Arial'
  ctx.fillStyle = '#fff'
  ctx.fillText('Score: ' + score, 5, 20)

  ctx.font = '16px Arial'
  ctx.fillStyle = '#fff'
  ctx.fillText('Vie(s) restante(s): ' + vie, canvas.width - 150, 20)

  if(x < 0 || x > (canvas.width - largeur) || y < 0 || y > (canvas.height - hauteur) || collisionTrace == true){
    timeout = 0
    tail = []
    vie--
    x = Math.trunc(Math.random()*canvas.width/largeur)*largeur
    y= Math.trunc(Math.random()*canvas.height/hauteur)*hauteur

    tail.push({x:x,y:y})

    appleX=Math.trunc(Math.random()*canvas.width/largeur)*largeur
    appleY=Math.trunc(Math.random()*canvas.height/hauteur)*hauteur

  }
  if(vie <= 0){
    ctx.font = '40px Arial'
    ctx.fillStyle = '#fff'
    ctx.fillText('GAME OVER', canvas.width / 2 - 130, canvas.height / 2)
    clearTimeout(intervalID)
  }
}



const keyboard = evt => 
{
  evt.preventDefault()

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
