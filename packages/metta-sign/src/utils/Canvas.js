/**
 * only p5 stuff
 */
import urlA from '../alphabets/A.png';
import urlB from '../alphabets/B.png';
import urlC from '../alphabets/C.png';
import urlD from '../alphabets/D.png';
import urlE from '../alphabets/E.png';
import urlF from '../alphabets/F.png';
import urlG from '../alphabets/G.png';
import urlH from '../alphabets/H.png';
import urlI from '../alphabets/I.png';
import urlJ from '../alphabets/J.png';
import urlK from '../alphabets/K.png';
import urlL from '../alphabets/L.png';
import urlM from '../alphabets/M.png';
import urlN from '../alphabets/N.png';
import urlO from '../alphabets/O.png';
import urlP from '../alphabets/P.png';
import urlQ from '../alphabets/Q.png';
import urlR from '../alphabets/R.png';
import urlS from '../alphabets/S.png';
import urlT from '../alphabets/T.png';
import urlU from '../alphabets/U.png';
import urlV from '../alphabets/V.png';
import urlW from '../alphabets/W.png';
import urlX from '../alphabets/X.png';
import urlY from '../alphabets/Y.png';
import urlZ from '../alphabets/Z.png';
import Empty from '../alphabets/Empty.png';
import Garamond from '../fonts/Garamond.ttf';

