const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y:150},
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
    this.load.image('enemy','enemy.png');
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
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (cursors.left.isDown) {
        player.x -= 4;
    } else if (cursors.right.isDown) {
        player.x += 4;
    }

    if (cursors.up.isDown) {
        player.y -= 4;
    }
}