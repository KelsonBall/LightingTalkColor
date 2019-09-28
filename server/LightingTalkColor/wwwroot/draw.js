const connection = new signalR.HubConnectionBuilder()    
    .withUrl("/drawapi")
    .build();

connection.start().catch(err => console.error(err.toString()));



var sketch = function( p ) {  

  var numberOfCells = 80.0;
  var colorStripHeight = 0.15;
  var selectedHue = 0;

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode(p.HSB, 1.0);
    p.noStroke();
  };


  p.draw = function() {
    p.background(0);
    for (i = 0; i < numberOfCells; i++) {
        p.fill(i / numberOfCells, 1.0, 1.0);
        var x = i / numberOfCells * p.windowWidth;
        var x2 = x + p.windowWidth / numberOfCells;
        p.rect(x, 0, x2 + 1, colorStripHeight * p.windowHeight);
    }
    p.fill(selectedHue, 1.0, 1.0);
    p.ellipse(p.mouseX,p.mouseY,10,10);
    if (p.mouseIsPressed) {
      console.log(p.mouseY);
      if (p.mouseY > colorStripHeight * p.windowHeight) {        
        var x = p.mouseX / p.windowWidth;
        var y = p.mouseY / (p.windowHeight - p.windowHeight * colorStripHeight);
        console.log(selectedHue, x, y);
        connection.invoke("AddColorPoint", { "hue": selectedHue, "x": x, "y": y });      
      }
      else {
        selectedHue = (1.0 * p.mouseX / p.windowWidth);
      }
    }
  };
};

var myp5 = new p5(sketch);