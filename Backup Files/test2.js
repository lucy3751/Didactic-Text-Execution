
var activeZoneHit = false;

//stops the motion (for positioning)
activeZoneHit = true;

var someScale = 2;


///TILES GROUP SETTINGS ///////////////
var copyTilesX = 8;
var copyTilesY = 5;

var instructionTilesX = 4;
var instructionTilesY = 5;




////STORING DIMENSIONS ////////////

var heading1Dimensions = {

    canvasWidth: 488/someScale,
    canvasHeight: 72/someScale,
    bottomGap: 44/someScale

};

var heading2Dimensions = {

    canvasWidth: 458/someScale,
    canvasHeight: 94/someScale,
    bottomGap: 84/someScale

};


var informationDimensions ={

    canvasWidth: 133/someScale,
    canvasHeight: 91/someScale,
    topGap: 6/someScale,
    rightGap: 113.35/someScale

}



var copy1Dimensions = {

    canvasWidth: 722/someScale,
    canvasHeight: 71/someScale

};

var copy2Dimensions = {

    canvasWidth: 722/someScale,
    canvasHeight: 70/someScale

};

var copy3Dimensions = {

    canvasWidth: 722/someScale,
    canvasHeight: 70/someScale

};

var copy4Dimensions = {

    canvasWidth: 722/someScale,
    canvasHeight: 63/someScale,
    bottomGap: 62/someScale

};


var instructions1Dimensions = {

    canvasWidth: 607/someScale,
    canvasHeight: 47/someScale

};

var instructions2Dimensions = {

    canvasWidth: 607/someScale,
    canvasHeight: 43/someScale

};







///////////////////// SENSOR  ////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////

