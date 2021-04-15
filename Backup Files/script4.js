
var stopPlaying = false;

var someScale = 2;

/// HEADING ////////////
////////////////////////

var heading1Sketch = function(p) {

    p.canvasWidth = 488/someScale;
    p.canvasHeight = 72/someScale;

    p.tilesX = 10;
    p.tilesY = 2;

    p.frameRate = 30;


    p.preload = function(){

        p.img = p.loadImage("assets/heading1.png");

    }

    p.setup = function(){

        p.createCanvas(p.canvasWidth,p.canvasHeight);
        p.background(p.img);


        p.tileWidth = p.int(p.canvasWidth/p.tilesX);
        p.tileHeight = p.int(p.canvasHeight/p.tilesY);



    }

    p.draw = function(){

        if(stopPlaying == true){
            p.background(p.img);
        }else{


            p.background(p.img);

            // console.log(p.tilesX,p.tilesY);



            for (var y = 0; y < p.tilesY; y++){
                for (var x = 0; x < p.tilesX ; x++){        
        
        
                    //CONTROL THE DISORT MOTION USING SINE FUNCTION
                    let wave = p.int(p.sin(p.frameCount * 0.15 + (x * y)) * 30);
        
        
                    //SOURCE
                    let sx = x * p.tileWidth + wave;
                    let sy = y * p.tileHeight;
                    let sw = p.tileWidth;
                    let sh = p.tileHeight;  
        
        
                    //DESTINATION
                    let dx = x * p.tileWidth;
                    let dy = y * p.tileHeight;
                    let dw = p.tileWidth;
                    let dh = p.tileHeight;
                
                
                    p.copy(sx, sy, sw, sh, dx, dy, dw, dh);
        
                
                }
        
            }
        }

    } 
    
    
    p.mousePressed = function(){
        // noLoop()
        stopPlaying = true;
    }
      
    p.mouseReleased = function() {
        // loop();
        stopPlaying = false;
    }


}

var heading2Sketch = function(p) {

    p.canvasWidth = 458/someScale;
    p.canvasHeight = 94/someScale;

    p.tilesX = 5;
    p.tilesY = 2;

    p.frameRate = 30;


    p.preload = function(){

        p.img = p.loadImage("assets/heading2.png");

    }

    p.setup = function(){

        p.createCanvas(p.canvasWidth,p.canvasHeight);
        p.background(p.img);


        p.tileWidth = p.int(p.canvasWidth/p.tilesX);
        p.tileHeight = p.int(p.canvasHeight/p.tilesY);



    }

    p.draw = function(){

    
        // console.log(p.tilesX,p.tilesY);

        if(stopPlaying == true){

            p.background(p.img);

        }else{

            p.background(p.img);

    

            for (var y = 0; y < p.tilesY; y++){
                for (var x = 0; x < p.tilesX ; x++){        
        
        
                    //CONTROL THE DISORT MOTION USING SINE FUNCTION
                    let wave = p.int(p.sin(p.frameCount * 0.15 + (x * y)) * 30);
        
        
                    //SOURCE
                    let sx = x * p.tileWidth + wave;
                    let sy = y * p.tileHeight;
                    let sw = p.tileWidth;
                    let sh = p.tileHeight;  
        
        
                    //DESTINATION
                    let dx = x * p.tileWidth;
                    let dy = y * p.tileHeight;
                    let dw = p.tileWidth;
                    let dh = p.tileHeight;
                
                
                    p.copy(sx, sy, sw, sh, dx, dy, dw, dh);
        
                
                }
        
            }
        }

    }

    p.mousePressed = function(){
        // noLoop()
        stopPlaying = true;
    }
      
    p.mouseReleased = function() {
        // loop();
        stopPlaying = false;
    }




}



/// INFORMATION ////////////
////////////////////////

