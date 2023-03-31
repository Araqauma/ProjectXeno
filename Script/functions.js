var index = 0;


//xSpeed = speed * Math.cos(Math.atan(deltaY / deltaX) * 180 * Math.PI)

function authors(){
    var textsize = 42;
    var textY = canvasHeight;
    var lastTextY = canvasHeight;

    backgroundChange(3);
    background(bckg, bckg, bckg);
    fill(200,200,200);
    textSize(textsize);
    text("The End",40,textY);
    text("",40,textY+100);
    text("Created by Jakub Vavroušek",40,textY+150);
    lastTextY=textY+250;
    text("Thank you for playing!",40,lastTextY);
    textY-=2;
}

function destructBar(x,y,length,height,bar){
    noStroke();
    fill(250,180,40);
    rect(x,y,bar,height);
    
    noFill();
    stroke(250,250,250);
    strokeWeight(1);
    rect(x,y,length,height);

    fill(250,250,250);
    textSize(16);
    text("SELF-DESTRUCT",x-12,y+40);
}

function bar(x,y,length,height,bar,r,g,b){
    noStroke();
    fill(r,g,b);
    rect(x,y,bar,height);
    
    noFill();
    stroke(10,10,10);
    strokeWeight(1);
    rect(x,y,length,height);
}

function dial(x,y,size,text){
    var r = size/2.15

    fill(20,20,20);
    rotatedMove(r,rotation);
    ellipse(x,y,size,size);
    line(x,y,x+xSpeed,y+ySpeed);
    fill(200,200,200);
    textSize(12);
    centeredText(text,x,y+size/4);
}

function box(text, x, y, size){
    fill(70, 70, 70);
    stroke(210, 210, 210);
    strokeWeight(1);
    rect(x, y, size, size);
    fill(210, 210, 210);
    textSize(10);
    centeredText(text, x + size / 2, y + size - 1);
}

function panel(y,r,g,b){
    noStroke();
    fill(r,g,b);
    triangle(canvasWidth/6,y,canvasWidth/6,y+50,canvasWidth/6+80,y+50);
    triangle(canvasWidth/6*5,y,canvasWidth/6*5,y+50,canvasWidth/6*5-80,y+50);
    rect(0,y,canvasWidth/6+2,canvasHeight-y);
    rect(canvasWidth/6*5-2,y,canvasWidth/6+4,canvasHeight-y);
    rect(canvasWidth/6,y+48,canvasWidth/3*2,canvasHeight-y-46);

    stroke(200,200,200);
    strokeWeight(4);
    line(0,y,canvasWidth/6,y);
    line(canvasWidth/6,y,canvasWidth/6+80,y+50);
    line(canvasWidth/6+80,y+50,canvasWidth/6*5-80,y+50);
    line(canvasWidth/6*5-80,y+50,canvasWidth/6*5,y);
    line(canvasWidth/6*5,y,canvasWidth,y);
}

function launchButton(x,y,length,height){
    fill(0,0,0);
    stroke(250,250,250);
    strokeWeight(2);
    rect(x - length / 2,y + height / 2, length, height);
    
    fill(250,250,250);
    textSize(44);
    text("LAUNCH",x-length/2.2,y+50+height/2);

    if(mouseIsPressed && mouseX >= x && mouseX <= x+length && mouseY >= y && mouseY <= y+height){
        menu = false;
    }
}

function menu(){
    background(0, 0, 0);
    image(XSS ,0, 0, canvasWidth, canvasHeight);
    fill(250);
    centeredText("PRESS SPACE TO START", canvasWidth / 2, canvasHeight - 100);

    if(menuParticles[2] == 0){
        if(performance.now() < 400){
            menuParticles[0].push(round(random(10, canvasWidth)));
        }else{
            menuParticles[0].push(canvasWidth + 10);
        }
        menuParticles[1].push(round(random(0, canvasHeight)));
        menuParticles[2] = 3;
    }else{
        menuParticles[2]--;
    }

    for(var i = 0; i < menuParticles[0].length; i++){
        menuParticles[0][i] -= 5;
    }
    for(var i = 0; i < menuParticles[0].length; i++){
        if(menuParticles[0][i] < canvasWidth + 10 && menuParticles[0][i] > -10){
            image(projectileImage, menuParticles[0][i], menuParticles[1][i]);
        }
    }
    if(performance.now() < 250){
        slider = canvasHeight;
    }else{
        slider -= 5;
    }
    fill(0);
    rect(0, 0, canvasWidth, slider);

    if(isKeyPressed(" ")){
        start = true;
        cutscene = true;
    }
}