function HighlightSketch(p5) {
  let canvas;
  let selectedText = '';
  let fontGaramond;
  let n =0;
  let c = 16;
  let imgA, imgB, imgC, imgD, imgE, imgF, imgG, imgH, imgI, imgJ, imgK, imgL, imgM, imgN, imgO, imgP, imgQ, imgR, imgS, imgT, imgU, imgV, imgW, imgX, imgY, imgZ;
  let imgEmpty;

  p5.preload = () => {
    imgA = p5.loadImage(urlA);
    imgB = p5.loadImage(urlB);
    imgC = p5.loadImage(urlC);
    imgD = p5.loadImage(urlD);
    imgE = p5.loadImage(urlE);
    imgF = p5.loadImage(urlF);
    imgG = p5.loadImage(urlG);
    imgH = p5.loadImage(urlH);
    imgI = p5.loadImage(urlI);
    imgJ = p5.loadImage(urlJ);
    imgK = p5.loadImage(urlK);
    imgL = p5.loadImage(urlL);
    imgM = p5.loadImage(urlM);
    imgN = p5.loadImage(urlN);
    imgO = p5.loadImage(urlO);
    imgP = p5.loadImage(urlP);
    imgQ = p5.loadImage(urlQ);
    imgR = p5.loadImage(urlR);
    imgS = p5.loadImage(urlS);
    imgT = p5.loadImage(urlT);
    imgU = p5.loadImage(urlU);
    imgV = p5.loadImage(urlV);
    imgW = p5.loadImage(urlW);
    imgX = p5.loadImage(urlX);
    imgY = p5.loadImage(urlY);
    imgZ = p5.loadImage(urlZ);
    imgEmpty = p5.loadImage(Empty);
    fontGaramond = p5.loadFont(Garamond);
  };

  p5.setup = () => {
    canvas = p5.createCanvas(800, 1200);
    p5.angleMode(p5.DEGREES);
    p5.colorMode(p5.HSB);
    c = p5.map(selectedText.length, 0, 300, 36, 20, true);
  };

  p5.updateWithProps = (props) => {
    if (props.selectedText) {
      selectedText = `\r\n${props.selectedText}`;
      p5.setup();  
    }
  };

  p5.draw = () => {
    if(n >= 400 || n >= selectedText.length) {
      p5.noLoop();
      const img = canvas?.elt?.toDataURL();
    }
    p5.background(0);

    p5.translate(p5.width / 2, p5.height / 2);
    let len = selectedText.length;
    let offset = p5.floor(p5.map(len, 0, 700, 2, 10));
    for (var i = offset; i <= n+offset; i++) {
      var a = i * 107.5;
      var r = c*1.2 * p5.sqrt(i);
      var x = r * p5.cos(a);
      var y = r * p5.sin(a);
      p5.fill(150, 200, 55, 0.3);
      p5.noStroke();
      let alphab = selectedText[i-offset];
      p5.push();
      p5.translate(0,-200);
      switch (alphab?.toUpperCase()) {
        case 'A':
          p5.image(imgA, x-c/2, y-c/2,c,c);
          break;
        case 'B':
          p5.image(imgB, x-c/2, y-c/2,c,c);
          break;
        case 'C':
          p5.image(imgC, x-c/2, y-c/2,c,c);
          break;
        case 'D':
          p5.image(imgD, x-c/2, y-c/2,c,c);
          break;
        case 'E':
          p5.image(imgE, x-c/2, y-c/2,c,c);
          break;
        case 'F':
          p5.image(imgF, x-c/2, y-c/2,c,c);
          break;
        case 'G':
          p5.image(imgG, x-c/2, y-c/2,c,c);
          break;
        case 'H':
          p5.image(imgH, x-c/2, y-c/2,c,c);
          break;
        case 'I':
          p5.image(imgI, x-c/2, y-c/2,c,c);
          break;
        case 'J':
          p5.image(imgJ, x-c/2, y-c/2,c,c);
          break;
        case 'K':
          p5.image(imgK, x-c/2, y-c/2,c,c);
          break;
        case 'L':
          p5.image(imgL, x-c/2, y-c/2,c,c);
          break;
        case 'M':
          p5.image(imgM, x-c/2, y-c/2,c,c);
          break;
        case 'N':
          p5.image(imgN, x-c/2, y-c/2,c,c);
          break;
        case 'O':
          p5.image(imgO, x-c/2, y-c/2,c,c);
          break;
        case 'P':
          p5.image(imgP, x-c/2, y-c/2,c,c);
          break;
        case 'Q':
          p5.image(imgQ, x-c/2, y-c/2,c,c);
          break;
        case 'R':
          p5.image(imgR, x-c/2, y-c/2,c,c);
          break;
        case 'S':
          p5.image(imgS, x-c/2, y-c/2,c,c);
          break;
        case 'T':
          p5.image(imgT, x-c/2, y-c/2,c,c);
          break;
        case 'U':
          p5.image(imgU, x-c/2, y-c/2,c,c);
          break;
        case 'V':
          p5.image(imgV, x-c/2, y-c/2,c,c);
          break;
        case 'W':
          p5.image(imgW, x-c/2, y-c/2,c,c);
          break;
        case 'X':
          p5.image(imgX, x-c/2, y-c/2,c,c);
          break;
        case 'Y':
          p5.image(imgY, x-c/2, y-c/2,c,c);
          break;
        case 'Z':
          p5.image(imgZ, x-c/2, y-c/2,c,c);
          break;
        default:
          p5.image(imgEmpty, x-c/2, y-c/2,c,c);
          break;
      }
      p5.pop();
    }

    p5.translate(-p5.width / 2, -p5.height / 2);
    p5.fill(360,0,0,0.8);
    p5.rect(0,750,800,450);

    p5.fill(360,0,100,0.3);
    p5.rect(50,750,700,2);

    p5.fill(360,0,100,0.3);
    p5.rect(50,1100,700,2);

    p5.noStroke();
    p5.fill(360,0,100);
    p5.textFont(fontGaramond);
    p5.textAlign(p5.CENTER);
    p5.textSize(32);
    p5.text(selectedText,50,775,700,300);

    p5.fill(360,0,100,0.4);
    p5.textAlign(p5.LEFT);
    p5.textSize(36);
    p5.text("Kernel Verses",47,1110,200,100);

    p5.textAlign(p5.LEFT);
    p5.textSize(36);
    p5.text("Signature Economies",459,1110,400,100);

    if (n < selectedText.length && n<=400) {
      //animate the pattern
      n+=2;
    }else{
      //stop animation at 400 or selectedText.length, whichever is smaller
      if(selectedText.length>400){
        n = 400;
      }
      else{
        n = selectedText.length;
      }
    }
  };
}
  
  export default HighlightSketch;
  