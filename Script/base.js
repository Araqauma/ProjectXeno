//Main constants
const canvasWidth = innerWidth - 20;
const canvasHeight = innerHeight - 20;

//Arrays
var groundLevel = new Array (5);
groundLevel[0] = [-40];                         //X axis
groundLevel[1] = [canvasHeight-80];             //Y axis
groundLevel[2] = [1];                           //Detail
groundLevel[3] = [Infinity];                    //Detail HP
groundLevel[4] = [round(random(-9000,-20000))]; //Detail regeneration
var enemies = new Array (6);
enemies[0] = [];                                //X axis
enemies[1] = [];                                //Y axis
enemies[2] = [];                                //X speed
enemies[3] = [];                                //Y speed
enemies[4] = [60];                              //HP
enemies[5] = [8];                               //Death timer
var weapon = new Array (10);
weapon[0] = true;                               //Basic laser
weapon[1] = false;                              //Gauss pistol
weapon[2] = false;                              //Gauss rifle
var projectiles = new Array (3);
projectiles[0] = [];                            //Projectile X axis
projectiles[1] = [];                            //Projectile Y axis
projectiles[2] = [];                            //Projectile angle
var menuParticles = new Array (3);
menuParticles[0] = [];                          //Particle X
menuParticles[1] = [];                          //Particle Y
menuParticles[2] = [0];                         //Particle timer

//Imagery
const ground = getImage("Imagery/ground.png");
const tunnel = getImage("Imagery/tunnel.png");
const mountains = getImage("Imagery/mountains.png");
const moon = getImage("Imagery/moon.png");
const sun = getImage("Imagery/sun.png");
const space = getImage("Imagery/Space.png");
const XSS = getImage("Imagery/XSS.png");
const highAlt = getImage("Imagery/high-alt.png");
const parachuteCutscene = getImage("Imagery/parachute.png");
const module = getImage("Imagery/Module.png");
const grass = getImage("Imagery/grass.png");
const tree1 = getImage("Imagery/tree1.png");
const tree2 = getImage("Imagery/tree2.png");
const crystal = getImage("Imagery/cyanite.png");
const backpack = getImage("Imagery/backpack.png");
const bloon = getImage("Imagery/bloon.png");
const bloonDeath = getImage("Imagery/bloonDeath.png");
const laserSplash = getImage("Imagery/laserMining.png");
const projectileImage = getImage("Imagery/projectile.png");

var player = [getImage("Imagery/Player/playerOriginal.png"), getImage("Imagery/Player/playerCrimson.png"), getImage("Imagery/Player/playerHazmat.png")];
var playerRun1 = [getImage("Imagery/Player/playerOriginalRun1.png"), getImage("Imagery/Player/playerCrimsonRun1.png"), getImage("Imagery/Player/playerHazmatRun1.png")];
var playerRun2 = [getImage("Imagery/Player/playerOriginalRun2.png"), getImage("Imagery/Player/playerCrimsonRun2.png"), getImage("Imagery/Player/playerHazmatRun2.png")];

const laserRifle = getImage("Imagery/laserRifle.png");
const gaussHandgun = getImage("Imagery/gaussHandgun.png");
const gaussRifle = getImage("Imagery/gaussSniper.png");

const biomassIcon = getImage("Imagery/biomassIcon.png");
const cyaniteIcon = getImage("Imagery/cyaniteIcon.png");
const basicLaserIcon = getImage("Imagery/laserBasic.png");
const craftRepair = getImage("Imagery/craftRepair.png");
const craftGPistol = getImage("Imagery/gaussPistol.png");
const craftGRifle = getImage("Imagery/gaussRifle.png");
const craftGAmmo = getImage("Imagery/gaussAmmo.png");

const editorLabel = {  x: 175,  y: 140,  width: 70,  height: 70,  icon: getImage("Imagery/Player/editorLabel.png")  };
const editorScreen = {  x: 40,  y: 240,  width: 140,  height: 140,  icon: getImage("Imagery/Player/editorScreen.png")  };
const editorArrow = {  x1: 10,  x2: 190,  y: 290,  width: 20,  height: 20,  icon: getImage("Imagery/Player/changeFrame.png")  };
var hotbar = [basicLaserIcon, craftGPistol, craftGRifle];