function backgroundTheme(){
    var daytime = 180;
    var nighttime = 60;
    if(performance.now() < 20000){
        midtime = 0;
        time = 0;
    }
    if(performance.now() - time < 600000){
        background(90, 120, daytime);
        image(sun, (performance.now() - time) * (canvasWidth / 510000) - 60, 100);
    }else if(performance.now() - time < 600500){
        midtime = performance.now();
    }else if(performance.now() - time < 1000000){
        background(nighttime, nighttime, nighttime);
        image(moon, (performance.now() - midtime) * (canvasWidth / 400000), 100);
    }else{
        time = performance.now();
    }
    image(mountains, 0, 0, canvasWidth, canvasHeight);
}

function newProjectile(){
    baseX = playerX + player.width / 2;
    baseY = playerY + 20;
    gunAngle = Math.atan((baseY - mouseY) / (baseX - mouseX));

    projectiles[0].push(baseX);
    projectiles[1].push(baseY);
    projectiles[2].push(gunAngle);
}

function updateProjectile(speed){
    for(var i = 0; i < projectiles[0].length; i++){
        if(projectiles[0][i] < canvasWidth && projectiles[0][i] > 0 && projectiles[1][i] < canvasHeight && projectiles[1][i] > 0){
            projectiles[0][i] += speed * Math.cos(projectiles[2][i]);
            projectiles[1][i] += speed * Math.sin(projectiles[2][i]);
        }
    }
}

function drawProjectile(){
    for(var i = 0; i < projectiles[0].length; i++){
        if(projectiles[0][i] < canvasWidth && projectiles[0][i] > 0 && projectiles[1][i] < canvasHeight && projectiles[1][i] > 0){
            image(projectileImage, projectiles[0][i], projectiles[1][i]);
        }
    }
}

function didItHit(damage){
    for(var i = 0; i < enemies[0].length; i++){
        for(var j = 0; j < projectiles[0].length; j++){
            if(projectiles[0][j] > enemies[0][i] && projectiles[0][j] < enemies[0][i] + 100 && projectiles[1][j] > enemies[1][i] && projectiles[1][j] < enemies[1][i] + 160){
                projectiles[0][j] = NaN;
                projectiles[1][j] = NaN;
                projectiles[2][j] = NaN;

                enemies[4][i] -= damage;
                write(enemies[4][i]);
            }
        }
    }
}

function newEnemy(){
    enemies[0].push(canvasWidth+100);
    enemies[1].push(round(random(100,canvasHeight-200)));
    enemies[2].push(NaN);
    enemies[3].push(NaN);
    enemies[4].push(round(random(40,80)));
    enemies[5].push(8);
}

function updateEnemy(){
    for(var i = 0; i < enemies[0].length; i++){
        enemies[2][i] = enemyMove * Math.cos((Math.atan((playerY - enemies[1][i]) / (enemies[0][i] - playerX))) * 180 / Math.PI);
        enemies[3][i] = enemyMove * Math.sin((Math.atan((playerY - enemies[1][i]) / (enemies[0][i] - playerX))) * 180 / Math.PI);
        if(enemies[0][i] < playerX && enemies[4][i] > 0){
            enemies[0][i] += enemies[2][i] - walk;
        }else if(enemies[0][i] > playerX && enemies[4][i] > 0){
            enemies[0][i] -= enemies[2][i] + walk;
        }
        if(enemies[1][i] < playerY && enemies[4][i] > 0){
            enemies[1][i] += enemies[3][i];
        }else if(enemies[1][i] > playerY && enemies[4][i] > 0){
            enemies[1][i] -= enemies[3][i];
        }

        if(enemies[0][i] < playerX + 30 && enemies[0][i] > playerX - 10){
            if(enemies[4][i] > 0){
                playerHP -= 40;
            }
            enemies[4][i] = 0;
        }
    }
}

function drawEnemy(){
    for(var i = 0; i < enemies[0].length; i++){
        if(enemies[0][i] > -100 && enemies[0][i] < canvasWidth + 100){
            if(enemies[4][i] > 0){
                image(bloon,enemies[0][i],enemies[1][i],40,60);
            }else if(enemies[5][i] > 0){
                image(bloonDeath,enemies[0][i],enemies[1][i],70,70);
                enemies[5][i]--;
            }else{
                enemies[0][i] = NaN;
                enemies[1][i] = NaN;
                enemies[2][i] = NaN;
                enemies[3][i] = NaN;
                enemies[4][i] = NaN;
                enemies[5][i] = NaN;
            } 
        }
    }
}