var informationSketch = function(p) {

    p.canvasWidth = 133/someScale;
    p.canvasHeight = 91/someScale;

    p.tilesX = 6;
    p.tilesY = 9;

    p.frameRate = 30;


    p.preload = function(){

        p.img = p.loadImage("assets/information.png");

    }

    p.setup = function(){

        p.createCanvas(p.canvasWidth,p.canvasHeight);
        p.background(p.img);


        p.tileWidth = p.int(p.canvasWidth/p.tilesX);
        p.tileHeight = p.int(p.canvasHeight/p.tilesY);



    }

    p.draw = function(){


        if(stopPlaying == true){
            p.background(p.img);

        }else{

            p.background(p.img);

            // console.log(p.tilesX,p.tilesY);



            for (var y = 0; y < p.tilesY; y++){
                for (var x = 0; x < p.tilesX ; x++){        
        
        
                    //CONTROL THE DISORT MOTION USING SINE FUNCTION
                    let wave = p.int(p.sin(p.frameCount * 0.15 + (x * y)) * 30);
        
        
                    //SOURCE
                    let sx = x * p.tileWidth + wave;
                    let sy = y * p.tileHeight;
                    let sw = p.tileWidth;
                    let sh = p.tileHeight;  
        
        
                    //DESTINATION
                    let dx = x * p.tileWidth;
                    let dy = y * p.tileHeight;
                    let dw = p.tileWidth;
                    let dh = p.tileHeight;
                
                
                    p.copy(sx, sy, sw, sh, dx, dy, dw, dh);
        
                
                }
        
            }

        }
    }

    p.mousePressed = function(){
        // noLoop()
        stopPlaying = true;
    }
      
    p.mouseReleased = function() {
        // loop();
        stopPlaying = false;
    }
    


}




/// COPY ////////////
////////////////////////

var copy1Sketch = function(p) {

    p.canvasWidth = 722/someScale;
    p.canvasHeight = 71/someScale;

    p.tilesX = 4;
    p.tilesY = 5;

    p.frameRate = 30;


    p.preload = function(){

        p.img = p.loadImage("assets/copy1.png");

    }

    p.setup = function(){

        p.createCanvas(p.canvasWidth,p.canvasHeight);
        p.background(p.img);


        p.tileWidth = p.int(p.canvasWidth/p.tilesX);
        p.tileHeight = p.int(p.canvasHeight/p.tilesY);



    }

    p.draw = function(){

        if(stopPlaying == true){

            p.background(p.img);
        }else {

            p.background(p.img);

        // console.log(p.tilesX,p.tilesY);



            for (var y = 0; y < p.tilesY; y++){
                for (var x = 0; x < p.tilesX ; x++){        
        
        
                    //CONTROL THE DISORT MOTION USING SINE FUNCTION
                    let wave = p.int(p.sin(p.frameCount * 0.15 + (x * y)) * 30);
        
        
                    //SOURCE
                    let sx = x * p.tileWidth + wave;
                    let sy = y * p.tileHeight;
                    let sw = p.tileWidth;
                    let sh = p.tileHeight;  
        
        
                    //DESTINATION
                    let dx = x * p.tileWidth;
                    let dy = y * p.tileHeight;
                    let dw = p.tileWidth;
                    let dh = p.tileHeight;
                
                
                    p.copy(sx, sy, sw, sh, dx, dy, dw, dh);
        
                
                }
        
            }
        }
    }

    p.mousePressed = function(){
        // noLoop()
        stopPlaying = true;
    }
      
    p.mouseReleased = function() {
        // loop();
        stopPlaying = false;
    }

}

var copy2Sketch = function(p) {

    p.canvasWidth = 722/someScale;
    p.canvasHeight = 70/someScale;

    p.tilesX = 4;
    p.tilesY = 5;

    p.frameRate = 30;


    p.preload = function(){

        p.img = p.loadImage("assets/copy2.png");

    }

    p.setup = function(){

        p.createCanvas(p.canvasWidth,p.canvasHeight);
        p.background(p.img);


        p.tileWidth = p.int(p.canvasWidth/p.tilesX);
        p.tileHeight = p.int(p.canvasHeight/p.tilesY);



    }

    p.draw = function(){

        p.background(p.img);

        // console.log(p.tilesX,p.tilesY);



        for (var y = 0; y < p.tilesY; y++){
            for (var x = 0; x < p.tilesX ; x++){        
    
    
                //CONTROL THE DISORT MOTION USING SINE FUNCTION
                let wave = p.int(p.sin(p.frameCount * 0.15 + (x * y)) * 30);
    
    
                //SOURCE
                let sx = x * p.tileWidth + wave;
                let sy = y * p.tileHeight;
                let sw = p.tileWidth;
                let sh = p.tileHeight;  
    
    
                //DESTINATION
                let dx = x * p.tileWidth;
                let dy = y * p.tileHeight;
                let dw = p.tileWidth;
                let dh = p.tileHeight;
            
               
                p.copy(sx, sy, sw, sh, dx, dy, dw, dh);
    
            
            }
    
       }
    }
}

