let bg 
let player
let playerImage
let bullet 
let bullets
let opponent
let opponentImage
let opponents
let score = 0
let comp = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
let vel = 3



function setup() {
	createCanvas(500,500)
	bullet = new Bullet()
	bullets = []
	opponent = new Opponent()
	opponents = []
}

function preload() {
	bg = loadImage("space.png")
	playerImage = loadImage("player.png")
	opponentImage = loadImage("stone.png")
}

function mousePressed() {
	bullets.push(new Bullet(mouseX,mouseY))
}

setInterval(() => {
	opponents.push(new Opponent())
},1000)

function draw() {
	background(bg)
	player = new Player()
	player.draw()
	player.detect()
	
	for(let i of bullets){
		i.draw()
		i.moveup()
		i.detect()
	}
	
	for(let o of opponents){
		o.draw()
		o.movedown()
		o.detect()
	}

	textSize(32)
	fill(255)
	text(score, 20,30)
}

class Player{
	constructor() {
		this.x = mouseX - 20/2
		this.y = mouseY - 50/2
	}

	draw(){
		playerImage.resize(50,50)
		image(playerImage,this.x,this.y)
	}
	detect() {
		opponents.forEach((op) => {
			if ((op.y + 50 >= player.y && op.y + 50 < player.y + 50 || op.y <= player.y + 50 && op.y > player.y) && (op.x + 50 >= player.x && op.x + 50 < player.x + 20 || op.x <= player.x + 20 && op.x > player.x)) {
				let oindex = opponents.indexOf(op)

				let nigger = opponents.filter((element, index) => index !== oindex)
				opponents = nigger

				score = 0
				vel = 3
			};
		})
	}
}



class Bullet{
	constructor(x,y) {
		this.x = x - 10
		this.y = y - 50
		this.velocity = 5
	}
	draw() {
		fill(255,0,0)
		rect(this.x,this.y, 10, 30)
	}
	moveup() {
		this.y -= this.velocity
	}

	detect() {
		bullets.forEach((blt) => {
			if (blt.y < 0) {
				bullets.shift()
			};
		})

		opponents.forEach((o) => {
			if ((this.y <= o.y + 50 && this.y > o.y) && (this.x + 10 >= o.x && this.x + 10 < o.x + 50 || this.x <= o.x + 50 && this.x > o.x)) {

				bullets.shift()

				let oindex = opponents.indexOf(o)


				let nigger = opponents.filter((element, index) => index !== oindex)
				opponents = nigger


				score += 1

				for(let i = 0; i < comp.length; i++){
					if (score / 5 == i) {
						vel += 1
					}
				}




			};
		})
	}
}
	
class Opponent{
	constructor() {
		this.x = Math.floor(Math.random() * canvas.width - 20)
		this.y = -10
		this.velocity = vel
	}
	draw() {
		opponentImage.resize(50,50)
		image(opponentImage,this.x,this.y)

	}
	movedown() {
		this.y += this.velocity
	}
	detect() {
		opponents.forEach((op) => {
			if (op.y > canvas.height) {
				opponents.shift()	

				if (score == 0) {
					return
				}else {
					score -= 1
				}
			}

			if ((op.y + 50 >= player.y && op.y + 50 < player.y + 50 || op.y <= player.y + 50 && op.y > player.y) && (op.x + 50 >= player.x && op.x + 50 < player.x + 50 || op.x <= player.x + 50 && op.x > player.x)) {
				let oindex = opponents.indexOf(op)

				let nigger = opponents.filter((element, index) => index !== oindex)
				opponents = nigger

				score = 0
				vel = 3
			};

		})
	}
}