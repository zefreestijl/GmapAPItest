
var mpp = document.getElementById('map1');

var h1 = document.getElementById('h1'); var h2 = document.getElementById('h2');

var b1 = document.getElementById('b1'); var b2 = document.getElementById('b2');
var b3 = document.getElementById('b3'); var b4 = document.getElementById('b4');

var f1 = document.getElementById('f1'); var p1 = document.getElementById('p1');
var f2 = document.getElementById('f2'); var p2 = document.getElementById('p2'); 
var b5 = document.getElementById('b5');



var test11 = document.getElementById("test1");
var c1 = document.getElementById("census-var1");

test1.innerHTML = "Viewport Center: / Min: / Max: / ";
h2.innerHTML = circle1;

//google.maps.event.addDomListener(c1, "change", () => setFeature() );

// 00-0. Simulate Keydown Events
document.addEventListener('keydown', function(e) { { pressZoom(e); } });
document.addEventListener('keydown', function(e) { { pressMove(e); } });

function pressMove(e)
{ 
    if ( e.ctrlKey && e.keyCode == 38 ) { map1.panBy(0, -800) ; } //Up 
    else if ( e.ctrlKey && e.keyCode == 40 ) { map1.panBy(0, 800) ; } //Down
    else if ( e.ctrlKey && e.keyCode == 37 ) { map1.panBy(-1200, -0) ; } //Left
    else if ( e.ctrlKey && e.keyCode == 39 ) { map1.panBy(1200, 0) ; } //Right
}

function pressZoom(e)
{ 
    if ( e.shiftKey && e.keyCode == 109 ) { map1.setZoom(map1.getZoom()-1) ; } //-
    else if ( e.shiftKey && e.keyCode == 107 ) { map1.setZoom(map1.getZoom()+1) ; } //+


    else if ( e.shiftKey && e.keyCode == 13 ) 
    {  drawRectangle(); map1.setZoom(10); map1.setCenter(rect1.getBounds().getCenter());  } 
}




