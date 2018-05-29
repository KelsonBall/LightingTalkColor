const connection = new signalR.HubConnectionBuilder()    
    .withUrl("/drawapi")
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
}, 1000);

var slides = [
    function () {
        return {
            "advance": function () { return false; },
            "style": function ( p ) {
                p.textAlign(p.CENTER);
                p.fill(255);
                p.textSize(64);
            },
            "draw": function ( p ) {                
                p.text("All the things we've forgot", p.windowWidth / 2.0, p.windowHeight / 2.0 );
                p.text("we've learned", p.windowWidth / 2.0, p.windowHeight / 2.0 + 70 );
            }
        }
    },
    function () {      
        var shift = 0;  
        return {
            "advance": function () { return false; },
            "style": function ( p ) {
                p.textAlign(p.CENTER);
                p.fill(255);
                p.textSize(64);
            },
            "draw": function ( p ) {
                if (shift < 100)    
                    shift += 3;                
                p.text("'Once' upon a time", p.windowWidth / 3.0 - shift, p.windowHeight / 4.0);
                if (shift > 30) {
                    p.text("on Stack Overflow", p.windowWidth / 3.0, p.windowHeight / 4.0 + 70 );
                }
            }            
        }
    },
    function () {              
        return {
            "advance": function () { return false; },
            "style": function ( p ) {
                p.textAlign(p.CENTER);
                p.fill(255);
                p.textSize(64);
            },
            "draw": function ( p ) {
                p.text("How do make a program that", p.windowWidth / 2.0, p.windowHeight / 2.0 );
                p.text("counts cows in a video?", p.windowWidth / 2.0, p.windowHeight / 2.0 + 70 );
            }
        }
    },
    function () {              
        return {
            "advance": function () { return false; },
            "style": function ( p ) {
                p.colorMode(p.RGB);
                p.textAlign(p.CENTER);
                p.fill(255, 0, 0);
                p.textSize(64);
            },
            "draw": function ( p ) {
                p.text("What have you tried?", p.windowWidth / 2.0, p.windowHeight / 2.0 );                
            }
        }
    },
    function () {              
        return {
            "advance": function () { return false; },
            "style": function ( p ) {
                p.textAlign(p.CENTER);
                p.fill(255);
                p.textSize(64);
            },
            "draw": function ( p ) {
                p.text("My friend said to try html", p.windowWidth / 2.0, p.windowHeight / 2.0 );                
            }
        }
    },
    function () {              
        var size = 64;
        return {
            "advance": function () { return false; },
            "style": function ( p ) {
                p.colorMode(p.RGB);
                p.textAlign(p.CENTER);
                p.fill(255, 0, 0);                
            },
            "draw": function ( p ) {
                if (size < 120)
                    size++;
                p.textSize(size);
                p.text("(-_-)", p.windowWidth / 2.0, p.windowHeight / 2.0 );
            }   
        }
    },
    function () {              
        return {
            "advance": function () { return false; },
            "style": function ( p ) {
                p.textAlign(p.LEFT);
                p.fill(255);
                p.textSize(64);
            },
            "draw": function ( p ) {
                p.text("-> Example", p.windowWidth / 3.0, p.windowHeight / 5.0 );
                p.text("-> Experience", p.windowWidth / 3.0, p.windowHeight / 5.0 + 70 );
            }
        }
    },
    function () {              
        return {
            "advance": function () { return false; },
            "style": function ( p ) {
                p.textAlign(p.LEFT);
                p.fill(255);
                p.textSize(64);
            },
            "draw": function ( p ) {
                p.text("-> Example (lots)", p.windowWidth / 3.0, p.windowHeight / 5.0 );
                p.text("-> Experience", p.windowWidth / 3.0, p.windowHeight / 5.0 + 70 );
            }
        }
    },
    function () {              
        return {
            "advance": function () { return false; },
            "style": function ( p ) {
                p.textAlign(p.LEFT);
                p.fill(255);
                p.textSize(64);
            },
            "draw": function ( p ) {
                p.text("-> Example (lots)", p.windowWidth / 3.0, p.windowHeight / 5.0 );
                p.text("-> Experience (lots)", p.windowWidth / 3.0, p.windowHeight / 5.0 + 70 );
            }
        }
    },
    function () {              
        return {
            "advance": function () { return false; },
            "style": function ( p ) {
                p.textAlign(p.CENTER);
                p.fill(255);
                p.textSize(64);
            },
            "draw": function ( p ) {
                p.text("But how?", p.windowWidth / 2.0, p.windowHeight / 2.0 );
                p.text("Make something. Make anything. With help.", p.windowWidth / 2.0, p.windowHeight / 2.0 + 70 );
            }
        }
    },
    function () {              
        return {
            "advance": function () { return false; },
            "style": function ( p ) {
                p.textAlign(p.CENTER);
                p.fill(255);
                p.textSize(64);
            },
            "draw": function ( p ) {
                p.text("Like, my slides!", p.windowWidth / 2.0, p.windowHeight / 2.0 );                
            }
        }
    },
    function () {
        var scale = 1.0;
        return {
            "advance": function () { return false; },
            "style": function ( p ) {
                p.textAlign(p.CENTER);
                p.fill(255);
                p.textSize(64);
            },
            "draw": function ( p ) {
                if (scale > 0)
                    scale -= 0.005;
                if (scale < 0)
                    scale = 0;
                p.text("kelsonball.com/draw", p.windowWidth / 2.0, (p.windowHeight / 2.0 * scale + (70 * (1 - scale)) ));                
            }
        }
    },
    function () {
        return {
            "advance": function () { return false; },
            "style": function ( p ) {
                p.textAlign(p.CENTER);
                p.colorMode(p.RGB);
                p.fill(255);
                p.textSize(64);
            },
            "draw": function ( p ) {
                p.fill(255, 0, 0);
                p.text("What?", p.windowWidth / 4.0, p.windowHeight / 2.0 );  
                p.fill(255);
                p.text("kelsonball.com/draw", p.windowWidth / 2.0, 70);                              
            }
        }
    },
    function () {
        return {
            "advance": function () { return false; },
            "style": function ( p ) {
                p.textAlign(p.CENTER);
                p.colorMode(p.RGB);
                p.fill(255,0,0);
                p.textSize(64);
            },
            "draw": function ( p ) {                
                p.text("What?", p.windowWidth / 4.0, p.windowHeight / 2.0 );                                
                p.text("Lets do it!", p.windowWidth / 4.0, p.windowHeight / 2.0 + 70);
                p.fill(255);
                p.text("kelsonball.com/draw", p.windowWidth / 2.0, 70);
            }
        }
    },
    function () {
        return {
            "advance": function () { return false; },
            "style": function ( p ) {
                p.textAlign(p.CENTER);                
                p.fill(255);
                p.textSize(64);
            },
            "draw": function ( p ) {                
                p.text("kelsonball.com/draw", p.windowWidth / 2.0, 70);
                p.text("Mentorship enables students to", p.windowWidth / 2.0, p.windowHeight / 2.0 + 70 * -1.0);
                p.text("make things", p.windowWidth / 2.0, p.windowHeight / 2.0 + 70 * 0);
                p.text("THEY", p.windowWidth / 2.0, p.windowHeight / 2.0 + 70 * 1.0);
                p.text("are intested in", p.windowWidth / 2.0, p.windowHeight / 2.0 + 70 * 2.0);
            }
        }
    },
    function () {
        return {
            "advance": function () { return false; },
            "style": function ( p ) {
                p.textAlign(p.CENTER);                
                p.fill(255);
                p.textSize(64);
            },
            "draw": function ( p ) {                
                p.text("kelsonball.com/draw", p.windowWidth / 2.0, 70);
                p.text("Collaborative coding finds", p.windowWidth / 2.0, p.windowHeight / 2.0 + 70 * -0.5);
                p.text("unknown unknowns", p.windowWidth / 2.0, p.windowHeight / 2.0 + 70 * 0.5);                
            }
        }
    },
    function () {
        return {
            "advance": function () { return false; },
            "style": function ( p ) {
                p.textAlign(p.CENTER);                
                p.fill(255);
                p.textSize(64);
            },
            "draw": function ( p ) {                
                p.text("kelsonball.com/draw", p.windowWidth / 2.0, 70);
                p.text("Collaborative coding shows", p.windowWidth / 2.0, p.windowHeight / 2.0 + 70 * -0.5);
                p.text("tools, workflow, style", p.windowWidth / 2.0, p.windowHeight / 2.0 + 70 * 0.5);
            }
        }
    },
    function () {
        return {
            "advance": function () { return false; },
            "style": function ( p ) {
                p.textAlign(p.CENTER);                
                p.fill(255);
                p.textSize(64);
            },
            "draw": function ( p ) {                
                p.text("kelsonball.com/draw", p.windowWidth / 2.0, 70);
                p.text("Collaborative coding enables", p.windowWidth / 2.0, p.windowHeight / 2.0 + 70 * -0.5);
                p.text("exploratory learning", p.windowWidth / 2.0, p.windowHeight / 2.0 + 70 * 0.5);                
            }
        }
    }
];

