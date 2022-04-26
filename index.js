<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name = "viewport" content="initial-scale=1.0, user-scalable=no" />

        <title>Add Map</title>
        <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
        <link rel="stylesheet" type="text/css" href="./style.css" />
        <script src="https://unpkg.com/@googlemaps/markerclusterer/dist/index.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
        
    </head>

    <body>
        <h1  id="h1" class="dataInfo1" >Data1</h1>
        <h1  id="h2" class="dataInfo1" >Data2</h1>
        <button id="b5" class="button1">Batch Capture</button>

        <button id="b3" style="Top: 100px; " class="button1">Show Circle</button>
        <button id="b4" style="Top: 130px; " class="button1">Show Region</button>
    
        <input class="form1" style="top: 160px; " id="f1" type="number" min="13" max="17" value="13" > 
        <input class="form1"  style="top: 200px; z-index: 1;" id="f2" value="1 1" type="text"  > 
        <button id="b1" style="Top: 202px; width: 40px; left: 70px;"  class="button1">Run </button>

        <p class="form1" id="p1" style="left: 75px; top: 145px; font-size: 17px; width: 100px;" > 1x1 </p>
        <div id = 'd2'>
            <p class="form1" id="p2"  style="left: 10px; top: 220px; font-size: 15px; width: 200px;" > 1 1 </p>
        </div>


        <div id="map1"></div>
        <p style="font-size: 15px; margin-top: 5px;" id="test1"> par1 </p>

        <div id="controls1" class="nicebox1">
            <div>
                <select id="census-var1">
                    <option value="All">All</option>
                    <option value="Water">Water</option>
                    <option value="PointOfInterest">Point Of Interest</option>
                    <option value="Blocks">Blocks</option>
                        <option disabled></option>
                    <option value="Street">Street</option>
                    <option value="Transit">Transit</option>
                        <option disabled></option>
                    <option value="Landscape">Landscape</option>
                    <option value="Building">Building</option>

                </select>
                
            </div>
        </div>


        <script defer type="text/javascript" 
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCRQmhgqvE8oiaKfLxj_pN262S737XtwZU&language=zh-CN">
        </script>

        <script type="module" src="./index.js"></script>


    </body>
</html>