//Audio
const descent = new Audio("Audio/Descent.wav");
const landing = new Audio("Audio/Landing.wav");
const gPistolSound = new Audio("Audio/GaussPistolShot.wav");
const treeFall = new Audio("Audio/treeFall.wav");

//Variables
var start = false;
var cutscene = false;
var home = false;
var editor = false;
var character = 0;
var charlck = false;

var walk = 0;
var run = 0;
var jump = 0;
var jumpLock = false;
const leftSide = 0;
const rightSide = leftSide + canvasWidth;
const middle = canvasWidth / 2;
var playerX = middle;
var playerY = groundLevel[1][0] - 38;
const playerGround = playerY;
var playerHP = 100;
var openBackpack = false;
var backpackLock = false;
var backpackTimer = 0;
var drill = true;
var drillSpeed = 1;
const projectileSpeed = 10;
var laserSplashRepeat = 0;
var craftLock = false;
var enemyMove = 2.5;
var enemyTimer = 4200;
var equipWeapon = 0;

var cyanite = 0;
var biomass = 0;

var ammo = {    gauss: 0    };
var weaponCooldown = 0;

var frames = 0;
var cutsceneSlider = 0;
var cutsceneSliderMove = canvasHeight / 100;
var cutsceneSlide = 0;
var cutsceneTime = 0;
//Canvas
draw = function(){
    if(start == false){
        backgroundTheme();
        menu();

        image(loadIcon.icon, loadIcon.x, loadIcon.y, loadIcon.width, loadIcon.height);
        if(mouseIsPressed && (mouseX > saveIcon.x && mouseX < saveIcon.x + saveIcon.width && mouseY > saveIcon.y && mouseY < saveIcon.y + saveIcon.height)){    loadPreset();   }
        image(saveIcon.icon, saveIcon.x, saveIcon.y, saveIcon.width, saveIcon.height); 
        if(mouseIsPressed && (mouseX > loadIcon.x && mouseX < loadIcon.x + loadIcon.width && mouseY > loadIcon.y && mouseY < loadIcon.y + loadIcon.height)){    savePreset();   }
    }else if(cutscene == true){
        if(cutsceneSlide == 0){
            descent.play();
            image(XSS, 0, 0, canvasWidth, canvasHeight);
            fill(0);
            noStroke();
            rect(0, 0, canvasWidth, cutsceneSlider);
            fill(255);
            textSize(52);
            centeredText("PROJECT XENO", canvasWidth / 2, cutsceneSlider - canvasHeight / 2);
            if(performance.now() - cutsceneTime > 2000){
                cutsceneSlider += cutsceneSliderMove;
                if(cutsceneSlider > canvasHeight){
                    cutsceneTime = Infinity;
                    cutsceneSliderMove = -cutsceneSliderMove;
                    cutsceneSlide++;
                }
            }
        }else if(cutsceneSlide == 1){
            image(highAlt, 0, 0, canvasWidth, canvasHeight);
            fill(0);
            noStroke();
            rect(0, 0, canvasWidth, cutsceneSlider);
            if(cutsceneSliderMove < 0 && cutsceneSlider > 0){
                cutsceneSlider += cutsceneSliderMove;
                fill(255);
                textSize(52);
                centeredText("PROJECT XENO", canvasWidth / 2, cutsceneSlider - canvasHeight / 2);
            }else if(cutsceneSliderMove < 0 && cutsceneSlider < 0 && cutsceneTime == Infinity){
                cutsceneTime = performance.now();
            }
            if(performance.now() - cutsceneTime > 2000){
                if(cutsceneSliderMove < 0){
                    cutsceneSliderMove = -cutsceneSliderMove;
                }
                cutsceneSlider += cutsceneSliderMove;
                fill(255);
                textSize(52);
                centeredText("DEVELOPED BY ARAQAUMA", canvasWidth / 2, cutsceneSlider - canvasHeight / 2);
                if(cutsceneSlider > canvasHeight){
                    cutsceneTime = Infinity;
                    cutsceneSliderMove = -cutsceneSliderMove;
                    cutsceneSlide++;
                }
            }
        }else if(cutsceneSlide == 2){
            image(parachuteCutscene, 0, 0, canvasWidth, canvasHeight);
            fill(0);
            noStroke();
            rect(0, 0, canvasWidth, cutsceneSlider);
            if(cutsceneSliderMove < 0 && cutsceneSlider > 0){
                cutsceneSlider += cutsceneSliderMove;
                fill(255);
                textSize(52);
                centeredText("DEVELOPED BY ARAQAUMA", canvasWidth / 2, cutsceneSlider - canvasHeight / 2);
            }else if(cutsceneSliderMove < 0 && cutsceneSlider < 0 && cutsceneTime == Infinity){
                cutsceneTime = performance.now();
            }
            if(performance.now() - cutsceneTime > 2000){
                if(cutsceneSliderMove < 0){
                    cutsceneSliderMove = -cutsceneSliderMove;
                }
                cutsceneSlider += cutsceneSliderMove;
                fill(255);
                textSize(52);
                centeredText("THANK YOU FOR PLAYING", canvasWidth / 2, cutsceneSlider - canvasHeight / 2);
                if(cutsceneSlider > canvasHeight){
                    landing.play();
                    cutsceneTime = Infinity;
                    cutsceneSlide++;
                }
            }
        }else{
            cutscene = false;
        }
    }else if(home){
        homeScreen();
        image(editorScreen.icon, editorScreen.x, editorScreen.y, editorScreen.width, editorScreen.height);
        image(editorArrow.icon, editorArrow.x2, editorArrow.y, editorArrow.width, editorArrow.height);
        if(mouseIsPressed && (mouseX > editorArrow.x2 && mouseX < editorArrow.x2 + editorArrow.width && mouseY > editorArrow.y && mouseY < editorArrow.y + editorArrow.height)){
            if(character < 2 && charlck == false){
                character++;
                charlck = true;
            } 
        }
        rotatedImage(editorArrow.icon, editorArrow.x1, editorArrow.y, 180, editorArrow.width, editorArrow.height);
        if(mouseIsPressed && (mouseX > editorArrow.x1 && mouseX < editorArrow.x1 + editorArrow.width && mouseY > editorArrow.y && mouseY < editorArrow.y + editorArrow.height)){
            if(character > 0 && charlck == false){
                character--;
                charlck = true;
            } 
        }
        if(charlck == true && mouseIsPressed == false){
            charlck = false;
        }
        image(player[character], editorScreen.x + 30, editorScreen.y + 30, 80, 90);
        /*if(character == 0){
            player = getImage("Imagery/Player/playerOriginal.png");
            playerRun1 = getImage("Imagery/Player/playerOriginalRun1.png");
            playerRun2 = getImage("Imagery/Player/playerOriginalRun2.png");
        }else if(character == 1){
            player = getImage("Imagery/Player/playerCrmson.png");
            playerRun1 = getImage("Imagery/Player/playerCrmsonRun1.png");
            playerRun2 = getImage("Imagery/Player/playerCrmsonRun2.png");
        }else{
            player = getImage("Imagery/Player/playerHazmat.png");
            playerRun1 = getImage("Imagery/Player/playerHazmatRun1.png");
            playerRun2 = getImage("Imagery/Player/playerHazmatRun2.png");
        }*/
    }else{
        backgroundTheme();
        drawProjectile();
        updateProjectile(projectileSpeed);
        drawGround();
        newGround();
        updateHeight();
        updateEnemy();
        drawEnemy();

        //Health bar
        bar(canvasWidth-250, 20, 200, 20, playerHP * 2, 220, 220, 220);
        fill(40, 40, 40);
        textSize(12);
        centeredText("SUIT INTEGRITY", canvasWidth - 150, 35);
        
        //Movement
        if(isKeyPressed("d")){
            walk = 2;
            updateGround();
            if(run < 5){
                image(playerRun1[character], playerX, playerY);
                run++;
            }else{
                image(playerRun2[character], playerX, playerY);
                run++;
                if(run == 10){
                    run = 0;
                }
            }
        }else if(isKeyPressed("a") && groundLevel[0][0] < -40){
            walk = -2;
            updateGround();
            if(run < 5){
                image(playerRun1[character], playerX, playerY);
                run++;
            }else{
                image(playerRun2[character], playerX, playerY);
                run++;
                if(run == 10){
                    run = 0;
                }
            }
        }else if(isKeyPressed("a") && groundLevel[0][0] == -40){
            walk = -2;
            if(run < 5){
                image(playerRun1[character], playerX, playerY);
                run++;
            }else{
                image(playerRun2[character], playerX, playerY);
                run++;
                if(run == 10){
                    run = 0;
                }
            }
        }else{
            walk = 0;
            image(player[character], playerX, playerY);
        }

        if(isKeyPressed(" ") && jumpLock == false){
            jump = -5;
            jumpLock = true;
        }
        
        if(playerGround != playerY){
            jump += 0.5;
            if(playerY > playerGround){
                jump = 0;
                playerY = playerGround;
                jumpLock = false;
            }
        }

        playerY += jump;

        if(isKeyPressed("0")){
            equipWeapon = 0;
        }else if(isKeyPressed("1") && weapon[1] == true){
            equipWeapon = 1;
        }else if(isKeyPressed("2") && weapon[2] == true){
            equipWeapon = 2;
        }

        //Attacks
        if(mouseIsPressed && equipWeapon == 0){
            laserAttack();
            mine();
        }
        if(mouseIsPressed && ammo.gauss > 0 && equipWeapon == 1){
            if(performance.now() - weaponCooldown > 350){
                attack(gaussHandgun);
                gPistolSound.playbackRate = 2;
                gPistolSound.play();
                ammo.gauss--;
                weaponCooldown = performance.now();
            }else{
                baseX = playerX + player.width / 2 - 15;
                baseY = playerY + 18;
                gunImageAngle = Math.atan((baseY - mouseY) / (baseX - mouseX)) * 180 / Math.PI;
                rotatedImage(gaussHandgun, baseX, baseY, gunImageAngle, 30, 15);
            }
        }
        if(mouseIsPressed && ammo.gauss > 0 && equipWeapon == 2){
            if(performance.now() - weaponCooldown > 800){
                attack(gaussRifle);
                gPistolSound.play();
                ammo.gauss--;
                weaponCooldown = performance.now();
            }else{
                baseX = playerX + player.width / 2 - 10;
                baseY = playerY + 18;
                gunImageAngle = Math.atan((baseY - mouseY) / (baseX - mouseX)) * 180 / Math.PI;
                rotatedImage(gaussRifle, baseX, baseY, gunImageAngle, 30, 15);
            }
        }

        if(equipWeapon == 1){
            didItHit(15);
        }else if(equipWeapon == 2){
            didItHit(40);
        }

        //Enemies
        if(enemyTimer <= 0 && groundLevel[0][0] < -100){
            newEnemy();
            enemyTimer = round(random(800,1600));
        }else{
            if(home == false){
                enemyTimer--;
            }
        }

        if(playerHP <= 0){
            playerHP = 0;
            alert("You died. Press OK and reload the page to start again.");
        }

        //Interface
        backpackHUD();

        if(cutsceneSlider > 0){
            fill(0);
            rect(0, 0, canvasWidth, cutsceneSlider);
            fill(255);
            textSize(52);
            centeredText("THANK YOU FOR PLAYING", canvasWidth / 2, cutsceneSlider - canvasHeight / 2);
            cutsceneSlider -= cutsceneSliderMove;
        }
    } 
}