//
function setFeature()
{
    var mapStyle1 = new Array();

    getMapData();
    
    if (c1.value == "Blocks")
    {        
        var latlng1 = map1.getCenter(), zoom1 = map1.getZoom();
        initMap(); map1.setCenter(latlng1); map1.setZoom(zoom1);
        map1.setOptions({ rotateControl: true,  "tilt": 0, "heading": 0}); 
        //map1.setOptions({ mapTypeControl: false, mapId: '2d1d233e43a7a05a' }); 
    }

    else if (c1.value != "All") 
    { 
        mapStyle1.push({ 'featureType' : 'all', 'elementType' : 'all', 'stylers' : [{'visibility' : 'off'}] });
        mapStyle1.push({ 'featureType' : 'water', 'elementType' : 'labels', 'stylers' : [{'visibility' : 'off'}] });
        mapStyle1.push( { 'featureType' : 'landscape', 'elementType' : 'geometry', 'stylers' : [{'visibility' : 'on'}, {'color' : '#fcfcfc'}] });
        mapStyle1.push({ 'featureType' : 'water', 'elementType' : 'geometry', 'stylers' : [{'visibility' : 'on'}, {'lightness':60} ] });
        mapStyle1.push({ 'featureType' : 'administrative', 'elementType' : 'geometry', 'stylers' : [{'visibility' : 'on'},  {'color' : '#ff0000'}] });

        map1.setMapTypeId('roadmap');
    }
    
    else 
    { 
        mapStyle1.push({ 'featureType' : 'all', 'elementType' : 'all', 'stylers' : [{'visibility' : 'on'}] });

    }

    if (c1.value == "Landscape") 
    {   
        mapStyle1.push({ 'featureType' : 'landscape', 'elementType' : 'labels.text', 'stylers' : [{'visibility' : 'on'}] });
        mapStyle1.push({ 'featureType' : 'landscape.man_made', 'elementType' : 'labels.text', 'stylers' : [{'visibility' : 'off'}] });

        map1.setMapTypeId('terrain');
    }

    else if (c1.value == "Water")
    {
        mapStyle1.push({ 'featureType' : 'water', 'elementType' : 'geometry', 'stylers' : [{'visibility' : 'on'},  {'color' : '#3399ff'}] });
        mapStyle1.push({ 'featureType' : 'water', 'elementType' : 'labels.text', 'stylers' : [{'visibility' : 'on'}] });

    }

    else if (c1.value == "Street")
    {    
        mapStyle1.push({ 'featureType' : 'road.arterial', 'elementType' : 'geometry', 'stylers' : [{'visibility' : 'on'},  {'color' : '#b3b3b3'}] });
        mapStyle1.push({ 'featureType' : 'road.highway', 'elementType' : 'geometry', 'stylers' : [{'visibility' : 'on'},  {'color' : '#e6e6e6'}] });
        mapStyle1.push({ 'featureType' : 'road.local', 'elementType' : 'geometry', 'stylers' : [{'visibility' : 'on'},  {'color' : '#d9d9d9'}] });
        mapStyle1.push({ 'featureType' : 'road', 'elementType' : 'labels.text', 'stylers' : [{'visibility' : 'on'}] });

        map1.setMapTypeId('roadmap');
    }

    else if (c1.value == "Transit")
    {
        mapStyle1.push({ 'featureType' : 'transit', 'elementType' : 'geometry', 'stylers' : [{'visibility' : 'on'},  {'color' : '#ff8c1a'}] });
        mapStyle1.push({ 'featureType' : 'transit', 'elementType' : 'labels', 'stylers' : [{'visibility' : 'on'}] });
        mapStyle1.push({ 'featureType' : 'road', 'elementType' : 'geometry', 'stylers' : [{'visibility' : 'on'},  {'color' : '#f2f2f2'}] });

        map1.setMapTypeId('roadmap');
    }

    else if (c1.value == "PointOfInterest")
    {
        mapStyle1.push({ 'featureType' : 'poi', 'elementType' : 'geometry', 'stylers' : [{'visibility' : 'on'},  {'color' : '#b3e6b3'}] });
        mapStyle1.push({ 'featureType' : 'poi', 'elementType' : 'labels.text', 'stylers' : [{'visibility' : 'on'}] });
        mapStyle1.push({ 'featureType' : 'road', 'elementType' : 'geometry', 'stylers' : [{'visibility' : 'on'},  {'color' : '#f2f2f2'}] });

    }

    else if (c1.value == "Building")
    {

        //mapStyle1.push({ 'featureType' : 'road', 'elementType' : 'geometry', 'stylers' : [{'visibility' : 'on'},  {'color' : '#f2f2f2'}] });
        map1.setMapTypeId('hybrid');
    }



    //initMap();
    map1.setOptions({ styles: mapStyle1 });

}


c1.addEventListener("change", setFeature, false);



var map1;
var censusMin1 = Number.MAX_VALUE, censusMax1 = -Number.MAX_VALUE;
var lat0 = 32.0584, lng0 = 118.7965;
//var lat0 = 40, lng0 = -100;

Window.onload = initMap();

function initMap()
{
    // 00-0. Initiate Map & Style Visulizations
    map1 = new google.maps.Map(mpp, 
        {
            //mapId: '2d1d233e43a7a05a',
            center: {lat: lat0, lng: lng0}, zoom: 10, styles: mapStyle1, 
            
             // Disabled controls
            streetViewControl: false,
            keyboardShortcuts: false,

            // Zoom control
            zoomControl: true,
            zoomControlOptions: 
            {
                style: google.maps.ZoomControlStyle.SMALL,
                position: google.maps.ControlPosition.RIGHT_TOP
            },
            //minZoom: 10 -0.1,
            //maxZoom: 10 +0.1,

            // Disable scrollwheel and double-click zooming
            scrollwheel: true,
            disableDoubleClickZoom: true,

            // Disable Map Type Control & Set Type
            mapTypeControl: false,
            //mapTypeId:google.maps.MapTypeId.HYBRID


        } );

    //map1.setTilt(45);

    mpp.gMap = map1;
    map1.data.setStyle();
    circleArr1 = [];
    h1.innerHTML = 'Current Zoom Level: ' + map1.getZoom() + ' ( Approx. 52 km. )';
    
}
// 00-1. Get Posistions
mpp.addEventListener("click", getMapData , false);
//mpp.addEventListener("doubleclick", drawCircle(e) , false);

var latDist1; var lngDist1;

