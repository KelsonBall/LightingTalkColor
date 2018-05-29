const connection = new signalR.HubConnectionBuilder()    
    .withUrl("http://localhost:5000/drawapi")
    .build();

connection.start().catch(err => console.error(err.toString()));

var sketch = function( p ) {

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode(p.HSB, 1.0);
  };

  p.draw = function() {
    p.background(0);
    for (i = 0; i < 10; i++) {
        p.fill(i / 10.0, 1.0, 1.0);
        var x = i / 10.0 * p.windowWidth;
        var x2 = x + p.windowWidth / 10.0;
        p.rect(x, 0, x2, 20);
    }
    p.fill(255);
    p.ellipse(p.mouseX,p.mouseY,10,10);
    if (p.mouseIsPressed) {
      var hue = 0.0;
      var x = p.mouseX / p.windowWidth;
      var y = p.mouseY / p.windowHeight;
      console.log(hue, x, y);
      //connection.invoke("AddColorPoint", 0.0, p.mouseX / p.windowWidth, p.mosueY / p.windowHeight);
      connection.invoke("ShowMessage", "Hello World!");
    }
  };
};

var myp5 = new p5(sketch);