//e-project
 var output = new SimpleImage(256,256);

  function dist(pixel, x,y) {
     var dx = pixel.getX() - x;
     var dy = pixel.getY() - y;
     return Math.sqrt(dx * dx + dy *dy);
 }
 
 // solar eclipse from top
 for (var pixel of output.values()){
    
    // this create the moon
     if (dist(pixel, 50,60)< 70){
        pixel.setRed(247-3*dist(pixel,125,125));
         pixel.setBlue(24-3*dist(pixel,125,125));
         pixel.setGreen(202-3*dist(pixel,125,125));
     
     }
     // this create the sun
     else if (dist(pixel, 125,125)< 90){
          pixel.setRed(247-2*dist(pixel,125,125));
         pixel.setBlue(24-2*dist(pixel,125,125));
         pixel.setGreen(202-2*dist(pixel,125,125));
     }
     // create the starry background
     else if (Math.random() >  0.99) {
         pixel.setRed(255);
         pixel.setGreen(255);
         pixel.setBlue(255);
     }
    
 }
 
 print(output);

 //second assignment

 // draw a wavy window frame over the image
var OrgImage = new SimpleImage("img061.jpg");
var w = OrgImage.getWidth();
var h = OrgImage.getHeight();
var NewImage = new SimpleImage(w,h);


for (var px of OrgImage.values()) {
     var x = px.getX();
     var y = px.getY();
     var pxVal = NewImage.getPixel(x,y);
    
     if (y <= (0 - 10*Math.sin(x/5.8))  || y > h-(10 - 500*Math.sin(x/5.85))) {
         // RGB color below  is a red color
      
         pxVal.setRed(0); 
         pxVal.setGreen(0);
         pxVal.setBlue(27/2);
     }
 
    else { // uses the pixel from the original image
        pxVal.setRed(px.getRed());
        pxVal.setGreen(px.getGreen());
        pxVal.setBlue(px.getBlue());
        }
    }

print(OrgImage);    
print(NewImage);

//last assignment

// Steganography; hiding information and images in another image.
// Function 1: crop(image, width, height)
// Function 2: getW(image1, image2); gets minimum width of the two images.
// Function 3: getH(image1, image2); gets minimum height of the two images.
// Function 4: pixChange (pixVal)
// Function 5: chop2Hide(image)
// Function 6: shift(image)
// Function 7: newpv(p,q)
// Function 8: combine(show, hide)
// Function 9: extract(image)

//**** Crop function : crops images to the given width/height ***** //
function crop(image, width, height) {
    var newImage = new SimpleImage(width, height);
    for (var px of image.values()){
        var xPos = px.getX();
        var yPos = px.getY();
        if (xPos < width && yPos < height){
            newImage.setPixel(xPos, yPos, px);
        }
    }
        return newImage;
    }
// *************//

extractMessage = new SimpleImage("message.png");
showImage = new SimpleImage("message.png");
hideImage = new SimpleImage("message.png");

//**** Function: getW(image1, image2); compares and get the 
// minimum width of the two images. ****//

function getW(image1, image2){
    var width; 
    if(image1.getWidth() > image2.getWidth() ){
        width =  image2.getWidth();
    }
    else {width =  image1.getWidth();}
    
    return width;
}

function getH(image1, image2) {   
    var height;
    if(image1.getHeight() > image2.getHeight() ){
        height =  image2.getHeight();
    }
    else {height =  image1.getHeight();}
    
    return height;
}

//*********************************

print ("Width :", getW(showImage, hideImage) ,"Height:", getH(showImage, hideImage));
width= getW(showImage, hideImage); height = getH(showImage, hideImage);

//width = 200; height= 275;
showImage = crop(showImage, width, height);
hideImage = crop(hideImage, width, height);
print("Before: showImage");
print(showImage);
print("Before: hideImage");
print(hideImage);

//**********************************


//**** Function: pixChange(pixVal) : Takes a 2-bit Hex number of a pixel 
//and discards the right-Most bit and add zero to the right-most bit ****//

function pixChange(pixVal) {
    var newPixVal = Math.floor(pixVal/(Math.pow(Bits2Hide,2)))*(Math.pow(Bits2Hide,2));
    //print(newPixVal);  // 4 Testing
    return newPixVal;
}
//print(pixChange(136)); // for Testing pixchange(pixVal).


//********************************

//**** Function: chop2Hide(image): Discards the right-most Hex-bit (and adds
//a zero to the right most bit) of every pixel of an image  ****//


function chop2Hide(image){
    for (var px of image.values() ){
         px.setRed(pixChange(px.getRed() ) );
         px.setGreen(pixChange(px.getGreen() ) );
         px.setBlue(pixChange(px.getBlue() ) );
    }
    return image;
}
//print("After", chop2Hide(image) );

//**************************************************

//**** Function: shift(image): Creats a new image with the same dimension
//as the image in the argument. Discards the right-most Hex-bit of every pixel
// in the original image and set this pixel value in the new image. ****//

