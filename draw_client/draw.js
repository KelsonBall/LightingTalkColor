const connection = new signalR.HubConnectionBuilder()    
    .withUrl("http://localhost:5000/drawapi")
    .build();

connection.start().catch(err => console.error(err.toString()));



var sketch = function( p ) {  

  var numberOfCells = 120.0;

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
        p.rect(x, 0, x2 + 1, 20);
    }
    p.fill(255);
    p.ellipse(p.mouseX,p.mouseY,10,10);
    if (p.mouseIsPressed) {
      var hue = 0.0;
      var x = p.mouseX / p.windowWidth;
      var y = p.mouseY / p.windowHeight;
      console.log(hue, x, y);
      connection.invoke("AddColorPoint", { "hue": hue, "x": x, "y": y });      
    }
  };
};

var myp5 = new p5(sketch);