function getMapData()
{
    test1.innerHTML = "Viewport Center: (" + Math.round(map1.getCenter().lat()*10000)/10000  + ", " +  Math.round(map1.getCenter().lng()*10000)/10000 + ")"
    + " / Min: (" + Math.round(map1.getBounds().getSouthWest()*10000)/10000  + ", " +  Math.round(map1.getBounds()*10000)/10000 + ")"
    + " / Max: ("  + Math.round(map1.getBounds().getNorthEast()*10000)/10000  + ", " +  Math.round(map1.getBounds().getNorthEast()*10000)/10000 + ")";

    var zoom2km; 
    if ( map1.getZoom() == 10 ) { zoom2km = 52; }
    else { zoom2km = Math.round( (52 / Math.pow(2, map1.getZoom()-10 ) *1000) ) /1000;  }

    try
    {
        h1.innerHTML = 'Current Zoom Level: ' + map1.getZoom() + ' ( Approx. ' +zoom2km+ ' km. )';
    } catch{}

    latDist1 = map1.getBounds().getSouthWest().lat() - map1.getCenter().lat();
    lngDist1 = map1.getBounds().getSouthWest().lng() - map1.getCenter().lng();

    //console.log( map1.getZoom()+ ": "+ latDist1 +", " + lngDist1)
}

map1.addListener("zoom_changed", getMapData );



// 00-2a. Draw Circle
var circle1 = new google.maps.Circle();
var circleArr1 = [];
var cirRad1 = 10000;
var cirVis1 = true;

function drawCircle(pos1)
{       
    for (var i = 0; i < circleArr1.length; i++) 
    { 
        circleArr1[i].setMap(null);
        if (i == circleArr1.length-1){ circleArr1 = []; }
    }
    try
    {
        circle1 = new google.maps.Circle
        ({ map: map1, radius: cirRad1, fillColor: '#ffffb3', strokeColor: "#cc8800", editable: true, center: pos1, clickable: true});
        circleArr1.push(circle1);
    }
    catch{}
    
    circleHideTemp = false;
    getShapeData();
}

map1.addListener("dblclick", (e) => { drawCircle(e.latLng); } );
//google.maps.event.addListener(map1, 'rightclick', getShapeData);  
//google.maps.event.addListener(map1, 'rightclick', function(e) { getShapeData(e) } );  

document.addEventListener("mouseup", function(e)  { getShapeData(e); }  , false);


function showCircle()
{
    if (circleArr1.length < 1) { drawCircle(map1.getCenter()); return;}

    var cc = circleArr1[0];
    getShapeData() 

    if (cirVis1 == true)
    { cc.setOptions({ visible: false }); cirVis1 = false; }
    else
    { cc.setOptions({ visible: true }); cirVis1 = true; }
}


function getShapeData(e) 
{ 
    // Get Circle Radius
    var cirRadNew1 = Math.round(circle1.getRadius()/1000*100)/100;

    if (!rect1) { h2.innerHTML = "Scope Radius: " + cirRadNew1 + " km." + " // " + circleArr1.length ; return}

    // Get Rectangle Bounds
    var recLat1 = Math.round(rect1.getBounds().getSouthWest().lat()*10000)/10000;
    var recLng1 = Math.round(rect1.getBounds().getSouthWest().lng()*10000)/10000;
    var recLat2 = Math.round(rect1.getBounds().getNorthEast().lat()*10000)/10000;
    var recLng2 = Math.round(rect1.getBounds().getNorthEast().lng()*10000)/10000;



    h2.innerHTML = "Scope Radius: " + cirRadNew1 + " km." + " / Region Min: (" + recLat1 + ", "+ recLng1 +
    ") / Max:  (" + recLat2 + ", "+ recLng2 + ")";
    
    
    if (e) 
    {
        if (rectVis1 == true) { drawRectGrids();  };
        return;
    }
}


// 00-2b. Draw Rectangle
var rect1;
var rectVis1;

