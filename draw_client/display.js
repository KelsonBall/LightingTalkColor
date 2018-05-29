const connection = new signalR.HubConnectionBuilder()    
    .withUrl("http://localhost:5000/drawapi")
    .build();

var circleList = [];

var date = new Date();
connection.on("RecieveColorPoint", (hue, x, y) => {    
    var newCircle = {
        "hue": hue,
        "x": x,
        "y": y,
        "time": date.getUTCMilliseconds()
    };
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
    for (i = 0; i < circleList.length; i++) {        
        var circle = circleList[i];        
        p.fill(circle.hue + 0.1, 1.0, 1.0, 0.1);        
        p.ellipse(circle.x * p.windowWidth, circle.y * p.windowHeight, 300, 300);
    }
  };
};

var myp5 = new p5(sketch);