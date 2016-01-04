// steganography
function pixchange(pixval){
    var x = Math.floor(pixval/16) * 16;
    return x;
}
function chop2hide(image){
    for(var px of image.values()){
        px.setRed(pixchange(px.getRed()));
        px.setGreen(pixchange(px.getGreen()));
        px.setBlue(pixchange(px.getBlue()));
    }
    return image;
}
function shift(im){
  var nim = new SimpleImage(im.getWidth(), 
                            im.getHeight());
  for(var px of im.values()){
    var x = px.getX();
    var y = px.getY();
    var npx = nim.getPixel(x,y);
    npx.setRed(Math.floor(px.getRed()/16));
    npx.setGreen(Math.floor(px.getGreen()/16));
    npx.setBlue(Math.floor(px.getBlue()/16));
  }
  return nim;
}

function crop(image, width, height){
    var nimage = new SimpleImage(width, height);
    for(var px of image.values()){
        var x = px.getX();
        var y = px.getY();
        if((x< width) && (y < height)){
            var npixel = nimage.getPixel(x,y);
            npixel.setRed(px.getRed());
             npixel.setGreen(px.getGreen());
              npixel.setBlue(px.getBlue());
        }
    }
    return nimage;
}

function newpv(p,q){
    if((p+q)<=255){
        return (p+q);
    }
    else{
        print("Error: sum of values exceeds 255");
    }
}
function combine(img1,img2){
    var finalImage = new SimpleImage(img1.getWidth(), img2.getHeight());
    
    for (var impx of img1.values()){

        var impxx = impx.getX();
        var impxy = impx.getY();
        
        var impx2 = img2.getPixel(impxx, impxy);
        var fimpx = finalImage.getPixel(impxx, impxy);
        
        fimpx.setRed(newpv(impx.getRed(),impx2.getRed()));
        
        fimpx.setGreen(newpv(impx.getGreen(),impx2.getGreen()));
        
        fimpx.setBlue(newpv(impx.getBlue(),impx2.getBlue()));
        
    }
    return finalImage;
}

//Testing the combine function using USAIN and SKYLINE pictures.
var start = new SimpleImage ("usain.jpg");
print("RED VALUE of START BEFORE: " + start.getRed(150, 90));
var hide = new SimpleImage ("skyline.jpg");
print("RED VALUE of HIDE BEFORE: " + hide.getRed(150, 90));
start = chop2hide(start);
print("RED VALUE OF START AFTER CHOP: " + start.getRed(150, 90));
hide = shift(hide);
print("RED VALUE OF HIDE AFTER SHIFT: " + hide.getRed(150, 90));
var testr = combine(start, hide);
print("RED VALUE OF COMBINED IMAGE AFTER CHOP AND HIDE: " + testr.getRed(150, 90));

var start = new SimpleImage("usain.jpg");
var hide = new SimpleImage("skyline.jpg");

start = crop(start, 200, 180);
hide = crop(hide, 200, 180);
start = chop2hide(start);
hide = shift(hide);
var final = combine(start, hide);print(final);
print(final);