const canvas = document.getElementById('pixiCanvas');
let count = document.getElementById('figureCount');
let areaTaken = document.getElementById('areaTaken');
let incGravity = document.getElementById('incGravity');
let decGravity = document.getElementById('decGravity');
let gravityInput = document.getElementById('gravityNum');
let elementInput = document.getElementById('elementNum');
let gravityBool = true;
let elementsBool = true;
let mouseOut = false;
let elements = [];
let elementGravity = parseInt(gravityInput.value);
let cursorX = 0;
let cursorY = 0;
let isOver = false;
let shapeID;
let scaleFactor = null;
var shapeName;
var areaFormula;
const app = new PIXI.Application({
  view: canvas,
  width: 800,
  height: 400,
  backgroundColor: 0xCCCCCC,
});

canvas.addEventListener("click", dropElement);
canvas.addEventListener('mouseout', cursorOut);
canvas.addEventListener('mouseover', cursorOver);
canvas.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  e.stopPropagation();
});
app.ticker.add(gameLoop);

function cursorOut() {
  mouseOut = false;
}

function cursorOver() {
  mouseOut = true;

}



function getRandomPosition(min, max) {
  return Math.random() * (max - min) + min;
}

function getNewValues() {
  shapeID = Math.floor(getRandomPosition(0, 6));
  getRandomRadius = Math.random() * (25 - 0) + 25;
  randomColor = '0x' + Math.floor(Math.random() * 16777215).toString(16);
  randomNumber = Math.random() * (50 - 0) + 50;
  ovalHeight = getRandomPosition(20, 30);
  ovalWidth = getRandomPosition(35, 50);
}


function dropElement(e) {
  if (!isOver) {
    getCursorPosition(canvas, e);
    let element = createElement();
    elements.push(element);
    elementsArea();
  }
  isOver = false;
}



function removeShape() {
  console.log('==========REMOVED ELEMENT==========');
  let num = this.id;
  console.log(this);
  app.stage.removeChild(this);
  elements.splice(num, 1);
  console.log('==========^^^^ REMOVED ELEMENT ^^^^==========');
  elementsArea()
}

function createElement() {

  getNewValues();


  let element;
  switch (shapeID) {
    case 0:
      //!CIRCLE
      console.log(`case >>> ${shapeID} : Circle <<< activated`);
      element = new PIXI.Graphics()
        .beginFill(randomColor)
        .drawCircle(cursorX, 0 - getRandomRadius, getRandomRadius)
        .endFill();
      shapeName = 'circle';
      break;
    case 1:
      //!SQUARE
      console.log(`case >>> ${shapeID}: Square <<< activated`);
      element = new PIXI.Graphics()
        .beginFill(randomColor)
        .drawRect(cursorX - randomNumber / 2, 0 - randomNumber, randomNumber, randomNumber)
        .endFill();
      shapeName = 'square';
      break;
    case 2:
      //!TRIANGLE
      console.log(`case >>> ${shapeID}: Triangle <<< activated`);
      element = new PIXI.Graphics()
        .beginFill(randomColor)
        .moveTo(100, 100)
        .lineTo(100, 0)
        .lineTo(0, 100)
        .lineTo(0, 0)
        .closePath()
        .endFill();
      element.x = cursorX - 50;
      element.y = 0 - 100;
      scaleFactor = getRandomPosition(0.2, 1);
      element.scale.x = scaleFactor;
      element.scale.y = scaleFactor;
      shapeName = 'triangle';

      break;
    case 3:
      //! POLYGON
      element = new PIXI.Graphics()
        .beginFill(randomColor)
        .drawPolygon(
          150, 0,
          230, 55,
          200, 150,
          100, 150,
          70, 55,
        );

      scaleFactor = getRandomPosition(0.2, 0.5);
      element.x = cursorX - 75;
      element.scale.x = scaleFactor;
      element.scale.y = scaleFactor;
      element.y = 0 - 100;
      shapeName = 'polygon';
      break;
    case 4:
      //! ELIPSE
      console.log(`case >>> ${shapeID}: Elipse <<< activated`);
      element = new PIXI.Graphics()
        .beginFill(randomColor)
        .drawEllipse(cursorX, 0 - 30, ovalWidth, ovalHeight)
        .endFill();

      shapeName = 'elipse';
      break;
    case 5:
      //! RANDOM SHAPE
      console.log(`case >>> ${shapeID}: Random shape <<< activated`);
      element = new PIXI.Graphics()
        .beginFill(randomColor)
        .drawPolygon(
          getRandomPosition(100, 160), getRandomPosition(0, 30),
          getRandomPosition(35, 75), getRandomPosition(105, 190),
          getRandomPosition(200, 230), getRandomPosition(25, 90),
          getRandomPosition(150, 250), getRandomPosition(100, 200),
          getRandomPosition(25, 95), getRandomPosition(100, 200),
          getRandomPosition(50, 150), getRandomPosition(100, 200),
          getRandomPosition(20, 120), getRandomPosition(5, 105),
          getRandomPosition(120, 220), getRandomPosition(105, 205),
        );
      element.scale.x = 0.5;
      element.scale.y = 0.5;
      element.y = 0 - 100;
      element.x = cursorX - element.width / 2;
      shapeName = 'random';
      break;
    default:
      console.log(`no element shape selected`);
  }



  areaCalculation()
  element.id = 0;
  element.gravity = parseInt(gravityInput.value);
  element.radius = getRandomRadius;
  element.name = shapeName;
  element.area = areaFormula;

  element.interactive = true;
  element.buttonMode = true;
  element
    .on('click', removeShape)
    .on('pointerover', onShapeOver)
    .on('pointerout', onShapeOut)
    .on('rightclick', changeColor);

  app.stage.addChild(element);

  return element;
}

function changeColor() {
  let elemName = this.name;
  console.log(elemName);
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].name === elemName) {
      elements[i].tint = elements[i].tint = '0x' + Math.floor(Math.random() * 16777215).toString(16);;
    }
  }
};


function updateShapes(delta) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].id = i;
    elements[i].position.y += elements[i].gravity;
    if (elements[i].position.y > 400 + elements[i].radius * 2) {
      elements[i].position.y = 0 - elements[i].width * 1.5;
    }

  }
}






function gameLoop(delta) {
  updateShapes(delta);
  elementsCount();
  elementInput.value
}