function drawRectangle()
{
    var pos1 = map1.getCenter();

    if (!rect1) 
    {
        rect1 = new google.maps.Rectangle ({ fillColor: '#ffffb3', strokeColor: "#cc8800", editable: true, draggable: false,
        bounds: { north: pos1.lat()+0.1, south: pos1.lat()-0.1, east: pos1.lng()+0.2, west:  pos1.lng()-0.2, }, });

        rect1.setMap(map1); rectVis1 = true; drawRectGrids(); return;
    }
    else if (rectVis1 == true)
    { 
        rect1.setOptions({ visible: false }); rectVis1 = false; 
        
        for (var i = 0; i < vertLineArr1.length; i++) 
        { vertLineArr1[i].setMap(null); if (i == vertLineArr1.length-1){ vertLineArr1 = []; } }
    
        for (var i = 0; i < horizLineArr1.length; i++) 
        { horizLineArr1[i].setMap(null);  if (i == horizLineArr1.length-1){ horizLineArr1 = []; } }
    }

    else if (rect1 && rectVis1 == false) { rect1.setOptions({ visible: true }); rectVis1 = true; drawRectGrids(); }


}


b3.addEventListener("click", showCircle , false);
b4.addEventListener("click", drawRectangle , false);
f1.addEventListener("click", drawRectGrids , false);


var vertLineArr1 = [], horizLineArr1 = [];

function drawRectGrids()
{
    if(!rect1) { return;}
    
    // Get Region Min & Max
    var recLat1 = Math.round(rect1.getBounds().getSouthWest().lat()*10000)/10000;
    var recLng1 = Math.round(rect1.getBounds().getSouthWest().lng()*10000)/10000;
    var recLat2 = Math.round(rect1.getBounds().getNorthEast().lat()*10000)/10000;
    var recLng2 = Math.round(rect1.getBounds().getNorthEast().lng()*10000)/10000;

    //console.log( f1.value );
    
    var zoom2lat, zoom2lng;
    if (f1.value == 13) { zoom2lat = 0.05817418706974564; zoom2lng = 0.102996826171875;}
    else if (f1.value == 14) { zoom2lat = 0.029091723085869603; zoom2lng = 0.0514984130859375;}
    else if (f1.value == 15) { zoom2lat = 0.01454701864628305; zoom2lng = 0.02574920654296875;}
    else if (f1.value == 16) { zoom2lat = 0.007273798563396383; zoom2lng = 0.012874603271484375;}
    else if (f1.value == 17) { zoom2lat = 0.0036369715873192376; zoom2lng = 0.0064373016357421875;}


    p1.innerHTML = Math.ceil((recLng2-recLng1) / (zoom2lng*2)) + 'x' + Math.ceil((recLat2-recLat1) / (zoom2lat*2));

    // Draw Vertical Lines
    for (var i = 0; i < vertLineArr1.length; i++) 
    {  vertLineArr1[i].setMap(null); if (i == vertLineArr1.length-1){ vertLineArr1 = []; } }

    for (var i = 1; i < (recLat2-recLat1) / (zoom2lat*2); i++)
    {
        var linePath1 = [ { lat: (recLat1 + zoom2lat*2 * i), lng: (recLng1) }, 
            { lat: (recLat1 + zoom2lat*2 * i), lng: (recLng2) } ];
        var vertLine1 = new google.maps.Polyline({ path: linePath1, strokeColor: '#aaa', strokeWeight: 1, });

        vertLineArr1.push(vertLine1);
        vertLine1.setMap(map1);
    }
    
    // Draw Horizontal Lines
    for (var i = 0; i < horizLineArr1.length; i++) 
    { horizLineArr1[i].setMap(null);  if (i == horizLineArr1.length-1){ horizLineArr1 = []; } }

    for (var i = 1; i < (recLng2-recLng1) / (zoom2lng*2); i++)
    {
        var linePath1 = [ { lat: (recLat1), lng: (recLng1 + zoom2lng*2 * i) }, 
            { lat: (recLat2), lng:  (recLng1 + zoom2lng*2 * i)  } ];
        var horizLine1 = new google.maps.Polyline({ path: linePath1, strokeColor: '#aaa', strokeWeight: 1, });
    
        horizLineArr1.push(horizLine1);
        horizLine1.setMap(map1);
    }

    // Set Estimated Render Time
    setRenderTime();


    getMapData();
}




// 00-4a. Capture Map Images
b1.addEventListener("click", html2canvas2, true );
b1.addEventListener("mouseover", hideMapUI, false);
b1.addEventListener("mouseout",  showMapUI, false );

var circleHideTemp;
var rectHideTemp;

