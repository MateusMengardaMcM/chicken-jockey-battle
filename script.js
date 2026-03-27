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

function preload() {
    this.load.image('player','player.png');
    this.load.image('playerAttack','playerAttack.png');
    this.load.image('playerShoot','playerShoot.png');
    this.load.image('enemy','enemy.png');
    this.load.image('enemyShoot','enemyShoot.png');
    this.load.image('bg','background.png');
}

function create() {
    this.add.image(400,300,"bg").setDisplaySize(800,500);
    this.ground = this.add.rectangle(400,500,800,40);
    this.physics.add.existing(this.ground,true);
    this.ground.setVisible(false);

    player = this.physics.add.sprite(100,360,'player');
    player.setScale(0.075);
    this.physics.add.collider(player,this.ground);

    enemy = this.physics.add.sprite(700,400,'enemy');
    enemy.setScale(0.5);
    this.physics.add.collider(enemy,this.ground);

    this.bullets = this.physics.add.group();
    shootEnemy.call(this);

    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-500);
    }
    if (player.body.velocity.y > 0) {
        player.setGravityY(1000);
    }
    else {
        player.setGravityY(0);
    }
}

function shootEnemy() {
    let bullet = this.bullets.create(enemy.x, enemy.y, "enemyShoot");
    bullet.setScale(0.15);
    bullet.setVelocityX(-200);
    bullet.body.allowGravity = false;
    let delay = Phaser.Math.Between(750,3000);
    this.time.addEvent({
        delay: delay,
        callback: shootEnemy,
        callbackScope: this,
    });
}