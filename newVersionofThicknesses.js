// border frame using a function
function setBlack(px){
    px.setRed(0);
    px.setGreen(0);
    px.setBlue(0);
    return px;
}
function switchRedGreen(px){
    var pxGreen, pxRed;
    pxGreen = px.getRed();
    px.setGreen(pxGreen);
    pxRed = px.getGreen();
    px.setGreen(pxRed);
    px.setBlue(0);
    return px;
}
var image = new SimpleImage("lion.jpg");

function pixelOnEdgeDifferentThicknesses(x,y,vWidth,hWidth){
  
     if (x < vWidth) return true;	
     if (y < hWidth) return true;	
     if (x >= image.getWidth() - vWidth) return true;	
     if (y >= image.getHeight() - hWidth) return true;	
     return false;
}
function pixelOnVerticalEdge(pixel, image, borderWidth) {
     var x = pixel.getX();	
     if (x < borderWidth) return true;	
     if (x >= image.getWidth() - borderWidth) return true;
     return false;
}

function randomBorder(borderValueX,borderValueY, image)
{
    for (var pixel of image.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        if(pixelOnEdgeDifferentThicknesses(x,y,5,15,image)){
            pixel = setBlack(pixel);
        }
    }
    
}

randomBorder(20,30,image);

print(image);