function newGround(){
    while(groundLevel[0][index] < rightSide + 10 && index <= 20){
        groundLevel[0].push(groundLevel[0][index] + 40);
        groundLevel[1].push(groundLevel[1][index]);
        groundLevel[2].push(round(random(0,10)));
        index++;
        groundLevel[3].push(Infinity);
    }
    while(groundLevel[0][index] < rightSide + 10 && index > 20){
        groundLevel[0].push(groundLevel[0][index] + 40);
        groundLevel[1].push(groundLevel[1][index] + round(random(-10,10)));
        groundLevel[2].push(round(random(0,40)));
        index++;
        if(groundLevel[2][index] <= 28){
            groundLevel[3].push(10);
        }else if(groundLevel[2][index] <= 35){
            groundLevel[3].push(120);
        }else{
            groundLevel[3].push(120);
        }
    }
}

function updateGround(){
    for(var i = 0; i < groundLevel[0].length; i++){
        groundLevel[0][i] -= walk;
    }
}

function drawGround(){
    image(tunnel, groundLevel[0][0], groundLevel[1][0] - 392, 400, 400);
    for(var i = 0; i < groundLevel[0].length; i++){
        if(groundLevel[0][i] < rightSide + 40){
            image(ground,groundLevel[0][i],groundLevel[1][i]);
            if(groundLevel[2][i] <= 28){
                if(groundLevel[3][i] > 0){
                image(grass,groundLevel[0][i],groundLevel[1][i]-grass.height + 8);
                }
            }else if(groundLevel[2][i] <= 35){
                if(groundLevel[3][i] > 0){
                    if(groundLevel[2][i] >= 32){
                        image(tree2,groundLevel[0][i],groundLevel[1][i]-tree2.height + 8);
                    }else{
                        image(tree1,groundLevel[0][i],groundLevel[1][i]-tree1.height + 8);
                    }
                }
            }else{
                if(groundLevel[3][i] > 0){
                image(crystal,groundLevel[0][i],groundLevel[1][i]-crystal.height + 8);
                }
            }
        }
    }
}

function updateHeight(){
    for(var i = 0; i < groundLevel[0].length; i++){
        if(groundLevel[0][i] < playerX && groundLevel[0][i] + 50 > playerX){
            var groundLevelChange = groundLevel[1][i]
            for(var j = 0; j < groundLevel[0].length; j++){
                groundLevel[1][j] -= groundLevelChange - playerGround - 38;
            }
        }
    }
}

function mine(){
    for(var i = 0; i < groundLevel[0].length; i++){
        if(mouseIsPressed && drill == true && (mouseX > groundLevel[0][i] && mouseX < groundLevel[0][i] + 50 && mouseY < groundLevel[1][i] + 8 && mouseY > groundLevel[1][i] - 7) && Math.abs(mouseX - playerX) < 80){
            if(groundLevel[3][i] > 0){
                groundLevel[3][i] -= drillSpeed;
                laser(220,230,240);
            }else if(groundLevel[2][i] != NaN){
                if(groundLevel[2][i] <= 28){                //Grass
                    biomass += round(random(0,1));
                }else if(groundLevel[2][i] <= 35){          //Tree
                    biomass += round(random(5,20));
                    cyanite += round(random(2,6));
                    treeFall.play();
                }else if(groundLevel[2][i] > 35){           //Cyanite
                    cyanite += round(random(8,16));
                }
                groundLevel[2][i] = NaN;
                groundLevel[3][i] = NaN;
            }
            
        } 
    }
}

function laser(r,g,b){
    baseX = playerX + player.width / 2;
    baseY = playerY + 20;
    x = baseX + 15 * Math.cos(Math.atan((baseY - mouseY) / (baseX - mouseX)));
    y = baseY + 15 * Math.sin(Math.atan((baseY - mouseY) / (baseX - mouseX)));
    gunAngle = Math.atan((baseY - mouseY) / (baseX - mouseX)) * 180 / Math.PI;

    stroke(r,g,b);
    fill(r,g,b);
    rotatedImage(laserRifle, baseX - 12, baseY - 3, gunAngle);
    line(x,y,mouseX,mouseY);
    ellipse(mouseX,mouseY,3,3);
    if(laserSplashRepeat == 0){
        image(laserSplash, mouseX - 5, mouseY - 5);
        laserSplashRepeat = 2;
    }else{
        laserSplashRepeat--;
    }
}

