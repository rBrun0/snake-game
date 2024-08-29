const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const snakeBodySize = 30
let direction;

const snakeBody = [
    {x: 300, y: 300},
    {x: 270, y: 300},
    {x: 240, y: 300},
]

const snakeFood = {
    x: generateRandomPosition(),
    y: generateRandomPosition(),
    color: 'red'
}

function generateRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function generateRandomPosition() {
    const number = generateRandomNumber(0, 570)
    return Math.round((number / 30)) * 30
}

function checkColision() {
    const snakeHead = snakeBody[snakeBody.length - 1]

    if(snakeHead.x < 0 || snakeHead.x >= 600) {
        alert('game over')
        window.location.reload()
    }

    if(snakeHead.y < 0 || snakeHead.y >= 600) {
        alert('game over')
        window.location.reload()
    }
}

function checkDefeat() {
    const snakeHead = snakeBody[snakeBody.length - 1]

    for(let i = 0; i < snakeBody.length - 2; i++) {
        if(snakeBody[i].x === snakeHead.x && snakeBody[i].y === snakeHead.y && snakeBody.length >= 4) {
            alert('Game Over!')
            window.location.reload()
        }
    }
}


function drawSnake() { 

    const snakeHead = snakeBody.length - 1

    
    snakeBody.forEach((snk, index) => {
        ctx.fillStyle = 'black';

        if(index === snakeHead){
            ctx.fillStyle = 'white';
           
        }

        ctx.fillRect(snk.x, snk.y, snakeBodySize, snakeBodySize);
    })
}

function drawFood() {
    ctx.fillStyle = snakeFood.color;
    ctx.fillRect(snakeFood.x, snakeFood.y, snakeBodySize, snakeBodySize);
}

function checkEat() {
    const snakeHead = snakeBody.length - 1

    if(snakeBody[snakeHead].x === snakeFood.x && snakeBody[snakeHead].y === snakeFood.y) {
        snakeBody.push({x: snakeFood.x, y:snakeFood.y})
        snakeFood.x = generateRandomPosition()
        snakeFood.y = generateRandomPosition()
        
    }
}


function moveSnake() {

    if(!direction) {
        return
    }

    if(direction === 'left') {
        const snakeHead = snakeBody[snakeBody.length - 1]
        snakeBody.shift()
        snakeBody.push({x: snakeHead.x - 30, y: snakeHead.y})
    }

    if(direction === 'right') {
        const snakeHead = snakeBody[snakeBody.length - 1]
        snakeBody.shift()
        snakeBody.push({x: snakeHead.x + 30, y: snakeHead.y})
    }

    if(direction === 'down') {
        const snakeHead = snakeBody[snakeBody.length - 1]
        snakeBody.shift()
        snakeBody.push({x: snakeHead.x, y: snakeHead.y + 30})
    }

    if(direction === 'top') {
        const snakeHead = snakeBody[snakeBody.length - 1]
        snakeBody.shift()
        snakeBody.push({x: snakeHead.x, y: snakeHead.y - 30})
    }
}

document.addEventListener('keydown', ({key}) => {
    if(key === 'ArrowLeft' && direction!== 'right') {
        direction = 'left'
    }
    if(key === 'ArrowRight' && direction!== 'left') {
        direction = 'right'
    }
    if(key === 'ArrowUp' && direction!== 'down') {
        direction = 'top'
    }
    if(key === 'ArrowDown' && direction!== 'top') {
        direction = 'down'
    }
})

// ctx.clearRect(0, 0, canvas.width, canvas.height);

setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood()
    checkDefeat()
    checkColision()
    moveSnake()
    checkEat()
    drawSnake()
    // console.log(snakeBody)
    console.log(generateRandomPosition())
 }, 300)