var copy3Sketch = function(p) {

    p.canvasWidth = 722/someScale;
    p.canvasHeight = 70/someScale;

    p.tilesX = 4;
    p.tilesY = 5;

    p.frameRate = 30;


    p.preload = function(){

        p.img = p.loadImage("assets/copy3.png");

    }

    p.setup = function(){

        p.createCanvas(p.canvasWidth,p.canvasHeight);
        p.background(p.img);


        p.tileWidth = p.int(p.canvasWidth/p.tilesX);
        p.tileHeight = p.int(p.canvasHeight/p.tilesY);



    }

    p.draw = function(){

        p.background(p.img);

        // console.log(p.tilesX,p.tilesY);



        for (var y = 0; y < p.tilesY; y++){
            for (var x = 0; x < p.tilesX ; x++){        
    
    
                //CONTROL THE DISORT MOTION USING SINE FUNCTION
                let wave = p.int(p.sin(p.frameCount * 0.15 + (x * y)) * 30);
    
    
                //SOURCE
                let sx = x * p.tileWidth + wave;
                let sy = y * p.tileHeight;
                let sw = p.tileWidth;
                let sh = p.tileHeight;  
    
    
                //DESTINATION
                let dx = x * p.tileWidth;
                let dy = y * p.tileHeight;
                let dw = p.tileWidth;
                let dh = p.tileHeight;
            
               
                p.copy(sx, sy, sw, sh, dx, dy, dw, dh);
    
            
            }
    
       }
    }
}

var copy4Sketch = function(p) {

    p.canvasWidth = 722/someScale;
    p.canvasHeight = 63/someScale;

    p.tilesX = 4;
    p.tilesY = 5;

    p.frameRate = 30;


    p.preload = function(){

        p.img = p.loadImage("assets/copy4.png");

    }

    p.setup = function(){

        p.createCanvas(p.canvasWidth,p.canvasHeight);
        p.background(p.img);


        p.tileWidth = p.int(p.canvasWidth/p.tilesX);
        p.tileHeight = p.int(p.canvasHeight/p.tilesY);



    }

    p.draw = function(){

        p.background(p.img);

        // console.log(p.tilesX,p.tilesY);



        for (var y = 0; y < p.tilesY; y++){
            for (var x = 0; x < p.tilesX ; x++){        
    
    
                //CONTROL THE DISORT MOTION USING SINE FUNCTION
                let wave = p.int(p.sin(p.frameCount * 0.15 + (x * y)) * 30);
    
    
                //SOURCE
                let sx = x * p.tileWidth + wave;
                let sy = y * p.tileHeight;
                let sw = p.tileWidth;
                let sh = p.tileHeight;  
    
    
                //DESTINATION
                let dx = x * p.tileWidth;
                let dy = y * p.tileHeight;
                let dw = p.tileWidth;
                let dh = p.tileHeight;
            
               
                p.copy(sx, sy, sw, sh, dx, dy, dw, dh);
    
            
            }
    
       }
    }
}



/// INSTURCTION ////////////
////////////////////////
var instruction1Sketch = function(p) {

    p.canvasWidth = 607/someScale;
    p.canvasHeight = 47/someScale;

    p.tilesX = 4;
    p.tilesY = 5;

    p.frameRate = 30;


    p.preload = function(){

        p.img = p.loadImage("assets/instruction1.png");

    }

    p.setup = function(){

        p.createCanvas(p.canvasWidth,p.canvasHeight);
        p.background(p.img);


        p.tileWidth = p.int(p.canvasWidth/p.tilesX);
        p.tileHeight = p.int(p.canvasHeight/p.tilesY);



    }

    p.draw = function(){

        p.background(p.img);

        // console.log(p.tilesX,p.tilesY);



        for (var y = 0; y < p.tilesY; y++){
            for (var x = 0; x < p.tilesX ; x++){        
    
    
                //CONTROL THE DISORT MOTION USING SINE FUNCTION
                let wave = p.int(p.sin(p.frameCount * 0.15 + (x * y)) * 30);
    
    
                //SOURCE
                let sx = x * p.tileWidth + wave;
                let sy = y * p.tileHeight;
                let sw = p.tileWidth;
                let sh = p.tileHeight;  
    
    
                //DESTINATION
                let dx = x * p.tileWidth;
                let dy = y * p.tileHeight;
                let dw = p.tileWidth;
                let dh = p.tileHeight;
            
               
                p.copy(sx, sy, sw, sh, dx, dy, dw, dh);
    
            
            }
    
       }
    }
}