var sketch = function( p ) {  

    var slideindex = 0;
    var slide = slides[slideindex]();

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 1.0);
        p.noStroke();
    };

    p.draw = function() {    
        p.background(0);
        backgroundArt();
        drawSlides();
    };

    function drawSlides() {
        if (slide != undefined) {
            p.push();
            slide.style(p);
            slide.draw(p);
            p.pop();
        }
    }

    function advanceSlide() {
        console.log("advancing");
        if (!slide.advance()) {
            slideindex++;
            if (slides.length > slideindex) {
                slide = slides[slideindex]();
            }
            else {
                slide = {
                    "advance": function() { return true; },
                    "style": function ( p ) { },
                    "draw": function( p ) { p.background(0); }
                }
            }
        }
    }

    p.mousePressed = function() {
        console.log("pressed!");
        advanceSlide();
    }

    p.keyPressed = function () {
        if (p.keyCode == p.LEFT_ARROW) {
            if (slideindex > 0) {
                slideindex--;
            }
            slide = slides[slideindex]();
        }
        else {
            advanceSlide();
        }
    }

    function backgroundArt() {
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
    }

    function drawCircle(circle) {
        circle.tick++;
        var t = circle.tick / 300.0;
        p.fill(circle.hue, 1.0, 1.0, 0.1 / (t + 2));        
        p.ellipse(circle.x * p.windowWidth, circle.y * p.windowHeight, 600.0 * (t + 0.5), 600.0 * (t + 0.5));
    }
};

var myp5 = new p5(sketch);