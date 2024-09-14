var params = {
	scalex: Math.floor(Math.random()*29+1),
    scaley: Math.floor(Math.random()*29+1),
    speed: Math.floor(Math.random()*29+1),
	spacing: 0,
    zoom: Math.floor(Math.random()*40+2),
    amountX: Math.floor(Math.random()*40+2),
    amountY: Math.floor(Math.random()*40+2)
}

var modes = [{type: "mix", amount: 6}, {type: "squares", amount: 6}, {type: "stripes", amount: 6}, {type: "triangles", amount: 8}, {type: "circles", amount: 4}];
var mode = modes[Math.random()*modes.length];
var seed = 0;
var bgcolor = '#111';

import p5 from 'p5';
import { Pane } from 'tweakpane';
const param = {
    bgColor: 200
}; 
const pane = new Pane();
const type = pane.addBlade({
    view: 'list',
    label: 'type',
    options: [
      {text: modes[0].type, value: modes[0]},
      {text: modes[1].type, value: modes[1]},
      {text: modes[2].type, value: modes[2]},
      {text: modes[3].type, value: modes[3]},
      {text: modes[4].type, value: modes[4]}
    ],
    value: modes[0]
  });

const sketch = (p) => {
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        seed = p.random(1000);
        p.noiseSeed(seed);
        pane.addBinding( params, 'scalex', { min: 1, max: 30 });
        pane.addBinding( params, 'scaley', { min: 1, max: 30 });
        pane.addBinding( params, 'speed', { min: 1, max: 30 });
        pane.addBinding( params, 'zoom', { min: 2, max: 50, step: 1 });
        pane.addBinding( params, 'amountX', { min: 2, max: 50, step: 1 });
        pane.addBinding( params, 'amountY', { min: 2, max: 50, step: 1 });
        type.value = p.random(modes);
    };

    p.draw = () => {
        params.spacing = p.width/params.zoom;
        mode = type.value;
        p.background(param.bgColor);
        create();
    };
    
    const create = () => {
        p.background(bgcolor);
        var leftMargin = (p.width - params.amountX * params.spacing) / 2;
        var rightMargin = (p.height - params.amountY * params.spacing) / 2;
        p.translate(leftMargin, rightMargin);
        for(var i = 0; i < params.amountX; i++) {
            for(var j = 0; j < params.amountY; j++) {
                var n = p.noise(i / params.scalex, j / params.scaley, p.frameCount/1000*params.speed);
                show(i * params.spacing, j * params.spacing, params.spacing, p.round(n/(1/mode.amount)));
            }
        }
    }

    const show = (x, y, w, n) => {
        p.stroke(bgcolor); p.strokeWeight(1); p.fill("#eeeeee");
        switch(mode.type) {
            case "mix":
                switch(n) {
                    default:
                    case 0: p.rect(x, y, w, w); break;
                    case 1: p.rect(x, y, w, w); p.fill(bgcolor); p.rect(x+w/4, y+w/4, w/2); break;
                    case 2: p.rect(x, y, w, w); p.fill(bgcolor); p.circle(x+w/2, y+w/2, w*2/3); break;
                    case 3: p.circle(x+w/2, y+w/2, w*2/3); break;
                    case 4: p.beginShape(); p.vertex(x+w/2, y+w/4); p.vertex(x+w*3/4, y+w/2); p.vertex(x+w/2, y+w*3/4); p.vertex(x+w/4, y+w/2); p.endShape(p.CLOSE); break;
                    case 5: p.fill(bgcolor); p.rect(x, y, w, w); break;
                }
            break;
            case "squares":
                switch(n) {
                    default:
                    case 0: p.rect(x, y, w, w); break;
                    case 1: p.rect(x, y, w, w); p.fill(bgcolor); p.rect(x+w/4, y+w/4, w/2); break;
                    case 2: p.beginShape(); p.vertex(x+w/2, y); p.vertex(x+w, y+w/2); p.vertex(x+w/2, y+w); p.vertex(x, y+w/2); p.endShape(p.CLOSE); break;
                    case 3: p.rect(x, y, w/3, w/3); p.rect(x+2*w/3, y, w/3, w/3); p.rect(x+w/3, y+w/3, w/3, w/3); p.rect(x, y+2*w/3, w/3, w/3); p.rect(x+2*w/3, y+2*w/3, w/3, w/3); break;
                    case 4: p.beginShape(); p.vertex(x+w/2, y+w/4); p.vertex(x+w*3/4, y+w/2); p.vertex(x+w/2, y+w*3/4); p.vertex(x+w/4, y+w/2); p.endShape(p.CLOSE); break;
                    case 5: p.fill(bgcolor); p.rect(x, y, w, w); break;
                }
            break;
            case "triangles":
                switch(n) {
                    default:
                    case 0: p.rect(x, y, w, w); break;
                    case 1: p.triangle(x, y, x, y+w, x+w, y+w); break;
                    case 2: p.triangle(x, y, x+w, y, x+w, y+w); break;
                    case 3: p.triangle(x, y, x+w, y, x, y+w); break;
                    case 4: p.triangle(x+w, y, x+w, y+w, x, y+w); break;
                    case 5: p.triangle(x+w/2, y, x+w, y+w, x, y+w); break;
                    case 6: p.triangle(x, y, x+w, y, x+w/2, y+w); break;
                    case 7: p.fill(bgcolor); p.rect(x, y, w, w); break;
                }
            break;
            case "circles":
                switch(n) {
                    default:
                    case 0:
                        p.circle(x+w/6, y+w/6, w/6); p.circle(x+3*w/6, y+w/6, w/6); p.circle(x+5*w/6, y+w/6, w/6);
                        p.circle(x+w/6-w/12, y+3*w/6, w/6); p.circle(x+3*w/6-w/12, y+3*w/6, w/6); p.circle(x+5*w/6-w/12, y+3*w/6, w/6);
                        p.circle(x+w/6, y+5*w/6, w/6); p.circle(x+3*w/6, y+5*w/6, w/6); p.circle(x+5*w/6, y+5*w/6, w/6);
                    break;
                    case 1:
                        p.circle(x+w/5, y+w/5, w/4); p.circle(x+3*w/5, y+w/5, w/4);
                        p.circle(x+w/2, y+w/2, w/4); p.circle(x+w/2+2*w/5, y+w/2, w/4);
                        p.circle(x+w/5, y+w-w/5, w/4); p.circle(x+3*w/5, y+w-w/5, w/4);
                    break;
                    case 2:
                        p.circle(x+w/4, y+w/4, w/2); p.circle(x+3*w/4, y+3*w/4, w/2);
                    break;
                    case 3:
                        p.circle(x+w/2, y+w/2, w*4/5);
                    break;
                }
            break;
            case "stripes":
                switch(n) {
                    default:
                    case 0: p.rect(x, y, w, w); break;
                    case 1:
                        p.beginShape(); p.vertex(x, y); p.vertex(x+w, y+w); p.vertex(x+w/2, y+w); p.vertex(x, y+w/2); p.endShape(p.CLOSE);
                        p.triangle(x+w, y, x+w, y+w/2, x+w/2, y);
                    break;
                    case 2:
                        p.beginShape(); p.vertex(x+w, y); p.vertex(x, y+w); p.vertex(x+w/2, y+w); p.vertex(x+w, y+w/2); p.endShape(p.CLOSE);
                        p.triangle(x, y, x+w/2, y, x, y+w/2);
                    break;
                    case 3:
                        p.rect(x, y+w/4, w, w/4);
                        p.rect(x, y+3*w/4, w, w/4);
                    break;
                    case 4:
                        p.rect(x+w/4, y, w/4, w);
                        p.rect(x+3*w/4, y, w/4, w);
                    break;
                    case 5: p.fill(bgcolor); p.rect(x, y, w, w); break;
                }
            break;
        }
    }
};

new p5(sketch);