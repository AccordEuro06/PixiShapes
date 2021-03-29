function areaCalculation() {
  if (shapeName === 'circle') {
    areaFormula = parseInt(Math.PI * Math.pow(getRandomRadius, 2));
  } else if (shapeName === 'square') {
    areaFormula = Math.floor(Math.pow(randomNumber, 2), 0);
  } else if (shapeName === 'triangle') {
    areaFormula = Math.floor((Math.pow(randomNumber, 2) / 2) * scaleFactor, 0);
  } else if (shapeName === 'polygon') {
    //a² + b²=c²
    //55²+80²=9425² (97.08)
    a = 97.08;
    areaFormula = area = Math.floor(((Math.sqrt(5 * (5 + 2 * (Math.sqrt(5)))) * a * a) / 4) * scaleFactor, 0);
  } else if (shapeName === 'elipse') {
    //a*b*pi
    areaFormula = Math.floor(Math.PI * ovalHeight * ovalWidth, 0);
  } else if (shapeName === 'random') {
    //cant calculate area of a random shape
    areaFormula = 0;
  }
}

function getCursorPosition(canvas, event) {
  if (mouseOut) {
    const rect = canvas.getBoundingClientRect()
    cursorX = event.clientX - rect.left
    cursorY = event.clientY - rect.top
    console.log("x: " + cursorX + " y: " + cursorY)
  } else {
    cursorX = getRandomPosition(20, 780)
  }
}

function onShapeOver() {
  isOver = true;
}



function onShapeOut() {
  isOver = false;
}

function elementsCount() {
  count.value = elements.length;
  elementInput.value = elements.length;

}

function elementsArea() {
  let temp = 0;
  for (let i = 0; i < elements.length; i++) {
    temp += elements[i].area
  }
  areaTaken.value = temp;
}

function increaseGravity() {
  gravityBool = true;
  changeGravity();
}

function decreaseGravity() {
  gravityBool = false;
  changeGravity();
}

function changeGravity() {
  let temp = parseInt(gravityInput.value);
  if (gravityBool) {
    gravityInput.value = temp + 1;
  } else if (!gravityBool) {
    gravityInput.value = temp - 1;
  }
  for (let i = 0; i < elements.length; i++) {
    elements[i].gravity = parseInt(gravityInput.value);
  }
}

function increaseElement() {
  let temp = parseInt(elementInput.value);
  elementsBool = true;
  dropElement();

}

function decreaseElement() {
  let num = 0;
  elementsBool = false;
  app.stage.removeChild(elements.shift());;
}


function autoStart() {
  for (let i = 0; i < elementInput.value; i++) {
    dropElement();
  }
}
autoStart();