function hideMapUI()
{
    // Hide UI & Shapes
    map1.setOptions({ disableDefaultUI: true, zoomControl: false  }); 

    
    var cc = circleArr1[0];
    if ( cc &&  cirVis1 == true )
    {
        cc.setOptions({ visible: false }); cirVis1 = false;

        circleHideTemp = true;
    }


    if ( rect1 && rectVis1 == true )
    {
        for (var i = 0; i < vertLineArr1.length; i++) 
        {  vertLineArr1[i].setMap(null);  }
        for (var i = 0; i < horizLineArr1.length; i++) 
        { horizLineArr1[i].setMap(null); }

        rect1.setOptions({ visible: false }); rectVis1 = false;

        rectHideTemp = true;
    }



    if (map1.data.map.zoomControl != false)
    { map1.setOptions({ zoomControl: false}); }
}

function showMapUI()
{
    // Show UI & Shapes
    map1.setOptions({ disableDefaultUI: false, zoomControl: true }); 

    if (rectHideTemp == true)
    {
        try
        {
            for (var i = 0; i < vertLineArr1.length; i++) 
            {  vertLineArr1[i].setMap(map1);  }
            for (var i = 0; i < horizLineArr1.length; i++) 
            { horizLineArr1[i].setMap(map1); }
        
            rect1.setOptions({ visible: true }); rectVis1 = true;
        }catch{}

        rectHideTemp = false;
    }
    
    if (circleHideTemp == true)
    {
        try
        {         
            var cc = circleArr1[0];
            cc.setOptions({ visible: true }); cirVis1 = true;
        }catch {}

        circleHideTemp = false;
    }

}


function html2canvas2()
{        
    // Save File to Previous Download Location
    const a = document.createElement('a');
    var prefix1 = c1.value[0]+c1.value[1]+c1.value[2]+'_';

    var fileName1 = f2.value;

    if (f2.value.includes(' ') == true) 
    { 
        var lngC1 = f2.value.split(' ')[0];
        var latC1 = f2.value.split(' ')[1];

        fileName1 = lngC1 + "-" + latC1;
    }

    html2canvas(document.querySelector("#map1"), { backgroundColor: null, useCORS: true}).
    then(canvas => 
        { 
        document.body.appendChild(canvas); canvas.style.display="none"; var img1 = canvas.toDataURL("image/png"); 
        //console.log(img1);

        document.body.appendChild(a);
        a.href = img1;
        a.download = prefix1 + fileName1+'.png';
        a.click();
        document.body.removeChild(a);

        }  );

}

console.log(map1.data);


function sleep(num) {
    let now = new Date();
    let stop = now.getTime() + num;
    while(true) {
        now = new Date();
        if(now.getTime() > stop) return;
    }
}


// 00-4b. Batch Capture Region Images


document.addEventListener('keydown', function(e) { { dnCapture(e); } });

document.addEventListener('keyup', function(e) { { upCapture(e); } });

function dnCapture(e) { hideMapUI(); }

f2.addEventListener('change', zoom1index );
//p2.addEventListener('change', zoom2index );
//f2.addEventListener('mouseover', zoom0index1, true );

var timeoutId = null;
f2.addEventListener('mouseover', function() { timeoutId = window.setTimeout( zoom0index1, 1000);} );
f2.addEventListener('mouseout', function() { window.clearTimeout(timeoutId); timeoutId = null; });

b5.addEventListener('mouseover', function() { timeoutId = window.setTimeout( zoom0index, 1000);} );
b5.addEventListener('mouseout', function() { window.clearTimeout(timeoutId); timeoutId = null; });





b5.addEventListener('click', batchCapture );

var setIntervalRow1;
var setIntervalCol1;
var waitSec1;

// Set Render Time Manually
function setRenderTime()
{
    var zLevel1 = Number(f1.value);
    if (zLevel1 == 13) { waitSec1 = 10000; }
    else if (zLevel1 == 14) { waitSec1 = 12000; }
    else if (zLevel1 == 15) { waitSec1 = 15000; }
    else if (zLevel1 == 16) { waitSec1 = 17000; }
    else if (zLevel1 == 17) { waitSec1 = 20000; }

    p2.innerHTML = 'approx. ' + Number(waitSec1)/1000 + 'sec. per Tile.' ;
}



