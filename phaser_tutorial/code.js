var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
    parent: "game-area",
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var score = 0;
var scoreText;

var gameOver = false;

function preload () {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('platform_red', 'assets/platform_red_32x32.png');
    this.load.image('platform_red_left', 'assets/platform_red_32x32_left.png');
    this.load.image('platform_red_right', 'assets/platform_red_32x32_right.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

var platformPositions = [[12, 16, 8],
                         [3, 6, 4],
                         [2, 7, 11],
                         [15, 22, 4],
                         [20, 24, 13]];

var platforms;
function create () {
    changeRatio(game.canvas);

    keyA = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    cursors = this.input.keyboard.createCursorKeys();
    keyS.wasReleased = true;


    this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568+8, 'ground').setScale(2).refreshBody();

    // go through the platform positions!
    for (let j = 0; j < platformPositions.length; j++) {
        let positions = platformPositions[j];
        let x_idx1 = positions[0];
        let x_idx2 = positions[1];
        let y_idx = positions[2];

        platforms.create(16+32*x_idx1, 16+32*y_idx, "platform_red_left");
        for (let i = x_idx1+1; i < x_idx2; i++) {
            platforms.create(16+32*i, 16+32*y_idx, "platform_red");
        }
        platforms.create(16+32*x_idx2, 16+32*y_idx, "platform_red_right");        
    }

    player = this.physics.add.sprite(100, 450, 'dude');
    player.doubleJump = true;
    player.isInAir = false;
    player.runFaster = false;
    player.jumpVelocity = 400;
    // player.body.setSize(20, 32, 5, 16);

    player.setBounce(0);
    // player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, platforms);

    this.anims.create({
        key: 'left_fast',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'right_fast',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 20,
        repeat: -1
    });


    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 60, y: 0, stepX: 60 }
    });

    stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));

    });

    this.physics.add.collider(stars, platforms);

    this.physics.add.overlap(player, stars, collectStar, null, this);


    scoreText = this.add.text(32, 32, 'Score: 0', { fontSize: '32px', fill: '#000' });


    bombs = this.physics.add.group();

    this.physics.add.collider(bombs, platforms);

    this.physics.add.collider(player, bombs, hitBomb, null, this);


    // var mask = game.add.graphics(0, 0);
}

function collectStar (player, star)
{
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0)
    {
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;

    }
}

function hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}

function update () {
    if (!gameOver) {
        player.runFaster = keyA.isDown;

        var isLeft = cursors.left.isDown;
        var isRight = cursors.right.isDown;

        if (isLeft ^ isRight) {
            if (isLeft) {
                if (!player.runFaster) {
                    player.setVelocityX(-160);
                    player.anims.play('left', true);
                } else {
                    player.setVelocityX(-300);
                    player.anims.play('left_fast', true);
                }
            }
            else if (isRight) {
                if (!player.runFaster) {
                    player.setVelocityX(160);
                    player.anims.play('right', true);
                } else {
                    player.setVelocityX(300);
                    player.anims.play('right_fast', true);
                }
            }
        }
        else
        {
            player.setVelocityX(0);

            player.anims.play('turn');
        }
    }

    if (player.body.touching.down) {
        player.isInAir = false;
        player.doubleJump = true;
    } else {
        player.isInAir = true;
    }

    if (keyS.isDown && keyS.wasReleased && !player.isInAir) {
        keyS.wasReleased = false;
        player.isInAir = true;
        player.setVelocityY(-player.jumpVelocity);
    }

    if (keyS.isDown && keyS.wasReleased && player.body.velocity.y > -200 && player.doubleJump) {
        keyS.wasReleased = false;
        player.doubleJump = false;
        player.setVelocityY(-player.jumpVelocity);
    }

    if (keyS.isUp) {
        keyS.wasReleased = true
    }
}
