function write(text){
    console.log(text);
}

function isKeyPressed(key) {
    return sketch.isKeyPressed(key);
}

function getImage(path){
    var img = new Image();
    img.src = path;
    return img;
}

function image(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight){
    if(typeof dHeight !== "undefined"){
        sketch.partOfImage({img: img, sx: sx, sy: sy, sWidth: sWidth, sHeight: sHeight, dx: dx, dy: dy, dWidth: dWidth, dHeight: dHeight});
    }else if(typeof sHeight !== "undefined"){
        sketch.resizedImage({img: img, x: sx, y: sy, width: sWidth, height: sHeight});
    }else{
        sketch.image({img: img, x: sx, y: sy});
    }
}

const homeIcon = {  x: 5,  y: 5,   width: 30,   height: 30,  icon: getImage("Engine/homeIcon.png")  };
const homeLabel = { x: 5,  y: 50,  width: 260,   height: 80,  icon: getImage("Engine/homeLabel.png") };
const saveIcon = {  x: 5,  y: 40,  width: 30,   height: 30,  icon: getImage("Engine/saveIcon.png")   };
const saveLabel = { x: 5,  y: 140,  width: 70,   height: 70,  icon: getImage("Engine/saveLabel.png")   };
const loadIcon = {  x: 5,  y: 75,  width: 30,   height: 30,  icon: getImage("Engine/loadIcon.png")   };
const loadLabel = { x: 85, y: 140,  widht: 70,   height: 70,  icon: getImage("Engine/loadLabel.png")   };

function save(name, variable){
    localStorage.setItem(name, JSON.stringify(variable));
}

function load(name, variable){
    variable = JSON.parse(localStorage.getItem(name));
}

function deleteData(){
    localStorage.clear();
}

function rotatedMove(speed, angle, xOutput, yOutput){
    xOutput = speed * Math.cos(angle / 180 * Math.PI);
    yOutput = speed * Math.sin(angle / 180 * Math.PI);
}

function variableSwitch(boolean){
    if(boolean == true){   boolean = false    }else{   boolean = true    };
}