class Sprite {
    constructor(options) {
        this.ctx = options.ctx;

        this.image = options.image;

        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = options.ticksPerFrame || 0;
        this.numberOfFrames = options.numberOfFrames || 1;

        this.width = options.width;
        this.height = options.height;

        this.start();
    }

    update() {
        this.tickCount++;

        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex++;
            } else {
                this.frameIndex = 0;
            }
        }
    }

    render() {
        this.ctx.clearRect(xPos, yPos, this.width / this.numberOfFrames, this.height);
        this.ctx.drawImage(
            this.image,
            this.frameIndex * this.width / this.numberOfFrames,
            0,
            this.width / this.numberOfFrames,
            this.height,
            xPos,
            yPos,
            this.width / this.numberOfFrames,
            this.height
        )
    }

    start() {
        let loop = () => {
            this.update();
            this.render();

            window.requestAnimationFrame(loop);
        }

        window.requestAnimationFrame(loop);
    }
}

let canvas = document.getElementById('canvas');
canvas.width = 1000;
canvas.height = 500;

let coinImage = new Image();
coinImage.src = 'images/rose-anim2.png';

let xPos = 0;
let yPos = 0;


let sprite = new Sprite({
    ctx: canvas.getContext('2d'),
    image: coinImage,
    width: 1000,
    height: 100,
    numberOfFrames: 10,
    ticksPerFrame: 3,

})
document.addEventListener('keydown', function(event){

    if (event.keyCode === 39 && xPos  < canvasWidth - (3 * (sprite.width/10))) {
       xPos += 5;
        console.log(canvasWidth)
        console.log(xPos)
    };

    if (event.keyCode === 37 && xPos >= -20) {
        xPos -= 5;
    };
    if (event.keyCode === 38 && yPos >= 0) {
        yPos -= 5;
    };
    if (event.keyCode === 40 && canvasHeight/2  >  yPos + 20 ) {
        yPos += 5;

    };
})
let canvasWidth = canvas.clientWidth;
let canvasHeight = canvas.clientHeight;