function laserAttack(){
    for(var i = 0; i < enemies[0].length; i++){
        xDistance = enemies[0][i] - playerX;
        yDistance = playerY - enemies[1][i];
        distance = Math.abs(Math.sqrt(xDistance*xDistance + yDistance*yDistance));
        if(mouseIsPressed && (mouseX > enemies[0][i] && mouseX < enemies[1][i] + 50 && mouseY > enemies[1][i] && mouseY < enemies[1][i] + 70) && distance < 260){
            if(enemies[4][i] > 0){
                enemies[4][i] -= drillSpeed;
            }
            laser(220,230,240);
        }
    }
}

function attack(weapon){
    baseX = playerX + player.width / 2 - 15;
    baseY = playerY + 18;
    gunImageAngle = Math.atan((baseY - mouseY) / (baseX - mouseX)) * 180 / Math.PI;

    rotatedImage(weapon, baseX, baseY, gunImageAngle, 30, 15);
    newProjectile();
}

function homePreset(){
    image(homeIcon.icon, homeIcon.x, homeIcon.y, homeIcon.width, homeIcon.height);
    if((mouseIsPressed && (mouseX > homeIcon.x && mouseX < homeIcon.x + homeIcon.width && mouseY > homeIcon.y && mouseY < homeIcon.y + homeIcon.height)) || isKeyPressed("Escape")){
        home = true
    }

}

function homeScreen(){
    background(0);
    image(homeLabel.icon, homeLabel.x, homeLabel.y, homeLabel.width, homeLabel.height);
    if(mouseIsPressed && (mouseX > homeLabel.x && mouseX < homeLabel.x + homeLabel.width && mouseY > homeLabel.y && mouseY < homeLabel.y + homeLabel.height)){
        home = false;
    }
    image(saveLabel.icon, saveLabel.x, saveLabel.y, saveLabel.width, saveLabel.height);
    if(mouseIsPressed && (mouseX > saveLabel.x && mouseX < saveLabel.x + saveLabel.width && mouseY > saveLabel.y && mouseY < saveLabel.y + saveLabel.height)){
        savePreset();
        fill(255);
        textSize(12);
        centeredText("Progress saved!", saveLabel.x + saveLabel.width / 2, saveLabel.y + saveLabel.height + 15);
    }
    image(loadLabel.icon, loadLabel.x, loadLabel.y, loadLabel.width, loadLabel.height);
    if(mouseIsPressed && (mouseX > loadLabel.x && mouseX < loadLabel.x + loadLabel.width && mouseY > loadLabel.y && mouseY < loadLabel.y + loadLabel.height)){
        loadPreset();
        fill(255);
        textSize(12);
        centeredText("Progress loaded!", loadLabel.x + loadLabel.width / 2, loadLabel.y + loadLabel.height + 15);
    }
    /*image(editorLabel.icon, editorLabel.x, editorLabel.y, editorLabel.width, editorLabel.height);
    if(mouseIsPressed && (mouseX > editorLabel.x && mouseX < editorLabel.x + editorLabel.width && mouseY > editorLabel.y && mouseY < editorLabel.y + editorLabel.height)){
        editor = true;
    }*/
}

function loadPreset(){
    load("weapons", weapon);
    load("cyanite", cyanite);
    load("biomass", biomass);
    load("ground", groundLevel);
    load("playerHP", playerHP);
}

function savePreset(){
    save("weapons", weapon);
    save("cyanite", cyanite);
    save("biomass", biomass);
    save("ground", groundLevel);
    save("playerHP", playerHP);
}