function shift(image){
    var newIm = new SimpleImage(image.getWidth(), image.getHeight() );
    for(var px of image.values()){
        var xPos = px.getX();
        var yPos = px.getY();
        var newPx = newIm.getPixel(xPos, yPos);
        newPx.setRed(Math.floor(px.getRed()/Math.pow(Bits2Hide,6)) );
        newPx.setGreen(Math.floor(px.getGreen()/Math.pow(Bits2Hide,6)) );
        newPx.setBlue(Math.floor(px.getBlue()/Math.pow(Bits2Hide,6)) );
    }
    return newIm;
}

//print("After", shift(image) );
//***************************************************************


//**** Function: newpv(p,q): Adds p & q and return the result. The sum should 
// never be greater than 255. 

function newpv(p,q){
    sum = (p + q);
    if (sum <= 255){
        return sum;
    }
    else {print("sum error")}
}
//print(newpv(250, 5));

//***************************************************************


//**** Function: combine(show, hide)

function combine(show, hide){
    
    StegImg = new SimpleImage(show.getWidth(), show.getHeight());
    for(var showPx of show.values() ) {
        
        var showX = showPx.getX();
        var showY = showPx.getY();
        var hidePx = hide.getPixel(showX, showY);
        var StegPx = StegImg.getPixel(showX, showY);
        
        StegPx.setRed( newpv( showPx.getRed(), hidePx.getRed() ) ) ;
        StegPx.setGreen( newpv( showPx.getGreen(), hidePx.getGreen() ) ) ;
        StegPx.setBlue( newpv( showPx.getBlue(), hidePx.getBlue() ) ) ;
   }
   return StegImg;    
}

//********************************************************************

//**** Function: extract(image) ; extacts the hidden image ****//


function extract(image) {
   extracTImg = new SimpleImage(image.getWidth(), image.getHeight() );
   for (var stegPx of image.values()) {
       xPos = stegPx.getX();
       yPos = stegPx.getY();
       var extratPx = extracTImg.getPixel(xPos, yPos);
       
       // Takes the Red value from stegPx, perfrom MODULAR operation
       // (takes the remainder and discards rest) and then shift to right
       // by multiplying by 16 (adding hex-0 to the right of the digit).
       //*************************************************************
       extratPx.setRed( Math.floor(stegPx.getRed()% Math.pow(Bits2Hide,2)) * Math.pow(Bits2Hide,6) );
       extratPx.setGreen( Math.floor(stegPx.getGreen()%Math.pow(Bits2Hide,2)) * Math.pow(Bits2Hide,6) );
       extratPx.setBlue( Math.floor(stegPx.getBlue()%Math.pow(Bits2Hide,2)) * Math.pow(Bits2Hide,6) );
       
   }
   
   return extracTImg;
}

//********************************************


// Main program:
//**************

Bits2Hide = 2; // Number of bits to hide
var show = chop2Hide(showImage);
var hide = shift(hideImage);
var Stego = combine(show, hide);

print("Show-image Pixel @", width/2, height/2); print(show.getPixel(width/2, height/2));
print("Hide-image Pixel @", width/2, height/2); print(hide.getPixel(width/2, height/2));
print();

print("After: Steganography Demo:");
print(Stego);
print("Stego-image Pixel @", width/2, height/2);
print(StegImg.getPixel(width/2, height/2));

print();
print("Modular Operation 125%16 =",  Math.floor(125%16) ); 
print( "Extracted Image");
print(extract(extractMessage)); 
print("Extracted image Pixel @", width/2, height/2);
print(extracTImg.getPixel(width/2, height/2));

// just for extracting the image
extractMessage = new SimpleImage("message.png");
original = new SimpleImage("message.png");

function extract(image) {
   extracTImg = new SimpleImage(image.getWidth(), image.getHeight() );
   for (var stegPx of image.values()) {
       xPos = stegPx.getX();
       yPos = stegPx.getY();
       var extratPx = extracTImg.getPixel(xPos, yPos);
       
       // Takes the Red value from stegPx, perfrom MODULAR operation
       // (takes the remainder and discards rest) and then shift to right
       // by multiplying by 16 (adding hex-0 to the right of the digit).
       //*************************************************************
       extratPx.setRed( Math.floor(stegPx.getRed()% Math.pow(Bits2Hide,2)) * Math.pow(Bits2Hide,6) );
       extratPx.setGreen( Math.floor(stegPx.getGreen()%Math.pow(Bits2Hide,2)) * Math.pow(Bits2Hide,6) );
       extratPx.setBlue( Math.floor(stegPx.getBlue()%Math.pow(Bits2Hide,2)) * Math.pow(Bits2Hide,6) );
       
   }
   
   return extracTImg;
}



Bits2Hide = 2; // Number of bits to hide
print(original);
print("Modular Operation 125%16 =",  Math.floor(125%16) ); 
print( "Extracted Image");
print(extract(extractMessage)); 
print("Extracted image Pixel @", width/2, height/2);
print(extracTImg.getPixel(width/2, height/2));