function batchCapture()
{
    hideMapUI();

    var tempColor1 = document.getElementById("b5").style.background;
    document.getElementById("b5").style.background='#333';

    setRenderTime();

    if (f2.value.includes(' ') != true) {return; }
    if (!rect1) { drawRectangle() }
    var lngC1 = 1;
    var latC1 = p1.innerHTML.split('x')[1];

    var lngC2 = p1.innerHTML.split('x')[0];
    //var latC2 = p1.innerHTML.split('x')[1];


    setIntervalRow1 = window.setInterval( function ()
    {        
        batch2canvas2(map1, 1, 0); 

        lngC1 = Number(lngC1) + 1;  
        f2.value = latC1 + ' ' + lngC1; 
        
        p2.innerHTML = 'Row.' + latC1 +' : ' + Number(waitSec1)/1000 + 'sec. x ' 
        + (Number(lngC2) - Number(lngC1) + 1) + ' / ' + lngC2;

        
        if (lngC1 > lngC2 && latC1 > 1)
        {   
            latC1 = Number(latC1) - 1;  
            lngC1 = 1;
            f2.value = latC1 + ' ' + lngC1; 
            zoom1index();
        }

        
        if (lngC1 > lngC2 && latC1 == 1) 
        {         
            clearInterval(setIntervalRow1); 
            //f2.value = '1 1'; 
            showMapUI();  
            document.getElementById("b5").style.background= tempColor1;  
        } 
       

    }, Number(waitSec1)  )

}

function zoom0index1()
{
    showMapUI();
    drawRectangle();
    if (f2.value == '1 1') { f2.value == '1'; }
    zoom1index(); 
}



function zoom0index()
{    
    showMapUI();
    drawRectangle();

    var lngC2 = p1.innerHTML.split('x')[0];
    var latC2 = p1.innerHTML.split('x')[1];
    f2.value = latC2 + ' 1'; 

    zoom1index(); 
    window.clearTimeout(timeoutId); 
    timeoutId = null;


}



function zoom1index()
{
    if (f2.value == 1) { f2.value = '1 1'; }
    if (f2.value.includes(' ') != true) {return; }
    if (!rect1) { drawRectangle() }
    var latC1 = f2.value.split(' ')[1];
    var lngC1 = f2.value.split(' ')[0];

    if ( latC1.match(/^[0-9]+$/) == null ) { return; }
    if ( lngC1.match(/^[0-9]+$/) == null ) { return; }

    

    p2.innerHTML = f2.value;
    
    zoom2index()
}


function zoom2index()
{
    var latC1 = p2.innerHTML.split(' ')[1];
    var lngC1 = p2.innerHTML.split(' ')[0];

    map1.setZoom(Number(f1.value));
    single2canvas2 (latC1-1, lngC1-1);
   
}

function upCapture(e)
{         
    //
    if ( e.ctrlKey && e.keyCode == 35 ) 
    {        
        
        
    } 

    showMapUI();

}

function single2canvas2( tileH = 1, tileV = 1 )
{       

   // Get Region Min & Max
   var recLat1 = Number(rect1.getBounds().getSouthWest().lat() );
   var recLng1 = Number(rect1.getBounds().getSouthWest().lng() );


   // Get Viewport Min & Max Distance

   var centerNew1 = {lat: Number( Number(recLat1) - Number(latDist1)), lng: Number( Number(recLng1) - Number(lngDist1))};

   map1.setCenter(centerNew1);
   map1.panBy(Number(1200 * (tileH)), Number(-800 * (tileV)));
 
       
   //html2canvas2(); 
   sleep(100);
   console.log("_s" + tileH + "-" + tileV); 

}





//


function batch2canvas2(map1, tileH = 1, tileV = 1)
{       

    map1.setZoom(Number(f1.value));


   // Get Viewport Min & Max Distance
    /*
   var centerNew1 = {lat: Number( Number(recLat1) - Number(latDist1)), lng: Number( Number(recLng1) - Number(lngDist1))};
   map1.setCenter(centerNew1);
   */
   map1.panBy(Number(1200 * (tileH)), Number(-800 * (tileV)));
 
   html2canvas2(); 
   sleep(500);
   console.log("_" + tileH + "-" + tileV); 

}


//google.maps.event.addListener(map1, 'idle',  function() { console.log( "tt1. "+ map1.getCenter()) }  );








// 00-3. 3D Buildings


var mapStyle1 = 
[
    // Turn off all Features -> Draw Land White -> Turn off Water Label -> Draw Water Blue
    

];