function backpackHUD(){
    if(openBackpack == true){
        image(backpack, 50, 20, 500, 500);
        fill(230, 230, 230);
        stroke(5, 5, 5);
        textSize(10);
        homePreset();
        image(loadIcon.icon, loadIcon.x, loadIcon.y, loadIcon.width, loadIcon.height);
        loadPreset();
        image(saveIcon.icon, saveIcon.x, saveIcon.y, saveIcon.width, saveIcon.height); 
        savePreset();

        //Variables
        iconSize = 50;
        collumnA = 60;
        rowA = 50;

        collumnB = collumnA + 60;
        rowB = rowA + 55;
        collumnC = collumnB + 60;
        rowC = rowB + 80;
        rowD = rowC + 70;
        rowE = rowD + 70;

        lineX = 490;
        lineA = 60;
        lineB = 75;
        lineC = 90;

        //Inventory
        image(cyaniteIcon, collumnA, rowC, iconSize, iconSize);
        centeredText(cyanite + "x", collumnA + iconSize / 2, rowC + iconSize + 10);
        image(biomassIcon, collumnB, rowC, iconSize, iconSize);
        centeredText(biomass + "x", collumnB + iconSize / 2, rowC + iconSize + 10);
        if(weapon[0] == true){
            image(basicLaserIcon, collumnA, rowD, iconSize, iconSize);
        }

        //Crafting
        image(craftRepair, collumnA, rowA, iconSize, iconSize);
        if(mouseX > collumnA && mouseX < collumnA + iconSize && mouseY > rowA && mouseY < rowA + iconSize){
            centeredText("BIOMASS 20x", lineX, lineA);
            centeredText("CYANITE 10x", lineX, lineB);
            if(craftLock == false && mouseIsPressed){
                if(biomass >= 20 && cyanite >= 10){
                    if(playerHP < 100){
                        playerHP += 20;
                        biomass -= 20;
                        cyanite -= 10;
                    }
                    if(playerHP > 100){
                        playerHP = 100;
                    }
                }
                craftLock = true;
            }else if(craftLock == true && mouseIsPressed == false){
                craftLock = false;
            }
        }
        if(weapon[1] != true){
            image(craftGPistol, collumnA, rowB, iconSize, iconSize);
            if(mouseX > collumnA && mouseX < collumnA + iconSize && mouseY > rowB && mouseY < rowB + iconSize){
                centeredText("BIOMASS 20x", lineX, lineA);
                centeredText("CYANITE 80x", lineX, lineB);
                if(craftLock == false && mouseIsPressed){
                    if(biomass >= 20 && cyanite >= 80){
                        weapon[1] = true;
                        biomass -= 20;
                        cyanite -= 80;
                    }
                    craftLock = true;
                }else if(craftLock == true && mouseIsPressed == false){
                    craftLock = false;
                }
            }
        }else{
            image(craftGPistol, collumnB, rowD, iconSize, iconSize);
            //centeredText("Gauss Pistol", collumnB, canvasHeight / 6 + 170);
        }
        if(weapon[2] != true){
            image(craftGRifle, collumnB, rowB, iconSize, iconSize);
            if(mouseX > collumnB && mouseX < collumnB + iconSize && mouseY > rowB && mouseY < rowB + iconSize){
                centeredText("BIOMASS 60x", lineX, lineA);
                centeredText("CYANITE 160x", lineX, lineB);
                if(craftLock == false && mouseIsPressed){
                    if(biomass >= 60 && cyanite >= 160){
                        weapon[2] = true;
                        biomass -= 60;
                        cyanite -= 160;
                    }
                    craftLock = true;
                }else if(craftLock == true && mouseIsPressed == false){
                    craftLock = false;
                }
            }
        }else{
            image(craftGRifle, collumnC, rowD, iconSize, iconSize);
        }
        image(craftGAmmo, collumnB, rowA, iconSize, iconSize);
        image(craftGAmmo, collumnB, rowE, iconSize, iconSize);
        centeredText(ammo.gauss + "x", collumnB + iconSize / 2, rowE + iconSize + 10);
        if(mouseX > collumnB && mouseX < collumnB + iconSize && mouseY > rowA && mouseY < rowA + iconSize){
            centeredText("BIOMASS 5x", lineX, lineA);
            centeredText("CYANITE 10x", lineX, lineB);
            if(craftLock == false && mouseIsPressed){
                if(biomass >= 5 && cyanite >= 10){
                    ammo.gauss += 10;
                    cyanite -= 10;
                    biomass -= 5;
                }
                craftLock = true;
            }else if(craftLock == true && mouseIsPressed == false){
                craftLock = false;
            }
        }
    }else{
        for(var i = 0; i < weapon.length; i++){
            var x = 40;
    
            if(weapon[i] == true){
                fill(20, 20, 20);
                textSize(60);
                centeredText(i, x + i * 60 + 25, 55);
                image(hotbar[i], x + i * 60, 10, 50, 50);
                if(equipWeapon == i){
                    stroke(20, 20, 20);
                    strokeWeight(6);
                    line(x + i * 60 + 5, 65, x + i * 60 + 45, 65);
                }
            }
        }
    }

    if(isKeyPressed("i") && openBackpack == false && backpackLock == false){
        openBackpack = true;
        backpackLock = true;
    }else if(isKeyPressed("i") && openBackpack == true && backpackLock == false){
        openBackpack = false;
        backpackLock = true;
    }

    if(backpackLock == true){
        if(backpackTimer == 30){
            backpackTimer = 0;
            backpackLock = false;
        }else{
            backpackTimer++;
        }
    }
}