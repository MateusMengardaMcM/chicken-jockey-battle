const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y:600},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;
let enemy;
let cursors;
let score = 0;
let gameover = false;

function preload() {
    this.load.image('player','player.png');
    this.load.image('enemy','enemy.png');
    this.load.image('enemyShoot','enemyShoot.png');
    this.load.image('bg','background.png');
    this.load.audio('gameoverAudio','gameover.mp3');
}

function create() {
    this.add.image(400,300,"bg").setDisplaySize(800,500);
    this.ground = this.add.rectangle(400,500,800,40);
    this.physics.add.existing(this.ground,true);
    this.ground.setVisible(false);

    player = this.physics.add.sprite(100,360,'player');
    player.setScale(0.25);
    this.physics.add.collider(player,this.ground);

    enemy = this.physics.add.sprite(700,400,'enemy');
    enemy.setScale(0.5);
    this.physics.add.collider(enemy,this.ground);

    this.bullets = this.physics.add.group();
    shootEnemy.call(this);

    this.input.on('pointerdown', function() {
        if (player.body.touching.down) {
            player.setVelocityY(-500);
        }
    },this)

    this.scoreText = this.add.text(20,20,"score: 0",{
        fontSize: "24px",
        fill: "#fff"
    })

    this.scoreTimer = this.time.addEvent({
            delay: 125,
            loop: true,
            callback: () => {
                if (!gameover) {
                    score++;
                    this.scoreText.setText("score: " + score);
                }
            }   
    })

    this.gameoverAudio = this.sound.add("gameoverAudio");
    this.physics.add.overlap(player,this.bullets,hitPlayer,null,this);
}

function update() {
    if (gameover) return;
    if (player.body.velocity.y > 0) {
        player.setGravityY(1000);
    }
    else {
        player.setGravityY(0);
    }
}

function shootEnemy() {
    if (gameover) return;

    let bullet = this.bullets.create(enemy.x, enemy.y, "enemyShoot");
    bullet.setScale(0.16);
    bullet.setVelocityX(-200);
    bullet.body.allowGravity = false;

    let delay = Phaser.Math.Between(1500,2250);

    this.time.addEvent({
        delay: delay,
        callback: shootEnemy,
        callbackScope: this,
    });
}

function hitPlayer(player,bullet) {
    gameover = true;
    bullet.destroy();
    this.physics.pause();
    this.gameoverAudio.play();
    player.setTint(0xff0000);
    player.setVelocity(0,0);
    player.body.enable = false;
    this.bullets.clear(true,true);
    this.add.text(100,100,"GAME OVER!\nLa-la-la-lava,ch-ch-ch-chicken\nSteve's Lava Chicken,yeah,\nit's tasty as hell!",{
        fontSize: "32px",
        fill: "#ff0000",
        fontStyle: "bold"
    })
}