const connection = new signalR.HubConnectionBuilder()    
    .withUrl("http://localhost:5000/drawapi")
    .build();

var circleList = [];


connection.on("RecieveColorPoint", (hue, x, y) => {    
    var newCircle = {
        "hue": hue,
        "x": x,
        "y": y,
        "tick": 0
    };
    console.log("push");
    circleList.push(newCircle);
    if (circleList.length > 100)
        circleList.shift();
});

connection.start().catch(err => console.error(err.toString()));

setTimeout(() => {
    connection.invoke("SubscribeAsDisplay");
}, 300);

var sketch = function( p ) {  
  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode(p.HSB, 1.0);
    p.noStroke();
  };

  p.draw = function() {    
    p.background(0);
    //console.log(circleList);
    if (circleList.length == 0)
        return;

    drawCircle(circleList[0]);
    for (i = 1; i < circleList.length; i++) {        
        var circle = circleList[i];        
        drawCircle(circle);
        if (circle.tick < circleList[i - 1].tick) {
            circleList[i] = circleList[i - 1];
            circleList[i - 1] = circle;
        }
    }
    if (circleList[circleList.length - 1].tick > 300) {
        console.log("shift");
        circleList.pop();
    }
  };

  function drawCircle(circle) {
    circle.tick++;
    var t = circle.tick / 300.0;
    p.fill(circle.hue, 1.0, 1.0, 0.1 / (t + 2));        
    p.ellipse(circle.x * p.windowWidth, circle.y * p.windowHeight, 600.0 * (t + 0.5), 600.0 * (t + 0.5));
  }
};

var myp5 = new p5(sketch);