var sensorSketch = function (p){


    p.canvaWidth = 600/2;
    p.canvasHeight = 480/2;


    var myCapture; // camera
    var myVida;    // VIDA

    /*
    We will use the sound in this example (so remember to add the p5.Sound
    library to your project if you want to recreate this). This array will be
    used to store oscillators.
    */
    p.synth = [];

    /*
    Here we are trying to get access to the camera.
    */
    p.initCaptureDevice = function() {
    try {
        myCapture = p.createCapture(p.VIDEO);
        myCapture.size(320, 240);
        myCapture.elt.setAttribute('playsinline', '');
        myCapture.hide();
        console.log(
        '[initCaptureDevice] capture ready. Resolution: ' +
        myCapture.width + ' ' + myCapture.height
        );
    } catch(_err) {
        console.log('[initCaptureDevice] capture error: ' + _err);
    }
    }




    p.setup = function() {
    
    //CAMERA IS PART OF THE CANVAS  
    p.createCanvas(p.canvaWidth,p.canvasHeight); // we need some space...
    p.initCaptureDevice(); // and access to the camera

    /*
        VIDA stuff. One parameter - the current sketch - should be passed to the
        class constructor (thanks to this you can use Vida e.g. in the instance
        mode).
    */
    myVida = new p.Vida(this); // create the object
    /*
        Turn on the progressive background mode.
    */
    myVida.progressiveBackgroundFlag = true;
    /*
        The value of the feedback for the procedure that calculates the background
        image in progressive mode. The value should be in the range from 0.0 to 1.0
        (float). Typical values of this variable are in the range between ~0.9 and
        ~0.98.
    */
    myVida.imageFilterFeedback = 0.9;
    /*
        The value of the threshold for the procedure that calculates the threshold
        image. The value should be in the range from 0.0 to 1.0 (float).
    */
    myVida.imageFilterThreshold = 0.15;
    /*
        You may need a horizontal image flip when working with the video camera.
        If you need a different kind of mirror, here are the possibilities:
        [your vida object].MIRROR_NONE
        [your vida object].MIRROR_VERTICAL
        [your vida object].MIRROR_HORIZONTAL
        [your vida object].MIRROR_BOTH
        The default value is MIRROR_NONE.
    */
    myVida.mirror = myVida.MIRROR_HORIZONTAL;
    /*
        In order for VIDA to handle active zones (it doesn't by default), we set
        this flag.
    */
    myVida.handleActiveZonesFlag = true;
    /*
        If you want to change the default sensitivity of active zones, use this
        function. The value (floating point number in the range from 0.0 to 1.0)
        passed to the function determines the movement intensity threshold which
        must be exceeded to trigger the zone (so, higher the parameter value =
        lower the zone sensitivity).
    */
    myVida.setActiveZonesNormFillThreshold(0.5);
    /*
        Let's create several active zones. VIDA uses normalized (in the range from
        0.0 to 1.0) instead of pixel-based. Thanks to this, the position and size
        of the zones are independent of any eventual changes in the captured image
        resolution.
    */
    var padding = 0.6; var n = 2; //how many active zones
    var zoneWidth = 0.1; var zoneHeight = 0.5;
    var hOffset = (1.0 - (n * zoneWidth + (n - 1) * padding)) / 3.0;
    var vOffset = 0.25;
    for(var i = 0; i < n; i++) {
        /*
        addActiveZone function (which, of course, adds active zones to the VIDA
        object) requires the following parameters:
            [your vida object].addActiveZone(
            _id, // zone's identifier (integer or string)
            _normX, _normY, _normW, _normH, // normalized (!) rectangle
            _onChangeCallbackFunction // callback function (triggered on change)
            );
        */
        myVida.addActiveZone(
        i,//id
        hOffset + i * (zoneWidth + padding), vOffset, zoneWidth, zoneHeight,
        onActiveZoneChange
        );
        /*
        For each active zone, we will also create a separate oscillator that we
        will mute/unmute depending on the state of the zone. We use the standard
        features of the p5.Sound library here: the following code just creates an
        oscillator that generates a sinusoidal waveform and places the oscillator
        in the p.synth array.
        */
        p.osc = new p5.Oscillator();
        p.osc.setType('sine');
        /*
        Let's assume that each subsequent oscillator will play 4 halftones higher
        than the previous one (from the musical point of view, it does not make
        much sense, but it will be enough for the purposes of this example). If
        you do not take care of the music and the calculations below seem unclear
        to you, you can ignore this part or access additional information , e.g.
        here: https://en.wikipedia.org/wiki/MIDI_tuning_standard
        */
        p.osc.freq(440.0 * Math.pow(2.0, (60 + (i * 4) - 69.0) / 12.0));
        p.osc.amp(0.0); p.osc.start();
        p.synth[i] = p.osc;
    }

    p.frameRate(20); // set framerate
    }





    p.draw = function() {

        // console.log(activeZone0Hit,activeZone1Hit,activeZone2Hit);

    if(myCapture !== null && myCapture !== undefined) { // safety first
        p.background(0);
        /*
        Call VIDA update function, to which we pass the current video frame as a
        parameter. Usually this function is called in the draw loop (once per
        repetition).
        */
        myVida.update(myCapture);
        /*
        Now we can display images: source video (mirrored) and subsequent stages
        of image transformations made by VIDA.
        */
    
        p.image(myVida.currentImage, 0, 0); //coordinates
        // image(myVida.backgroundImage, 320, 0);
        // image(myVida.differenceImage, 0, 240);
        //image(myVida.thresholdImage, 320, 240);
        // p.image(myVida.thresholdImage, 0, 240);//EDIT BY ME

        // let's also describe the displayed images
        // noStroke(); fill(255, 255, 255);
        // text('camera', 20, 20);
        // text('vida: progressive background image', 340, 20);
        // text('vida: difference image', 20, 260);
        // text('vida: threshold image', 340, 260);
        /*
        In this example, we use the built-in VIDA function for drawing zones. We
        use the version of the function with two parameters (given in pixels)
        which are the coordinates of the upper left corner of the graphic
        representation of zones. VIDA is also equipped with a version of this
        function with four parameters (the meaning of the first and second
        parameter does not change, and the third and fourth mean width and height
        respectively). For example, to draw the zones on the entire available
        surface, use the function in this way:
            [your vida object].drawActiveZones(0, 0, width, height);
        */
        //myVida.drawActiveZones(320, 240);

        ///POSITION OF THE ACTIVE ZONES
        myVida.drawActiveZones(0,0); //EDIT
       


       



    }
    else {
        /*
        If there are problems with the capture device (it's a simple mechanism so
        not every problem with the camera will be detected, but it's better than
        nothing) we will change the background color to alarmistically red.
        */
        p.background(255, 0, 0);
    }
    }

    /*
    This function is called by VIDA when one of the zones changes status (from
    triggered to free or vice versa). An object that stores zone data is passed
    as the parameter to the function.
    */
    function onActiveZoneChange(_vidaActiveZone) {
    /*
        Having access directly to objects that store active zone data, we can read
        or modify the values of individual parameters. Here is a list of parameters
        to which we have access:
        normX, normY, normW, normH - normalized coordinates of the rectangle in
        which active zone is contained (bounding box); you can change these
        parameters if you want to move the zone or change it's size;
        isEnabledFlag - if you want to disable the processing of a given active
        zone without deleting it, this flag will definitely be useful to you; if
        it's value is "true", the zone will be tested, if the variable value is
        "false", the zone will not be tested;
        isMovementDetectedFlag - the value of this flag will be "true" if motion
        is detected within the zone; otherwise, the flag value will be "false";
        isChangedFlag - this flag will be set to "true" if the status (value of
        isMovementDetectedFlag) of the zone has changed in the current frame;
        otherwise, the flag value will be "false";

        changedTime, changedFrameCount - the moment - expressed in milliseconds
        and frames - in which the zone has recently changed it's status (value of
        isMovementDetectedFlag);

        normFillFactor - ratio of the area of the zone in which movement was
        detected to the whole surface of the zone
        normFillThreshold - ratio of the area of the zone in which movement
        was detected to the total area of the zone required to be considered that
        there was a movement detected in the zone; you can modify this parameter
        if you need to be able to set the threshold of the zone individually (as
        opposed to function
        [your vida object].setActiveZonesNormFillThreshold(normVal); 
        which sets the threshold value globally for all zones);
        id - zone identifier (integer or string);
        onChange - a function that will be called when the zone changes status
        (when value of this.isMovementDetectedFlag will be changed); the object
        describing the current zone will be passed to the function as a parameter.
    */
    // print zone id and status to console...



    //   console.log(
    //     'zone: ' + _vidaActiveZone.id +
    //     ' status: ' + _vidaActiveZone.isMovementDetectedFlag
    //   );


      
    

    // ... or do something else, e.g., use this information to control the sound:
    p.synth[_vidaActiveZone.id].amp(0.1 * _vidaActiveZone.isMovementDetectedFlag);


 


    //console.log("ACTIVE ZONE HIT")

    
    //IF ALL 3 ACTIVE ZONES LIGHT UP - NOT WORKING 
    // if(_vidaActiveZone.id == 0){

    //     if(_vidaActiveZone.id == 1){

    //         if(_vidaActiveZone.id ==2){

    //             console.log("ALL ZONES ACTIVE");

    //         }

    //     }

    // }





        //CONTROL ANOTHER P5 SKETCH CANVAS USING ACTIVE ZONE
        if(_vidaActiveZone.isMovementDetectedFlag == true){

            activeZoneHit = true;

        }else if (_vidaActiveZone.isMovementDetectedFlag == false){

            activeZoneHit = false;

        }



    }


}



