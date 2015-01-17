
// several lines of code relating to using canvas and the context variable were adapted from
// http://www.w3schools.com/html/html5_canvas.asp

  var diagram = new UMLDiagram();
  var properties = [];

  function Point(x, y) {
    this.x = x;
    this.y = y;
  };

  function Box(origin, width, height) {
    this.origin = origin;
    this.height = height;
    this.width = width;
  };

  function Arrow(startPoint, endPoint, wingLength) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.wingLength = wingLength;
  };

  function UMLDiagram() {
    var el = document.getElementById("myCanvas");
    this.context = el.getContext("2d");
    this.boxes = [];
    this.arrows = [];
  }

  drawLine = function(context, startPoint, endPoint) {
    context.moveTo(startPoint.x,startPoint.y);
    context.lineTo(endPoint.x,endPoint.y);
    context.stroke();
  };

  Box.prototype.drawBox = function(context) {
    var point1 = new Point(this.origin.x, this.origin.y);
    var point2 = new Point(this.origin.x + this.width, this.origin.y);
    drawLine(context, point1, point2);
    point1.x += this.width;
    point1.y += this.height;
    drawLine(context, point2, point1);
    point2.x = this.origin.x;
    point2.y += this.height;
    drawLine(context, point1, point2);
    point1 = this.origin;
    drawLine(context, point2, point1);
  };

  Box.prototype.enterObjectNameField = function(context, text) {
    var x = this.origin.x + (this.width/2);
    var y = this.origin.y + (this.height/4);
    context.textAlign = "center";
    context.font = "22px Arial";
    context.fillText(text, x, y);
  };

  Box.prototype.enterPropertyFields = function(context, textFields) {
    context.textAlign = "center";
    context.font = "16px Arial";
    var x = this.origin.x + (this.width/2);
    var y = this.origin.y + (this.height/2);
    for(var i=0; i<textFields.length; i++) {
      context.fillText(textFields[i], x, y);
      y += 20;   // arbitrary.... could be a constant or let user decide.. or automatic based on box height and font-size
    };
  };

  Arrow.prototype.drawArrow = function(context) {
    var wingAngle = Math.PI/8;    // could implement as a constant or a user-defined var
    drawLine(context, this.startPoint, this.endPoint);
    var x = this.endPoint.x - this.startPoint.x;
    var y = this.endPoint.y - this.startPoint.y;
    var theta = Math.atan(x/y);
    if (y<0) theta += Math.PI;
    var phi = theta + (Math.PI - wingAngle);
    var dy = this.wingLength * Math.cos(phi);
    var dx = this.wingLength * Math.sin(phi);
    var newEndPoint = new Point(this.endPoint.x + dx, this.endPoint.y + dy);
    drawLine(context, this.endPoint, newEndPoint);
    phi = theta - (Math.PI - wingAngle);
    dy = this.wingLength * Math.cos(phi);
    dx = this.wingLength * Math.sin(phi);
    newEndPoint.x = this.endPoint.x + dx;
    newEndPoint.y = this.endPoint.y + dy;
    drawLine(context, this.endPoint, newEndPoint);
  };

  UMLDiagram.prototype.addBox = function(originX, originY, width, height, className, propertyNames) {
    var origin = new Point(originX, originY);
    var box = new Box(origin, width, height);
    box.drawBox(this.context);
    box.enterObjectNameField(this.context, className);
    box.enterPropertyFields(this.context, propertyNames);
    this.boxes.push(box);
  };

  UMLDiagram.prototype.addArrow = function(startX, startY, endX, endY, wingLength) {
    var startPoint = new Point(startX, startY);
    var endPoint = new Point(endX, endY);
    var arrow = new Arrow(startPoint, endPoint, wingLength);
    arrow.drawArrow(this.context, wingLength);
    this.arrows.push(arrow);
  };

// HTML Interface functions

  function clearInputs(ids) {
    if (ids.length>0) {
      for (var i=0; i<ids.length; i++)  {
            document.getElementById(ids[i]).value = "";
      };
    };
  };

  function addPropertyButtonClicked() {
    if (document.getElementById("propertyName").value != "")  {
      properties.push(document.getElementById("propertyName").value);
      clearInputs(["propertyName"]);
    };
  };

  function createBoxButtonClicked() {
    diagram.addBox(Number(document.getElementById("boxOriginX").value),
                   Number(document.getElementById("boxOriginY").value),
                   Number(document.getElementById("boxWidth").value),
                   Number(document.getElementById("boxHeight").value),
                   document.getElementById("className").value,
                   properties);
    clearInputs(["boxOriginY", "boxOriginX", "boxWidth", "boxHeight", "className"]);
    properties = [];
  };

  function createArrowButtonClicked() {
    diagram.addArrow(Number(document.getElementById("arrowStartX").value),
                     Number(document.getElementById("arrowStartY").value),
                     Number(document.getElementById("arrowEndX").value),
                     Number(document.getElementById("arrowEndY").value),
                     Number(document.getElementById("arrowSize").value));
    clearInputs(["arrowStartX","arrowStartY","arrowEndX","arrowEndY","arrowSize"]);
  };

  function displayDemo() {
    diagram.addBox(50, 30, 200, 300, "UMLDiagram", ["Canvas Draw Context", "Array of Boxes", "Array of Arrows"]);
    diagram.addArrow(255, 150, 325, 100, 20);
    diagram.addArrow(255, 185, 330, 300, 20);
    diagram.addBox(340, 10, 200, 150, "Box", ["Origin", "Height", "Width"]);
    diagram.addBox(340, 200, 200, 150, "Arrow", ["Starting Point", "End Point"]);
    diagram.addArrow(550, 80, 640, 150, 20);
    diagram.addArrow(550, 325, 640, 210, 20);
    diagram.addBox(650, 100, 150, 150, "Point", ["X coordinate", "Y coordinate"]);
  };

  function clearCanvas() {
    var el = document.getElementById("myCanvas");
    var w = el.width;
    el.width = 1;
    el.width = w;
    diagram.context.clearRect(0, 0, el.width, el.height);
  };

  function clearArray(array) {
    while(array.length>0)
      array.pop();
  }

  function clearPage() {
    clearArray(diagram.boxes);
    clearArray(diagram.arrows);
    clearCanvas();
    console.log(diagram);
  };

  var propertiesButtonElement = document.getElementById('addProperty');
  var boxButtonElement = document.getElementById('createBox');
  var arrowButtonElement = document.getElementById('createArrow');
  var demoButtonElement = document.getElementById('demo');
  var clearButtonElement = document.getElementById('clearCanvas');
  propertiesButtonElement.addEventListener('click', addPropertyButtonClicked);
  boxButtonElement.addEventListener('click', createBoxButtonClicked);
  arrowButtonElement.addEventListener('click', createArrowButtonClicked);
  demoButtonElement.addEventListener('click', displayDemo);
  clearButtonElement.addEventListener('click', clearPage);
