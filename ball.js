class Ball{
    constructor(x,y){
        var options = {
            'restitution':0.8,
            'friction':1.0,
            'density':1.0
        }
        this.body = Bodies.circle(x,y,15,options);
        this.x=x;
        this.y=y;
        this.r=15;
        this.image = loadImage("scb.png")
        World.add(world,this.body);
    }

    displey(){
        var angle = this.body.angle;
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(angle);
        imageMode(CENTER);
        ellipseMode(RADIUS);
        image(this.image, 0, 0, this.r, this.r);
        pop();
    }
}