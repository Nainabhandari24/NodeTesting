// Error on line 7 - extra comma in arguments

function Car(make, color) {

    this.make = make;

    this.color = color;

}

function abc(a, , b, c) {}



function Circle(x, y, r) {

						this.x = x;

    				this.y = y;

    this.r = r;

}

new Circle(0, 0, 0);

Circle.prototype.pi = 3.1416;