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

function shuffle(array) {
    let counter = array.length;

    while (counter > 1) {
        counter--;
        let index = Math.floor(Math.random() * counter);

        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

var game;
var gameOptions = {
    scorePanelHeight: 0.08,
    launchPanelHeight: 0.18,
    ballSize: 0.03,
    ballSpeed: 1000,
    blocksPerLine: 10,
    maxBlocksPerLine: 5,
    extraBallProbability: 60
};

window.onload = function() {
    game = new Phaser.Game(640, 960, Phaser.CANVAS);
    game.state.add("PlayGame", playGame, true);
};

var playGame = function(){};
playGame.prototype = {
    preload: function(){
        game.load.image("ball", "assets/ball.png");
        game.load.image("panel", "assets/panel.png");
        game.load.image("trajectory", "assets/trajectory.png");
        game.load.image("block", "assets/block.png");
    },
    create: function(){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.stage.backgroundColor = 0x202020;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.blockGroup = game.add.group();
        this.extraBallGroup = game.add.group();
        this.ballsToBeAddedGroup = game.add.group();
        this.ballsGroup = game.add.group();
        this.fallingGroup = game.add.group();
        this.fallingGroup.add(this.blockGroup);
        this.fallingGroup.add(this.extraBallGroup);
        this.scorePanel = game.add.sprite(0, 0, "panel");
        this.scorePanel.width = game.width;
        this.scorePanel.height = Math.round(game.height * gameOptions.scorePanelHeight);
        game.physics.enable(this.scorePanel, Phaser.Physics.ARCADE);
        this.scorePanel.body.immovable = true;
        this.launchPanel = game.add.sprite(0, game.height, "panel");
        this.launchPanel.width = game.width;
        this.launchPanel.height = Math.round(game.height * gameOptions.launchPanelHeight);
        this.launchPanel.anchor.set(0, 1);
        game.physics.enable(this.launchPanel, Phaser.Physics.ARCADE);
        this.launchPanel.body.immovable = true;
        var ballSize = game.width * gameOptions.ballSize;
        this.addBall(game.width / 2, game.height - this.launchPanel.height - ballSize / 2);
        this.trajectory = game.add.sprite(this.ballsGroup.getChildAt(0).x, this.ballsGroup.getChildAt(0).y, "trajectory");
        this.trajectory.anchor.set(0.5, 1.);
        this.trajectory.visible = false;
        game.input.onDown.add(this.aimBall, this);
        game.input.onUp.add(this.shootBall, this);
        game.input.addMoveCallback(this.adjustBall, this);
        this.aiming = false;
        this.shooting = false;
        this.level = 0;
        this.addLine();
        this.extraBalls = 0;
    },
    addBall: function(x, y){
        var ballSize = game.width * gameOptions.ballSize;
        var ball = game.add.sprite(x, y, "ball");
        ball.width = ballSize;
        ball.height = ballSize;
        ball.anchor.set(0.5);
        game.physics.enable(ball, Phaser.Physics.ARCADE);
        ball.body.collideWorldBounds=true;
        ball.body.bounce.set(1);
        this.ballsGroup.add(ball);
    },
    mergeBall: function(i) {
        var scrollTween = game.add.tween(i).to({
            x: this.ballsGroup.getChildAt(0).x
        }, 100, Phaser.Easing.Linear.None, true);
        scrollTween.onComplete.add(function(i) {
            i.destroy();
        }, this)
    },
    addLine: function() {
        this.level ++;
        var blockSize = game.width / gameOptions.blocksPerLine;

        var availableIndices = [];
        for (let i = 0; i < gameOptions.blocksPerLine; i++) {
            availableIndices.push(i);
        }
        shuffle(availableIndices);
        console.log("availableIndices: "+availableIndices);

        var placeExtraBalls = 1+Math.floor(Math.random()*3);
        console.log("placeExtraBalls: "+placeExtraBalls);

        var availableBlocks = gameOptions.blocksPerLine-placeExtraBalls-1;
        var placeBlocks = 2+Math.floor(Math.random()*availableBlocks);
        console.log("availableBlocks: "+availableBlocks);
        console.log("placeBlocks: "+placeBlocks);

        for (let i = 0; i < placeExtraBalls; i++) {
            var ballSize = game.width * gameOptions.ballSize;
            let blockPosition = availableIndices.pop();
            var ball = game.add.sprite(blockPosition * blockSize + blockSize / 2, blockSize / 2 + game.height * gameOptions.scorePanelHeight, "ball");
            ball.width = ballSize;
            ball.height = ballSize;
            ball.anchor.set(0.5);
            ball.tint = 0xff8800;
            game.physics.enable(ball, Phaser.Physics.ARCADE);
            ball.body.immovable = true;
            this.extraBallGroup.add(ball);
            ball.row = 1;
        }
        console.log("availableIndices: "+availableIndices);

        for (let i = 0; i < placeBlocks; i++) {
            let blockPosition = availableIndices.pop();

            var block = game.add.sprite(blockPosition * blockSize + blockSize / 2, blockSize / 2 + game.height * gameOptions.scorePanelHeight, "block");
            block.width = blockSize;
            block.height = blockSize;
            block.anchor.set(0.5);
            block.value = this.level;
            game.physics.enable(block, Phaser.Physics.ARCADE);
            block.body.immovable = true;
            block.row = 1;
            this.blockGroup.add(block);
            var text = game.add.text(0, 0, block.value, {
                font: "bold 32px Arial",
                align: "center"
            });
            text.anchor.set(0.5);
            block.addChild(text);
        }
    },
    aimBall: function(e){
        if(!this.shooting){
            this.aiming = true;
        }
    },
    adjustBall: function(e) {
        if(this.aiming) {
            var distX = e.position.x - e.positionDown.x;
            var distY = e.position.y - e.positionDown.y;
            if(distY > 10){
                this.trajectory.position.set(this.ballsGroup.getChildAt(0).x, this.ballsGroup.getChildAt(0).y);
                this.trajectory.visible = true;
                this.direction = Phaser.Math.angleBetween(e.position.x, e.position.y, e.positionDown.x, e.positionDown.y);
                this.trajectory.angle = Phaser.Math.radToDeg(this.direction) + 90;
            }
            else{
                this.trajectory.visible = false;
            }
        }
    },
    shootBall: function() {
        if (this.trajectory.visible) {
            this.landedBalls = 0;
            var angleOfFire = Phaser.Math.degToRad(this.trajectory.angle - 90);
            var pointOfFire = new Phaser.Point(this.ballsGroup.getChildAt(0).x, this.ballsGroup.getChildAt(0).y);
            var ballsFired = 0;
            var fireLoop = game.time.events.loop(Phaser.Timer.SECOND / 10, function(){
                ballsFired++;
                if(ballsFired > this.extraBalls){
                    game.time.events.remove(fireLoop);
                }
                else{
                    this.addBall(pointOfFire.x, pointOfFire.y);
                    // console.log(ballsFired,this.ballsGroup.children.length);
                    let angleOfFireNew = angleOfFire+(Math.random()*2-1)*0.1;
                    var ball = this.ballsGroup.getChildAt(this.ballsGroup.children.length - 1);
                    ball.body.velocity.set(gameOptions.ballSpeed * Math.cos(angleOfFireNew), gameOptions.ballSpeed * Math.sin(angleOfFireNew));
                    //var text = game.add.text(0, 0, "x"+this.extraBalls+1-ballsFired, {
                    //    font: "bold 32px Arial",
                    //    align: "center",
                    //    fill: "#ff0044"
                    //});
                    //text.anchor.set(0.5);
                    //ball.addChild(text);
                }
            }, this)

            this.ballsGroup.getChildAt(0).body.velocity.set(gameOptions.ballSpeed * Math.cos(angleOfFire), gameOptions.ballSpeed * Math.sin(angleOfFire));
            this.shooting = true;
        }
        this.aiming = false;
        this.trajectory.visible = false;
    },
    update: function(){
        if(this.shooting) {
            game.physics.arcade.collide(this.ballsGroup, this.scorePanel);
            game.physics.arcade.collide(this.ballsGroup, this.blockGroup, function(ball, block) {

                block.value --;
                if(block.value == 0){
                    block.destroy();
                }
                else{
                    block.getChildAt(0).text = block.value;
                }
            }, null, this);

            game.physics.arcade.overlap(this.ballsGroup, this.extraBallGroup, function(ball, extraBall){
                this.ballsToBeAddedGroup.add(extraBall)
                var scrollTween = game.add.tween(extraBall).to({
                    y: game.height - this.launchPanel.height - (game.width * gameOptions.ballSize) / 2
                }, 200, Phaser.Easing.Linear.None, true);
                scrollTween.onComplete.add(function(e){
                    e.tint = 0xffffff;
                }, this)
            }, null, this);

            game.physics.arcade.collide(this.ballsGroup, this.launchPanel, function(panel, ball){
                ball.body.velocity.set(0);
                if(this.landedBalls == 0){
                    this.ballsGroup.swapChildren(ball, this.ballsGroup.getChildAt(0));
                }
                else{
                    this.mergeBall(ball);
                }
                this.landedBalls++;
                if(this.landedBalls > this.extraBalls){
                    this.ballsToBeAddedGroup.forEach(function(i){
                        this.extraBalls ++;
                        this.mergeBall(i);
                    }, this);
                    var scrollTween = game.add.tween(this.fallingGroup).to({
                        y: this.fallingGroup.y + game.width / gameOptions.blocksPerLine
                    }, 200, Phaser.Easing.Linear.None, true);
                    scrollTween.onComplete.add(function(){
                        this.shooting = false;
                        this.fallingGroup.y = 0;
                        this.blockGroup.forEach(function(i){
                            i.y += game.width / gameOptions.blocksPerLine;
                            i.row++;
                            if(i.row == gameOptions.blocksPerLine){
                                game.state.start("PlayGame");
                            }
                        }, this);
                        this.extraBallGroup.forEach(function(i){
                            i.y += game.width / gameOptions.blocksPerLine;
                            i.row++;
                            if(i.row == gameOptions.blocksPerLine){
                                i.destroy()
                            }
                        }, this);
                        this.addLine();
                    }, this)
                }
            }, null, this);
        }
    }
};
