/**
 * Created by Jerome Renaux (jerome.renaux@gmail.com) on 15-09-18.
 */

var Game = {};

Game.preload = function(){
    Game.scene = this; // Handy reference to the scene (alternative to `this` binding)
    this.load.image('logo', 'assets/PhaserLogo.png');
    this.load.bitmapFont('font','assets/azo-fire.png','assets/azo-fire.xml')
};

Game.create = function(){
    var txt = this.add.bitmapText(0, 0, 'font', 'SCORE:', 38).setOrigin(0);
    this.scoreTxt = this.add.bitmapText(txt.x+txt.width+10, 0, 'font', '0', 38).setOrigin(0);
    Game.setScore();

    var txt = this.add.bitmapText(0, 600, 'font', 'VISITS:', 20).setOrigin(0,1);
    this.visitsTxt = this.add.bitmapText(txt.x+txt.width+10, 600, 'font', '0', 20).setOrigin(0,1);
    Game.setVisits();

    var logo = this.add.image(400,300,'logo').setInteractive();
    logo.on('pointerdown',function(){
        Game.updateScore(10);
        Game.scene.tweens.add(
            {
                targets: logo,
                scaleX: 0.9,
                scaleY: 0.9,
                duration: 50,
                yoyo: true
            }
        );
    });
};

Game.setScore = function(){
    // Gets the value stored in localStorage, or 0 if nothing is found
    // Don't fortget to parseInt(), all values are stored as strings in localStorage
    Game.scene.score = parseInt(localStorage.getItem('score')) || 0;
    Game.scene.scoreTxt.setText(Game.scene.score);
};

Game.setVisits = function(){
    // Gets the value stored in localStorage, or 0 if nothing is found
    // Don't fortget to parseInt(), all values are stored as strings in localStorage
    Game.scene.visits = (parseInt(localStorage.getItem('visits')) || 0) + 1;
    Game.scene.visitsTxt.setText(Game.scene.visits);
    // Immediately increment the stored visits counter
    localStorage.setItem('visits',Game.scene.visits);
};

// ### Alternate way to save, by bundling all data into a JSON file stored as a single localStorage entry ###
Game.saveFile = function(){
    var file = {
        score: Game.scene.score,
        visits: Game.scene.visits
    };
    localStorage.setItem('saveFile',JSON.stringify(file));
};

Game.loadFile = function(){
    var file = JSON.parse(localStorage.getItem('saveFile'));
    Game.scene.score = file.score;
    Game.scene.visits = file.visits;
};
// ##################"

Game.updateScore = function(increment){
    // Updates the score and stores the new value in the localStorage
    Game.scene.score += increment;
    Game.scene.scoreTxt.setText(Game.scene.score);
    localStorage.setItem('score',Game.scene.score);
};

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game',
    scene: [Game]
};

var game = new Phaser.Game(config);
