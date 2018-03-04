String.prototype.format = function()
{
    var content = this;
    for (var i=0; i < arguments.length; i++)
    {
        var replacement = '{' + i + '}';
        content = content.replace(replacement, arguments[i]);
    }
    return content;
};

function changeRatio() {
    var width = game.canvas.width;
    var height = game.canvas.height;
    var innerWidth = window.innerWidth;
    var innerHeight = window.innerHeight;

    if (height / width < innerHeight / innerWidth) {
        game.canvas.style.width = "100%";
        game.canvas.style.height = "";
    } else {
        game.canvas.style.width = "";
        game.canvas.style.height = "100%";
    }
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    },
    parent: "game-area"
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.setBaseURL('http://labs.phaser.io');
    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
}

function create ()
{
    changeRatio();

    this.add.image(400, 300, 'sky');
    var particles = this.add.particles('red');

    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });
    var logo = this.physics.add.image(400, 100, 'logo');
    logo.setVelocity(300, 200);
    logo.setBounce(0.99, 0.95);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
}