var instruction2Sketch = function(p) {

    p.canvasWidth = 607/someScale;
    p.canvasHeight = 43/someScale;

    p.tilesX = 4;
    p.tilesY = 5;

    p.frameRate = 30;


    p.preload = function(){

        p.img = p.loadImage("assets/instruction2.png");

    }

    p.setup = function(){

        p.createCanvas(p.canvasWidth,p.canvasHeight);
        p.background(p.img);


        p.tileWidth = p.int(p.canvasWidth/p.tilesX);
        p.tileHeight = p.int(p.canvasHeight/p.tilesY);



    }

    p.draw = function(){

        p.background(p.img);

        // console.log(p.tilesX,p.tilesY);



        for (var y = 0; y < p.tilesY; y++){
            for (var x = 0; x < p.tilesX ; x++){        
    
    
                //CONTROL THE DISORT MOTION USING SINE FUNCTION
                let wave = p.int(p.sin(p.frameCount * 0.15 + (x * y)) * 30);
    
    
                //SOURCE
                let sx = x * p.tileWidth + wave;
                let sy = y * p.tileHeight;
                let sw = p.tileWidth;
                let sh = p.tileHeight;  
    
    
                //DESTINATION
                let dx = x * p.tileWidth;
                let dy = y * p.tileHeight;
                let dw = p.tileWidth;
                let dh = p.tileHeight;
            
               
                p.copy(sx, sy, sw, sh, dx, dy, dw, dh);
    
            
            }
    
       }
    }
}




//detect zoom level - https://www.geeksforgeeks.org/how-to-detect-page-zoom-level-in-all-modern-browsers-using-javascript/

console.log(document.body.clientWidth + "px x " + document.body.clientHeight + "px");







let heading1 = new p5(heading1Sketch, "heading1");
let heading2 = new p5(heading2Sketch, "heading2");


let information = new p5(informationSketch, "information")

let copy1 = new p5(copy1Sketch, "copy1");
let copy2 = new p5(copy2Sketch, "copy2");
let copy3 = new p5(copy3Sketch, "copy3");
let copy4 = new p5(copy4Sketch, "copy4");

let instruction1 = new p5(instruction1Sketch, "instruction1");
let instruction2 = new p5(instruction2Sketch, "instruction2");

































// //didactic text iamge proportion
// var canvasWidth = 488;
// var canvasHeight = 72;


// //INFORMATION SETTINGS
// canvasWidth = 133;
// canvasHeight = 91;



// //storing didactic text image
// let didacticText;



// //how many tiles/grid
// let tilesX = 11;
// let tilesY = 2;


// //INFORMATION SETTINGS
// // tilesX = 6;
// // tilesY = 9;



// //storing the size of the tiles/grid
// let tileWidth;
// let tileHeight;


// function preload(){

//     didacticText = loadImage("assets/instruction.png"); 

// }


// function setup(){

//     createCanvas(canvasWidth,canvasHeight);
//     background(didacticText);


//     // noFill();
//     // rect(0,0,canvasWidth,canvasHeight);

//     //the width and height of the tiles/grid - takes the integer/whole number only
//     tileWidth = int(canvasWidth/tilesX);
//     tileHeight = int(canvasHeight/tilesY);

// }


// function draw(){


//     ////// TESTING /////
//     ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//     background(didacticText);

//         //don't add the srcImage parameter since the srcImage isn't scaled to fit the Canvas
//         //copy(mouseX, mouseY, 100, 100, canvasWidth/2, canvasHeight/2, 200,200);

//         //    noFill();
//         //    rect(mouseX, mouseY, 100, 100);

 

//     //rect(0,0, tileWidth, tileHeight);





//     ////// KINETIC TYPOGRAPHY  TUTORIAL - https://timrodenbroeker.de/processing-tutorial-kinetic-typography-1/ //////
//     ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//    for (var y = 0; y < tilesY; y++){



//         for (var x = 0; x < tilesX ; x++){

        


//             //CONTROL THE DISORT MOTION USING SINE FUNCTION
//             let wave = int(sin(frameCount * 0.15 + (x * y)) * 30);


//             //SOURCE
//             let sx = x * tileWidth + wave;
//             let sy = y * tileHeight;
//             let sw = tileWidth;
//             let sh = tileHeight;  


//             //DESTINATION
//             let dx = x * tileWidth;
//             let dy = y * tileHeight;
//             let dw = tileWidth;
//             let dh = tileHeight;
        
           
//             copy(sx, sy, sw, sh, dx, dy, dw, dh);

         
//         }


//    }




// }






/* copy function - https://p5js.org/reference/#/p5/copy

copy(srcImage, sx, sy, sw, sh, dx, dy, dw, dh) 
    srcImage is optional if you already called it somewhere?

    s = source (image that is getting copied)
    d = destination 

    coordinate are based on upper left corner


*/



console.log("hello");