///////////////////// DIDACTIC TEXT ////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////


/// HEADING ////////////
////////////////////////

var heading1Sketch = function(p) {

    p.canvasWidth = heading1Dimensions.canvasWidth;
    p.canvasHeight = heading1Dimensions.canvasHeight;

    p.tilesX = 10;
    p.tilesY = 2;

    p.frameRate = 30;


    p.preload = function(){

        p.img = p.loadImage("assets/heading1.png");

    }

    p.setup = function(){

        let cnv = p.createCanvas(p.canvasWidth,p.canvasHeight);
        cnv.position(0);

        p.background(p.img);


        p.tileWidth = p.int(p.canvasWidth/p.tilesX);
        p.tileHeight = p.int(p.canvasHeight/p.tilesY);



    }

    p.draw = function(){

        if(activeZoneHit == true){
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
    
    

}

var heading2Sketch = function(p) {

    p.canvasWidth = heading2Dimensions.canvasWidth;
    p.canvasHeight = heading2Dimensions.canvasHeight;

    p.tilesX = 5;
    p.tilesY = 2;

    p.frameRate = 30;


    p.preload = function(){

        p.img = p.loadImage("assets/heading2.png");

    }

    p.setup = function(){
        

        let cnv = p.createCanvas(p.canvasWidth,p.canvasHeight);

        cnv.position(0, heading1Dimensions.canvasHeight + heading1Dimensions.bottomGap);
        

        p.background(p.img);


        p.tileWidth = p.int(p.canvasWidth/p.tilesX);
        p.tileHeight = p.int(p.canvasHeight/p.tilesY);



    }

    p.draw = function(){

    
        // console.log(p.tilesX,p.tilesY);

        if(activeZoneHit == true){

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


}



/// INFORMATION ////////////
////////////////////////

var informationSketch = function(p) {

    p.canvasWidth = informationDimensions.canvasWidth;
    p.canvasHeight = informationDimensions.canvasHeight;

    p.tilesX = 6;
    p.tilesY = 9;

    p.frameRate = 30;


    p.preload = function(){

        p.img = p.loadImage("assets/information.png");

    }

    p.setup = function(){

        let cnv = p.createCanvas(p.canvasWidth,p.canvasHeight);
        cnv.position(0,     heading1Dimensions.canvasHeight + heading1Dimensions.bottomGap + heading2Dimensions.canvasHeight + heading2Dimensions.bottomGap + informationDimensions.topGap);



        p.background(p.img);


        p.tileWidth = p.int(p.canvasWidth/p.tilesX);
        p.tileHeight = p.int(p.canvasHeight/p.tilesY);



    }

    p.draw = function(){


        if(activeZoneHit == true){
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




}



/// COPY ////////////
////////////////////////

var copy1Sketch = function(p) {

    p.canvasWidth = copy1Dimensions.canvasWidth;
    p.canvasHeight = copy1Dimensions.canvasHeight;

    p.tilesX = copyTilesX;
    p.tilesY = copyTilesY;

    p.frameRate = 30;


    p.preload = function(){

        p.img = p.loadImage("assets/copy1.png");

    }

    p.setup = function(){

        let cnv = p.createCanvas(p.canvasWidth,p.canvasHeight);
        cnv.position( informationDimensions.canvasWidth  + informationDimensions.rightGap,   heading1Dimensions.canvasHeight + heading1Dimensions.bottomGap + heading2Dimensions.canvasHeight + heading2Dimensions.bottomGap);

        
        p.background(p.img);


        p.tileWidth = p.int(p.canvasWidth/p.tilesX);
        p.tileHeight = p.int(p.canvasHeight/p.tilesY);



    }

    p.draw = function(){

        if(activeZoneHit == true){

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

}

var copy2Sketch = function(p) {

    p.canvasWidth = copy2Dimensions.canvasWidth;
    p.canvasHeight = copy2Dimensions.canvasHeight;

    p.tilesX = copyTilesX;
    p.tilesY = copyTilesY;

    p.frameRate = 30;


    p.preload = function(){

        p.img = p.loadImage("assets/copy2.png");

    }

    p.setup = function(){

        let cnv = p.createCanvas(p.canvasWidth,p.canvasHeight);
        cnv.position( informationDimensions.canvasWidth  + informationDimensions.rightGap,   heading1Dimensions.canvasHeight + heading1Dimensions.bottomGap + heading2Dimensions.canvasHeight + heading2Dimensions.bottomGap + copy1Dimensions.canvasHeight);


        p.background(p.img);


        p.tileWidth = p.int(p.canvasWidth/p.tilesX);
        p.tileHeight = p.int(p.canvasHeight/p.tilesY);



    }

    p.draw = function(){



        if(activeZoneHit == true){

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
}

var copy3Sketch = function(p) {

    p.canvasWidth = copy3Dimensions.canvasWidth;
    p.canvasHeight = copy3Dimensions.canvasHeight;

    p.tilesX = copyTilesX;
    p.tilesY = copyTilesY;

    p.frameRate = 30;


    p.preload = function(){

        p.img = p.loadImage("assets/copy3.png");

    }

    p.setup = function(){

        let cnv = p.createCanvas(p.canvasWidth,p.canvasHeight);
        cnv.position( informationDimensions.canvasWidth  + informationDimensions.rightGap,   heading1Dimensions.canvasHeight + heading1Dimensions.bottomGap + heading2Dimensions.canvasHeight + heading2Dimensions.bottomGap + copy1Dimensions.canvasHeight + copy2Dimensions.canvasHeight);

        p.background(p.img);


        p.tileWidth = p.int(p.canvasWidth/p.tilesX);
        p.tileHeight = p.int(p.canvasHeight/p.tilesY);



    }

    p.draw = function(){


        if(activeZoneHit == true){

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
}

var copy4Sketch = function(p) {

    p.canvasWidth = copy4Dimensions.canvasWidth;
    p.canvasHeight = copy4Dimensions.canvasHeight;

    p.tilesX = copyTilesX;
    p.tilesY = copyTilesY;

    p.frameRate = 30;


    p.preload = function(){

        p.img = p.loadImage("assets/copy4.png");

    }

    p.setup = function(){

        let cnv = p.createCanvas(p.canvasWidth,p.canvasHeight);
        cnv.position( informationDimensions.canvasWidth  + informationDimensions.rightGap,   heading1Dimensions.canvasHeight + heading1Dimensions.bottomGap + heading2Dimensions.canvasHeight + heading2Dimensions.bottomGap + copy1Dimensions.canvasHeight + copy2Dimensions.canvasHeight + copy3Dimensions.canvasHeight);


        p.background(p.img);


        p.tileWidth = p.int(p.canvasWidth/p.tilesX);
        p.tileHeight = p.int(p.canvasHeight/p.tilesY);



    }

    p.draw = function(){

        if(activeZoneHit == true){

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
}



/// INSTURCTION ////////////
////////////////////////
var instruction1Sketch = function(p) {

    p.canvasWidth = instructions1Dimensions.canvasWidth;
    p.canvasHeight = instructions1Dimensions.canvasHeight;

    p.tilesX = instructionTilesX;
    p.tilesY = instructionTilesY;

    p.frameRate = 30;


    p.preload = function(){

        p.img = p.loadImage("assets/instruction1.png");

    }

    p.setup = function(){

        let cnv = p.createCanvas(p.canvasWidth,p.canvasHeight);
        cnv.position( informationDimensions.canvasWidth  + informationDimensions.rightGap,   heading1Dimensions.canvasHeight + heading1Dimensions.bottomGap + heading2Dimensions.canvasHeight + heading2Dimensions.bottomGap + copy1Dimensions.canvasHeight + copy2Dimensions.canvasHeight + copy3Dimensions.canvasHeight + copy4Dimensions.canvasHeight + copy4Dimensions.bottomGap);


        p.background(p.img);


        p.tileWidth = p.int(p.canvasWidth/p.tilesX);
        p.tileHeight = p.int(p.canvasHeight/p.tilesY);



    }

    p.draw = function(){

        if(activeZoneHit == true){


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
}

var instruction2Sketch = function(p) {

    p.canvasWidth = instructions2Dimensions.canvasWidth;
    p.canvasHeight = instructions2Dimensions.canvasHeight;

    p.tilesX = instructionTilesX;
    p.tilesY = instructionTilesY;

    p.frameRate = 30;


    p.preload = function(){

        p.img = p.loadImage("assets/instruction2.png");

    }

    p.setup = function(){

        let cnv = p.createCanvas(p.canvasWidth,p.canvasHeight);
        cnv.position( informationDimensions.canvasWidth  + informationDimensions.rightGap,   heading1Dimensions.canvasHeight + heading1Dimensions.bottomGap + heading2Dimensions.canvasHeight + heading2Dimensions.bottomGap + copy1Dimensions.canvasHeight + copy2Dimensions.canvasHeight + copy3Dimensions.canvasHeight + copy4Dimensions.canvasHeight + copy4Dimensions.bottomGap + instructions1Dimensions.canvasHeight);

        p.background(p.img);


        p.tileWidth = p.int(p.canvasWidth/p.tilesX);
        p.tileHeight = p.int(p.canvasHeight/p.tilesY);



    }

    p.draw = function(){

        if(activeZoneHit == true){

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
}







//////// FUNCTION CALLS //////////////

///SENSOR
// let vidaSketch = new p5(sensorSketch, "cameraContainer");


///DIDACTIC TEXT
let heading1 = new p5(heading1Sketch, "heading1");
let heading2 = new p5(heading2Sketch, "heading2");

let information = new p5(informationSketch, "information")

let copy1 = new p5(copy1Sketch, "copy1");
let copy2 = new p5(copy2Sketch, "copy2");
let copy3 = new p5(copy3Sketch, "copy3");
let copy4 = new p5(copy4Sketch, "copy4");

let instruction1 = new p5(instruction1Sketch, "instruction1");
let instruction2 = new p5(instruction2Sketch, "instruction2");



console.log("end");