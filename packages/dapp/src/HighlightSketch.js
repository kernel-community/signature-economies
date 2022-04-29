function HighlightSketch(p5) {
  let selectedText = 'Hello World';
  let n = 0;
  let c = 16;

  p5.setup = () => {
    p5.createCanvas(500, 500);
    p5.angleMode(p5.DEGREES)
    p5.colorMode(p5.HSB);
    console.log(selectedText.length);
    c = p5.map(selectedText.length, 0, 300, 16, 6);
  };

  p5.updateWithProps = (props) => {
      if(props.selectedText){
        selectedText = props.selectedText;
        p5.setup();
      }
  };

  p5.draw = () => {
    p5.background(255);
    p5.translate(p5.width / 2, p5.height / 2);
  
    for (var i = 0; i < n; i++) {
      var a = i * 137.5;
      var r = c * p5.sqrt(i);
      var x = r * p5.cos(a);
      var y = r * p5.sin(a);
      var hu = p5.map(i, 0, selectedText.length, 0, 100);
      p5.fill(150, hu, 255);
      p5.noStroke();
      p5.ellipse(x, y, c, c);
    }
  
    if(n<selectedText.length){
      n++;
    }
  };
}

export default HighlightSketch;
