mapboxgl.accessToken = 'pk.eyJ1IjoibmFlIiwiYSI6ImNpemV0cDY4YTAwMXoyd3FraWhkcXRnMTIifQ.IZeLcFQVdkGbEwQYnOb5qQ';




var bounds = [
    [-91.555103, 34.078226], // Southwest coordinates
    [-37.304546, 82.353245]  // Northeast coordinates
];

map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/nae/ck17um4hj085y1cmmd90ooink',
    zoom: 2.3*Math.log10(window.innerWidth/50),
    center: [-82.568, 38.058],
    maxZoom: 7,
    attributionControl: true
    // maxBounds: bounds
});

var navigation = new mapboxgl.NavigationControl();
map.addControl(navigation);

var sidebarSummary = document.getElementById('summary');
var cssChange = document.getElementById('js-css-change');
// var usaRadioClick = document.getElementById('ck7qjivpv195r1io3178901h5');
// var stateRadioClick = document.getElementById('ck7qh0mxy0hpa1jo70wpzw08p');
// var districtRadioClick = document.getElementById('ck7xpp57900dg1ipj4r3kgadf');
var countyRadioClick = document.getElementById('ck17um4hj085y1cmmd90ooink');
// var msaRadioClick = document.getElementById('ck7qm5peo019v1imsllunq6gy');

// usaRadioClick.addEventListener("click", function () {cssChange.innerHTML = "<style> .sidebar-content { background-color: #000;} " +
//     ".mti_tooltip_text_cont {background-color: #000;} " +
//     ".grid_stat_descr.stat1 {background-color: #4c4c4c;}" +
//     ".grid_stat.stat1 {background-color: #4c4c4c;} " +
//     ".mti_tooltip_hed {color: #fff;} " +
//     ".grid_stat_descr {color: #fff;} " +
//     ".grid_stat {color: #fff;} " +
//     ".see_more_button {color: #21d279;}" +
//     "</style>"});

// stateRadioClick.addEventListener("click", function () {cssChange.innerHTML = "<style> .sidebar-content { background-color: #393745;} " +
//     ".mti_tooltip_text_cont {background-color: #393745;} " +
//     ".grid_stat_descr.stat1 {background-color: #4b4956;}" +
//     ".grid_stat.stat1 {background-color: #4b4956;} " +
//     ".mti_tooltip_hed {color: #fff;} " +
//     ".grid_stat_descr {color: #fff;} " +
//     ".grid_stat {color: #fff;} " +
//     ".see_more_button {color: #21d279;}" +
//     "</style>"});

// districtRadioClick.addEventListener("click", function () {cssChange.innerHTML = "<style> .sidebar-content { background-color: #fff;} " +
//     ".mti_tooltip_text_cont {background-color: #fff;} " +
//     ".grid_stat_descr.stat1 {background-color: #e6eaea;}" +
//     ".grid_stat.stat1 {background-color: #e6eaea;} " +
//     ".mti_tooltip_hed {color: #000;} " +
//     ".grid_stat_descr {color: #000;} " +
//     ".grid_stat {color: #000;} " +
//     ".see_more_button {color: #21d279;}" +
//     "</style>"});

countyRadioClick.addEventListener("click", function () {cssChange.innerHTML = "<style> .sidebar-content { background-color: #ffdb20;} " +
    ".mti_tooltip_text_cont {background-color: #ffdb20;} " +
    ".grid_stat_descr.stat1 {background-color: #ffe456;}" +
    ".grid_stat.stat1 {background-color: #ffe456;} " +
    ".mti_tooltip_hed {color: #000;} " +
    ".grid_stat_descr {color: #000;} " +
    ".grid_stat {color: #000;} " +
    ".see_more_button {color: #000;}" +
    "</style>"});

// msaRadioClick.addEventListener("click", function () {cssChange.innerHTML = "<style> .sidebar-content { background-color: #f7594d;} " +
//     ".mti_tooltip_text_cont {background-color: #f7594d;} " +
//     ".grid_stat_descr.stat1 {background-color: #fb7a70;}" +
//     ".grid_stat.stat1 {background-color: #fb7a70;} " +
//     ".mti_tooltip_hed {color: #fff;} " +
//     ".grid_stat_descr {color: #fff;} " +
//     ".grid_stat {color: #fff;} " +
//     ".see_more_button {color: #fff;}" +
//     "</style>"});

// var sidebar = new mapboxgl.({ element: 'sidebar', position: 'left' });
// map.addControl(sidebar);
// var sidebar = L.control.sidebar('sidebar').addTo(map);
function myFunction() {
  if (window.innerWidth < 575) {
    var x = document.getElementById("hideNav");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }

  }
  else {return }

}


function numberWithCommas(x) {
    if (x=="NA") {return "N/A"}
    else {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
}

function fixNA(x) {
    if (x=="NA") {return "N/A"}
    else {return x}
}

map.on('load', function () {
    //Add Sources
    map.addSource('counties', {
        'type': 'geojson',
        'data':
        'https://gist.githubusercontent.com/krwarner/346c365ce78c899f7f3895b60f94a4f2/raw/373f4c1b17713e47fc62166597470c9e72af2d7b/county_data_geojson_for_release.json'
    });

    // #000000
// The feature-state dependent fill-opacity expression will render the hover effect
// when a feature's hover state is set to true.
    map.addLayer({
        'id': 'county-fills',
        'type': 'fill',
        'source': 'counties',
        'layout': {},
        'paint': {
            'fill-color': '#ffe456',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0
            ]
        }
    });

    map.addLayer({
        'id': 'county-fills-click',
        'type': 'fill',
        'source': 'counties',
        'layout': {},
        'paint': {
            'fill-color': '#000000',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'click'], false],
                1,
                0
            ]
        }
    });

    //Adding source for the geocoder search to select the single county searched
    map.addSource('single-county', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
    });

    //Allows the single county that has been searched to turn black
    map.addLayer({
        'id': 'county-search-fill',
        'type': 'fill',
        'source': 'single-county',
        'paint': {
            'fill-color': '#000'
        }
    });

    map.addSource('mapbox-streets-v8', {
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-streets-v8'
    });

// When the user moves their mouse over the state-fill layer, we'll update the
// feature state for the feature under the mouse.
    map.on('mousemove', 'county-fills', function(e) {
        if (e.features.length > 0) {
            if (hoveredStateId) {
                map.setFeatureState(
                    { source: 'counties', id: hoveredStateId },
                    { hover: false }
                );
            }
            hoveredStateId = e.features[0].id;
            map.setFeatureState(
                { source: 'counties', id: hoveredStateId },
                { hover: true }
            );
        }

    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'county-fills', function() {
        map.getCanvas().style.cursor = 'pointer';

        if (map.getLayer('water')) map.removeLayer('water');

        map.addLayer({
            'id': 'water',
            'type': 'fill',
            'source': 'mapbox-streets-v8',
            'source-layer': 'water',
            'paint': {
                'fill-color': '#fff'
            }
        });



    });

        // When the mouse leaves the state-fill layer, update the feature state of the
        // previously hovered feature.
    map.on('mouseleave', 'county-fills', function() {
        if (hoveredStateId) {
            map.setFeatureState(
                { source: 'counties', id: hoveredStateId },
                { hover: false }
            );
        }
        hoveredStateId = null;

        // Change back from pointer when outside map
        map.getCanvas().style.cursor = '';
    });

    // When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
    map.on('click', 'county-fills-click', function(e) {
        //If you have searched for a county and it is highlighted, this will remove the
        //highlight and highlight the clicked one instead
        if (map.getLayer('county-search-fill')) map.removeLayer('county-search-fill');

        if (!map.getLayer('county-fills-click')) {

            map.addLayer({
                'id': 'county-fills-click',
                'type': 'fill',
                'source': 'counties',
                'layout': {},
                'paint': {
                    'fill-color': '#000000',
                    'fill-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'click'], false],
                        1,
                        0
                    ]
                }
            });
        }

        if (map.getLayer('water')) map.removeLayer('water');

        map.addLayer({
            'id': 'water',
            'type': 'fill',
            'source': 'mapbox-streets-v8',
            'source-layer': 'water',
            'paint': {
                'fill-color': '#fff'
            }
        });

        if (e.features.length > 0) {
            if (clickedCountyId) {
                map.setFeatureState(
                    { source: 'counties', id: clickedCountyId },
                    { click: false }
                );
            }
            clickedCountyId = e.features[0].id;
            map.setFeatureState(
                { source: 'counties', id: clickedCountyId},
                { click: true }
            );
        };

        var bbox = turf.extent(e.features[0]);

        bbox[0] = bbox[0];
        bbox[2] = bbox[2]+2.2;

        map.fitBounds(bbox, {
            padding: 200
        });
        return clickedCountyId;
    });

    map.on('drag', function(){
      if (map.getLayer('water')) map.removeLayer('water');

      map.addLayer({
          'id': 'water',
          'type': 'fill',
          'source': 'mapbox-streets-v8',
          'source-layer': 'water',
          'paint': {
              'fill-color': '#fff'
          }
      });
    })

    var longLat = null;

    map.on('click', 'county-fills', function(e) {
        county_feat = e.features[0];
        county_prop = county_feat.properties;

        if (county_prop["Flag: No Data"] == "0") {
            sidebarSummary.innerHTML = "<div class='mti_tooltip_text_cont'>" +
                    "<h1 class='mti_tooltip_hed'>" + county_prop.NAMELSAD + ", " + county_prop.stateabbr + "</h1>" +
                    "<div class='w-layout-grid grid_data'>" +
                    "<div class='grid_stat_descr stat1'>Number of Immigrants</div>" +
                    "<div class='grid_stat stat1'>" + numberWithCommas(county_prop[" Number of Immigrants "]) + "<br>‍</div>" +
                    "<div class='grid_stat_descr'>Immigrant Share of Population</div>" +
                    "<div class='grid_stat'>" + fixNA(county_prop["Immigrant Share of Population"]) + "</div>" +
                    "<div class='grid_stat_descr stat1'>Immigrant Taxes Paid (in millions of dollars)</div>" +
                    "<div class='grid_stat stat1'>" + fixNA(county_prop[" Immigrant Taxes Paid (in millions of dollars) "]) + "</div>" +
                    "<div class='grid_stat_descr'>Immigrant Spending Power (in millions of dollars)</div>" +
                    "<div class='grid_stat'>" + fixNA(county_prop[" Immigrant Spending Power (in millions of dollars) "]) + "</div>" +
                    "<div class='grid_stat_descr stat1'>Number of Immigrant Entrepreneurs</div>" +
                    "<div class='grid_stat stat1'>" + numberWithCommas(county_prop[" Number of Immigrant Entrepreneurs "]) + "</div>" +
                    "<div class='grid_stat_descr'>Number of Eligible Immigrant Voters</div>" +
                    "<div class='grid_stat'>" + numberWithCommas(county_prop[" Number of Eligible Immigrant Voters "]) + "</div></div>" +
                    "<div class='source-line'>" + "Source: " + county_prop["Source"] + "</div>" +
                    "<br>‍</div>";
        } else {
            sidebarSummary.innerHTML = "<div class='mti_tooltip_text_cont'>" +
                    "<h1 class='mti_tooltip_hed'>" + county_prop.NAMELSAD + ", " + county_prop.stateabbr + "</h1>" +
                    "<div class='no-data'>" + "The data is not available due to a small sample size for the immigrant population in this county. For more information, see link below." + "</div>" +
                    "<a href='https://www.newamericaneconomy.org/locations/" + county_prop.statename.toLowerCase().replace(/\s+/g, '-') + "/'>" +
                    "<div class='see_more_button'>More " + county_prop.statename + " Data <i class='fa fa-long-arrow-right fa-adjust'></i></div></a>" +
                    "</div>";
        }

    });

});

var layerList = document.getElementById('map-switch-menu');
var inputs = layerList.getElementsByTagName('input');

var hoveredStateId = null;
// var clickedMsaId = null;
var clickedCountyId = null;
// var clickedDistrictId = null;
// var clickedStateId = null;
// var clickedUsId = null;

var bbox_search;
var searchedCountyId = null;

function forwardGeocoder(query) {

    var matchingFeatures = [];

    for (var i = 0; i < countyList.features.length; i++) {
        var featureCounty = countyList.features[i];

        // if (i < districtList.features.length) {
        //     var featureDistrict = districtList.features[i];
        // }

        // if (i < msaList.features.length) {
        //     var featureMSA = msaList.features[i];
        // }

        // handle queries with different capitalization than the source data by calling toLowerCase()
        if (
            featureCounty.properties.NAMELSAD
                .toLowerCase()
                .search(query.toLowerCase()) !== -1
        ) {
            featureCounty['place_name'] = featureCounty.properties.NAMELSAD + ', ' + featureCounty.properties.stateabbr;
            featureCounty['center'] = [(turf.extent(featureCounty)[0] + turf.extent(featureCounty)[2])/2, (turf.extent(featureCounty)[1] + turf.extent(featureCounty)[3])/2];
            featureCounty['place_type'] = ['county'];
            // featureCounty['id'] =
            matchingFeatures.push(featureCounty);

        };


        // console.log(featureDistrict.properties["District No."]);

        // if (
        //     featureDistrict.properties["District No."].toLowerCase()
        //         .search(query.toLowerCase()) !== -1
        // ) {
        //     featureDistrict['place_name'] = featureDistrict.properties["District No."];
        //     featureDistrict['center'] = [(turf.extent(featureDistrict)[0] + turf.extent(featureDistrict)[2])/2, (turf.extent(featureDistrict)[1] + turf.extent(featureDistrict)[3])/2];
        //     featureDistrict['place_type'] = ['district'];
        //     matchingFeatures.push(featureDistrict);

        //     bbox_search = turf.extent(featureDistrict);
        //     map.fitBounds(bbox_search, {
        //         padding: 200
        //     });

        // };

        // if (
        //     featureMSA.properties.NAME
        //         .toLowerCase()
        //         .search(query.toLowerCase()) !== -1
        // ) {
        //     featureMSA['place_name'] = featureMSA.properties.NAME;
        //     featureMSA['center'] = [(turf.extent(featureMSA)[0] + turf.extent(featureMSA)[2])/2, (turf.extent(featureMSA)[1] + turf.extent(featureMSA)[3])/2];
        //     featureMSA['place_type'] = ['MSA'];
        //     matchingFeatures.push(featureMSA);

        // };
    }

    // bbox_search = turf.extent(featureCounty);
    // // console.log(featureCounty);
    // map.fitBounds(bbox_search, {
    //     padding: 200
    // });

    matchingFeatures[0]['center'][0] = matchingFeatures[0]['center'][0] + 1.1;
    return matchingFeatures;

}

var searchText = 'Enter an address, city, county, state, or place...'

if (screen.width<550) {
  searchText = 'Search for your county here...'
}

var geocoder = new MapboxGeocoder({ // Initialize the geocoder
    accessToken: mapboxgl.accessToken, // Set the access token
    localGeocoder: forwardGeocoder,
    placeholder: searchText,
    mapboxgl: mapboxgl, // Set the mapbox-gl instance
    marker: false,
    limit: 12,
    bbox: [-91.555103, 34.078226, // Southwest coordinates
        -37.304546, 82.353245],  // Northeast coordinates
});

// Add the geocoder to the map
map.addControl(geocoder);

  // Listen for the `result` event from the Geocoder
  // `result` event is triggered when a user makes a selection
  //  Add a marker at the result's coordinates
geocoder.on('result', function(e) {
    //If you have clicked on a county and it is highlighted, this will remove the
    //highlight and highlight the searched one instead



    map.setFeatureState(
        { source: 'counties', id: clickedCountyId},
        { click: false }

    );

    if (!map.getLayer('county-search-fill')) {

        map.addLayer({
            'id': 'county-search-fill',
            'type': 'fill',
            'source': 'single-county',
            'paint': {
                'fill-color': '#000'
            }
        });
    }

    map.getSource('single-county').setData(e.result.geometry);

    county_prop = e.result.properties;



    if (county_prop["Flag: No Data"] == "0") {
        sidebarSummary.innerHTML = "<div class='mti_tooltip_text_cont'>" +
                "<h1 class='mti_tooltip_hed'>" + county_prop.NAMELSAD + ", " + county_prop.stateabbr + "</h1>" +
                "<div class='w-layout-grid grid_data'>" +
                "<div class='grid_stat_descr stat1'>Number of Immigrants</div>" +
                "<div class='grid_stat stat1'>" + numberWithCommas(county_prop[" Number of Immigrants "]) + "<br>‍</div>" +
                "<div class='grid_stat_descr'>Immigrant Share of Population</div>" +
                "<div class='grid_stat'>" + fixNA(county_prop["Immigrant Share of Population"]) + "</div>" +
                "<div class='grid_stat_descr stat1'>Immigrant Taxes Paid (in millions of dollars)</div>" +
                "<div class='grid_stat stat1'>" + fixNA(county_prop[" Immigrant Taxes Paid (in millions of dollars) "]) + "</div>" +
                "<div class='grid_stat_descr'>Immigrant Spending Power (in millions of dollars)</div>" +
                "<div class='grid_stat'>" + fixNA(county_prop[" Immigrant Spending Power (in millions of dollars) "]) + "</div>" +
                "<div class='grid_stat_descr stat1'>Number of Immigrant Entrepreneurs</div>" +
                "<div class='grid_stat stat1'>" + numberWithCommas(county_prop[" Number of Immigrant Entrepreneurs "]) + "</div>" +
                "<div class='grid_stat_descr'>Number of Eligible Immigrant Voters</div>" +
                "<div class='grid_stat'>" + numberWithCommas(county_prop[" Number of Eligible Immigrant Voters "]) + "</div></div>" +
                "<div class='source-line'>" + "Source: " + county_prop["Source"] + "</div>" +
                "<br>‍</div>";
    } else {
        sidebarSummary.innerHTML = "<div class='mti_tooltip_text_cont'>" +
                "<h1 class='mti_tooltip_hed'>" + county_prop.NAMELSAD + ", " + county_prop.stateabbr + "</h1>" +
                "<div class='no-data'>" + "The data is not available due to a small sample size for the immigrant population in this county. For more information, see link below." + "</div>" +
                "<a href='https://www.newamericaneconomy.org/locations/" + county_prop.statename.toLowerCase().replace(/\s+/g, '-') + "/'>" +
                "<div class='see_more_button'>More " + county_prop.statename + " Data <i class='fa fa-long-arrow-right fa-adjust'></i></div></a>" +
                "</div>";
    }

    if (map.getLayer('water')) map.removeLayer('water');

        map.addLayer({
            'id': 'water',
            'type': 'fill',
            'source': 'mapbox-streets-v8',
            'source-layer': 'water',
            'paint': {
                'fill-color': '#fff'
            }
        });
    });

// function switchLayer(layer) {
//     var layerId = layer.target.id;
//     // map.setStyle('mapbox://styles/nae/' + layerId);
//     //Remove Navigation from previous map
//     map.removeControl(navigation);
//     var mapboxLogo = document.getElementsByClassName("mapboxgl-ctrl-logo")[0];
//     mapboxLogo.remove();

//     //remove county related layers
//     if (map.getLayer('county-fills')) map.removeLayer('county-fills');
//     if (map.getLayer('county-fills-click')) map.removeLayer('county-fills-click');
//     if (map.getLayer('state-borders')) map.removeLayer('state-borders');
//     //remove district layers
//     if (map.getLayer('district-fills')) map.removeLayer('district-fills');
//     if (map.getLayer('district-fills-click')) map.removeLayer('district-fills-click');
//     //remove msa layers
//     if (map.getLayer('msa-fills')) map.removeLayer('msa-fills');
//     if (map.getLayer('msa-fills-click')) map.removeLayer('msa-fills-click');
//     // Remove State Layers
//     if (map.getLayer('state-fills')) map.removeLayer('state-fills');
//     if (map.getLayer('state-fills-click')) map.removeLayer('state-fills-click');
//     // Remove US Layers
//     if (map.getLayer('usa-fills')) map.removeLayer('usa-fills');
//     if (map.getLayer('usa-fills-click')) map.removeLayer('usa-fills-click');
//     // Remove Water
//     if (map.getLayer('water')) map.removeLayer('water');

//     // If the layer is county
//     if (layerId == 'ck17um4hj085y1cmmd90ooink') {

//         map = new mapboxgl.Map({
//             container: 'map',
//             style: 'mapbox://styles/nae/ck17um4hj085y1cmmd90ooink',
//             zoom: 2.3*Math.log10(window.innerWidth/50),
//             center: [-82.568, 38.058],
//             maxZoom: 6,
//             attributionControl: true
//             // maxBounds: bounds
//         });

//         //Add new map control
//         map.addControl(navigation);

//         map.on('load', function () {
//             //Add Sources
//             map.addSource('counties', {
//                 'type': 'geojson',
//                 'data':
//                 'https://gist.githubusercontent.com/krwarner/ec7560387e242fd2a4ff67818fdb78a2/raw/581b5768ccec03a6ea5742f024ed678cd26397d9/county_data_geojson_test_abbr.json'
//             });

//             map.addSource('states', {
//                 'type': 'geojson',
//                 'data':
//                 'https://gist.githubusercontent.com/krwarner/d8bd487da68ac8eefd38ca763a2c5301/raw/b9f4390861f00d7af3761911cdd21b0074638225/state_data_geojson_test.geojson'
//             });

//             // #000000
//         // The feature-state dependent fill-opacity expression will render the hover effect
//         // when a feature's hover state is set to true.
//             map.addLayer({
//                 'id': 'county-fills',
//                 'type': 'fill',
//                 'source': 'counties',
//                 'layout': {},
//                 'paint': {
//                     'fill-color': '#ffe456',
//                     'fill-opacity': [
//                         'case',
//                         ['boolean', ['feature-state', 'hover'], false],
//                         1,
//                         0
//                     ]
//                 }
//             });

//             map.addLayer({
//                 'id': 'county-fills-click',
//                 'type': 'fill',
//                 'source': 'counties',
//                 'layout': {},
//                 'paint': {
//                     'fill-color': '#000000',
//                     'fill-opacity': [
//                         'case',
//                         ['boolean', ['feature-state', 'click'], false],
//                         1,
//                         0
//                     ]
//                 }
//             });

//         // When the user moves their mouse over the state-fill layer, we'll update the
//         // feature state for the feature under the mouse.
//             map.on('mousemove', 'county-fills', function(e) {
//                 if (e.features.length > 0) {
//                     if (hoveredStateId) {
//                         map.setFeatureState(
//                             { source: 'counties', id: hoveredStateId },
//                             { hover: false }
//                         );
//                     }
//                     hoveredStateId = e.features[0].id;
//                     map.setFeatureState(
//                         { source: 'counties', id: hoveredStateId },
//                         { hover: true }
//                     );
//                 }
//             });

//             // Change the cursor to a pointer when the mouse is over the places layer.
//             map.on('mouseenter', 'county-fills', function() {
//                 map.getCanvas().style.cursor = 'pointer';
//             });

//                 // When the mouse leaves the state-fill layer, update the feature state of the
//                 // previously hovered feature.
//             map.on('mouseleave', 'county-fills', function() {
//                 if (hoveredStateId) {
//                     map.setFeatureState(
//                         { source: 'counties', id: hoveredStateId },
//                         { hover: false }
//                     );
//                 }
//                 hoveredStateId = null;

//                 // Change back from pointer when outside map
//                 map.getCanvas().style.cursor = '';
//             });

//             map.addLayer({
//                 'id': 'state-borders',
//                 'type': 'line',
//                 'source': 'states',
//                 'layout': {},
//                 'paint': {
//                     'line-color': '#fff',
//                     'line-width': 1
//                 }
//             });

//             // When a click event occurs on a feature in the places layer, open a popup at the
//         // location of the feature, with description HTML from its properties.
//             map.on('click', 'county-fills-click', function(e) {
//                 if (e.features.length > 0) {
//                     if (clickedCountyId) {
//                         map.setFeatureState(
//                             { source: 'counties', id: clickedCountyId },
//                             { click: false }
//                         );
//                     }
//                     clickedCountyId = e.features[0].id;
//                     map.setFeatureState(
//                         { source: 'counties', id: clickedCountyId},
//                         { click: true }
//                     );
//                 }

//                 var bbox = turf.extent(e.features[0]);

//                 bbox[0] = bbox[0]+2.2;
//                 bbox[2] = bbox[2]+2.2;

//                 map.fitBounds(bbox, {
//                     padding: 200
//                 });
//             });

//             var longLat = null;

//             map.on('click', 'county-fills', function(e) {
//                 county_feat = e.features[0];
//                 county_prop = county_feat.properties;


//                 sidebarSummary.innerHTML = "<div class='mti_tooltip_text_cont'>" +
//                     "<h1 class='mti_tooltip_hed'>" + county_prop.NAMELSAD + ", " + county_prop.stateabbr + "</h1>" +
//                     "<div class='w-layout-grid grid_data'>" +
//                     "<div class='grid_stat_descr stat1'>Number of Immigrants:</div>" +
//                     "<div class='grid_stat stat1'>" + county_prop.pop_over_25 + "<br>‍</div>" +
//                     "<div class='grid_stat_descr'>Immigrant Share of Population:</div>" +
//                     "<div class='grid_stat'>" + "24.5%" + "</div>" +
//                     "<div class='grid_stat_descr stat1'>Immigrant Taxes Paid:</div>" +
//                     "<div class='grid_stat stat1'>" + "$4.1B" + "</div>" +
//                     "<div class='grid_stat_descr'>Immigrant Spending Power:</div>" +
//                     "<div class='grid_stat'>" + "$13.4B" + "</div>" +
//                     "<div class='grid_stat_descr stat1'>Number of Immigrant Entrepreneurs:</div>" +
//                     "<div class='grid_stat stat1'>" + "48,228" + "</div>" +
//                     "<div class='grid_stat_descr'>Number of Eligible Immigrant Voters:</div>" +
//                     "<div class='grid_stat'>" + "172,387" + "</div>" +
//                     "<div class='grid_stat_descr stat1'>Share of Foreign Born Pop. Working Age (16 - 64):</div>" +
//                     "<div class='grid_stat stat1'>" + "50%" + "<br>‍</div></div>";

//             });

//             map.addSource('mapbox-streets-v8', {
//                 type: 'vector',
//                 url: 'mapbox://mapbox.mapbox-streets-v8'
//                 });
//             map.addLayer({
//                 'id': 'water',
//                 'type': 'fill',
//                 'source': 'mapbox-streets-v8',
//                 'source-layer': 'water',
//                 'paint': {
//                     'fill-color': '#fff'
//                 }
//                 });
//         });
//     }

//     // // State Layer and interactions
//     // else if (layerId == 'ck7qh0mxy0hpa1jo70wpzw08p') {

//     //     map = new mapboxgl.Map({
//     //         container: 'map',
//     //         style: 'mapbox://styles/nae/ck7qh0mxy0hpa1jo70wpzw08p',
//     //         zoom: 2.3*Math.log10(window.innerWidth/50),
//     //         center: [-82.568, 38.058],
//     //         maxZoom: 6,
//     //         attributionControl: true
//     //         // maxBounds: bounds
//     //     });

//     //     //Add new map control
//     //     map.addControl(navigation);

//     //     map.on('load', function () {

//     //         map.addSource('states', {
//     //             'type': 'geojson',
//     //             'data':
//     //             'https://gist.githubusercontent.com/krwarner/d8bd487da68ac8eefd38ca763a2c5301/raw/b9f4390861f00d7af3761911cdd21b0074638225/state_data_geojson_test.geojson'
//     //         });

//     //         // #000000
//     //     // The feature-state dependent fill-opacity expression will render the hover effect
//     //     // when a feature's hover state is set to true.
//     //         map.addLayer({
//     //             'id': 'state-fills',
//     //             'type': 'fill',
//     //             'source': 'states',
//     //             'layout': {},
//     //             'paint': {
//     //                 'fill-color': '#4b4956',
//     //                 'fill-opacity': [
//     //                     'case',
//     //                     ['boolean', ['feature-state', 'hover'], false],
//     //                     1,
//     //                     0
//     //                 ]
//     //             }
//     //         });

//     //         map.addLayer({
//     //             'id': 'state-fills-click',
//     //             'type': 'fill',
//     //             'source': 'states',
//     //             'layout': {},
//     //             'paint': {
//     //                 'fill-color': '#000000',
//     //                 'fill-opacity': [
//     //                     'case',
//     //                     ['boolean', ['feature-state', 'click'], false],
//     //                     1,
//     //                     0
//     //                 ]
//     //             }
//     //         });

//     //     // When the user moves their mouse over the state-fill layer, we'll update the
//     //     // feature state for the feature under the mouse.
//     //         map.on('mousemove', 'state-fills', function(e) {
//     //             if (e.features.length > 0) {
//     //                 if (hoveredStateId) {
//     //                     map.setFeatureState(
//     //                         { source: 'states', id: hoveredStateId },
//     //                         { hover: false }
//     //                     );
//     //                 }
//     //                 hoveredStateId = e.features[0].id;
//     //                 map.setFeatureState(
//     //                     { source: 'states', id: hoveredStateId },
//     //                     { hover: true }
//     //                 );
//     //             }
//     //         });

//     //         // Change the cursor to a pointer when the mouse is over the places layer.
//     //         map.on('mouseenter', 'state-fills', function() {
//     //             map.getCanvas().style.cursor = 'pointer';
//     //         });

//     //             // When the mouse leaves the state-fill layer, update the feature state of the
//     //             // previously hovered feature.
//     //         map.on('mouseleave', 'state-fills', function() {
//     //             if (hoveredStateId) {
//     //                 map.setFeatureState(
//     //                     { source: 'states', id: hoveredStateId },
//     //                     { hover: false }
//     //                 );
//     //             }
//     //             hoveredStateId = null;

//     //             // Change back from pointer when outside map
//     //             map.getCanvas().style.cursor = '';
//     //         });

//     //         // When a click event occurs on a feature in the places layer, open a popup at the
//     //     // location of the feature, with description HTML from its properties.
//     //         map.on('click', 'state-fills-click', function(e) {
//     //             if (e.features.length > 0) {
//     //                 if (clickedStateId) {
//     //                     map.setFeatureState(
//     //                         { source: 'states', id: clickedStateId },
//     //                         { click: false }
//     //                     );
//     //                 }
//     //                 clickedStateId = e.features[0].id;
//     //                 map.setFeatureState(
//     //                     { source: 'states', id: clickedStateId},
//     //                     { click: true }
//     //                 );
//     //             }

//     //             var bbox = turf.extent(e.features[0]);

//     //             bbox[0] = bbox[0]+2.2;
//     //             bbox[2] = bbox[2]+2.2;

//     //             // Pass the first coordinates in the LineString to `lngLatBounds` &
//     //             // wrap each coordinate pair in `extend` to include them in the bounds
//     //             // result. A variation of this technique could be applied to zooming
//     //             // to the bounds of multiple Points or Polygon geomteries - it just
//     //             // requires wrapping all the coordinates with the extend method.
//     //             // var bounds = coordinates.reduce(function(bounds, coord) {
//     //             //     return bounds.extend(coord);
//     //             // }, new mapboxgl.LngLatBounds().extend(coordinates[0]).extend(coordinates[0]));

//     //             map.fitBounds(bbox, {
//     //                 padding: 200
//     //             });
//     //         });

//     //         var longLat = null;

//     //         map.on('click', 'state-fills', function(e) {
//     //             state_feat = e.features[0];
//     //             state_prop = state_feat.properties;

//     //             sidebarSummary.innerHTML = "<div class='mti_tooltip_text_cont'>" +
//     //                     "<h1 class='mti_tooltip_hed'>" + state_prop.NAME + "</h1>" +
//     //                     "<div class='w-layout-grid grid_data'>" +
//     //                     "<div class='grid_stat_descr stat1'>Number of Immigrants:</div>" +
//     //                     "<div class='grid_stat stat1'>" + state_prop["Immigrant Residents"] + "<br>‍</div>" +
//     //                     "<div class='grid_stat_descr'>Immigrant Share of Population:</div>" +
//     //                     "<div class='grid_stat'>" + "24.5%" + "</div>" +
//     //                     "<div class='grid_stat_descr stat1'>Immigrant Taxes Paid:</div>" +
//     //                     "<div class='grid_stat stat1'>" + "$4.1B" + "</div>" +
//     //                     "<div class='grid_stat_descr'>Immigrant Spending Power:</div>" +
//     //                     "<div class='grid_stat'>" + "$13.4B" + "</div>" +
//     //                     "<div class='grid_stat_descr stat1'>Number of Immigrant Entrepreneurs:</div>" +
//     //                     "<div class='grid_stat stat1'>" + "48,228" + "</div>" +
//     //                     "<div class='grid_stat_descr'>Number of Eligible Immigrant Voters:</div>" +
//     //                     "<div class='grid_stat'>" + "172,387" + "</div>" +
//     //                     "<div class='grid_stat_descr stat1'>Share of Foreign Born Pop. Working Age (16 - 64):</div>" +
//     //                     "<div class='grid_stat stat1'>" + "50%" + "<br>‍</div></div>" +
//     //                     "<a href='https://www.newamericaneconomy.org/locations/" + state_prop.NAME.toLowerCase().replace(/\s+/g, '-') + "/'>" +
//     //                     "<div class='see_more_button'>More " +
//     //                     state_prop.NAME + " Data <i class='fa fa-long-arrow-right fa-adjust'></i></div></a>";

//     //         });

//     //         map.addSource('mapbox-streets-v8', {
//     //             type: 'vector',
//     //             url: 'mapbox://mapbox.mapbox-streets-v8'
//     //             });
//     //         map.addLayer({
//     //             'id': 'water',
//     //             'type': 'fill',
//     //             'source': 'mapbox-streets-v8',
//     //             'source-layer': 'water',
//     //             'paint': {
//     //                 'fill-color': '#fff'
//     //             }
//     //             });
//     //     });
//     // }

//     //United States
//     // else if (layerId == 'ck7qjivpv195r1io3178901h5') {
//     //     map = new mapboxgl.Map({
//     //         container: 'map',
//     //         style: 'mapbox://styles/nae/ck7qjivpv195r1io3178901h5',
//     //         zoom: 2.3*Math.log10(window.innerWidth/50),
//     //         center: [-82.568, 38.058],
//     //         maxZoom: 8,
//     //         attributionControl: true
//     //         // maxBounds: bounds
//     //     });

//     //     //Add new map control
//     //     map.addControl(navigation);

//     //     map.on('load', function () {

//     //         map.addSource('us', {
//     //             'type': 'geojson',
//     //             'data':
//     //             'https://gist.githubusercontent.com/krwarner/f5577904ca67a446a810f646f9395fd6/raw/226027c38e660d5f7e293b0df740c596b5de4ab6/us_data_geojson_test.geojson'
//     //         });

//     //         // #000000
//     //     // The featureState dependent fill-opacity expression will render the hover effect
//     //     // when a feature's hover usa is set to true.
//     //         map.addLayer({
//     //             'id': 'usa-fills',
//     //             'type': 'fill',
//     //             'source': 'us',
//     //             'layout': {},
//     //             'paint': {
//     //                 'fill-color': '#242424',
//     //                 'fill-opacity': [
//     //                     'case',
//     //                     ['boolean', ['feature-state', 'hover'], false],
//     //                     1,
//     //                     0
//     //                 ]
//     //             }
//     //         });

//     //         map.addLayer({
//     //             'id': 'usa-fills-click',
//     //             'type': 'fill',
//     //             'source': 'us',
//     //             'layout': {},
//     //             'paint': {
//     //                 'fill-color': '#000000',
//     //                 'fill-opacity': [
//     //                     'case',
//     //                     ['boolean', ['feature-state', 'click'], false],
//     //                     1,
//     //                     0
//     //                 ]
//     //             }
//     //         });

//     //     // When the user moves their mouse over the usa-fill layer, we'll update the
//     //     // feature usa for the feature under the mouse.
//     //         map.on('mousemove', 'usa-fills', function(e) {
//     //             if (e.features.length > 0) {
//     //                 if (hoveredStateId) {
//     //                     map.setFeatureState(
//     //                         { source: 'us', id: hoveredStateId },
//     //                         { hover: false }
//     //                     );
//     //                 }
//     //                 hoveredStateId = e.features[0].id;
//     //                 map.setFeatureState(
//     //                     { source: 'us', id: hoveredStateId },
//     //                     { hover: true }
//     //                 );
//     //             }
//     //         });

//     //         // Change the cursor to a pointer when the mouse is over the places layer.
//     //         map.on('mouseenter', 'usa-fills', function() {
//     //             map.getCanvas().style.cursor = 'pointer';
//     //         });

//     //             // When the mouse leaves the usa-fill layer, update the feature usa of the
//     //             // previously hovered feature.
//     //         map.on('mouseleave', 'usa-fills', function() {
//     //             if (hoveredStateId) {
//     //                 map.setFeatureState(
//     //                     { source: 'us', id: hoveredStateId },
//     //                     { hover: false }
//     //                 );
//     //             }
//     //             hoveredStateId = null;

//     //             // Change back from pointer when outside map
//     //             map.getCanvas().style.cursor = '';
//     //         });

//     //         // map.addLayer({
//     //         //     'id': 'usa-borders',
//     //         //     'type': 'line',
//     //         //     'source': 'us',
//     //         //     'layout': {},
//     //         //     'paint': {
//     //         //         'line-color': '#fff',
//     //         //         'line-width': 2
//     //         //     }
//     //         // });

//     //         // When a click event occurs on a feature in the places layer, open a popup at the
//     //     // location of the feature, with description HTML from its properties.
//     //         map.on('click', 'usa-fills-click', function(e) {
//     //             if (e.features.length > 0) {
//     //                 if (clickedUsId) {
//     //                     map.setFeatureState(
//     //                         { source: 'us', id: clickedUsId },
//     //                         { click: false }
//     //                     );
//     //                 }
//     //                 clickedUsId = e.features[0].id;
//     //                 map.setFeatureState(
//     //                     { source: 'us', id: clickedUsId},
//     //                     { click: true }
//     //                 );
//     //             }

//     //             var bbox = turf.extent(e.features[0]);

//     //             bbox[0] = bbox[0]+2.2;
//     //             bbox[2] = bbox[2]+2.2;

//     //             // Pass the first coordinates in the LineString to `lngLatBounds` &
//     //             // wrap each coordinate pair in `extend` to include them in the bounds
//     //             // result. A variation of this technique could be applied to zooming
//     //             // to the bounds of multiple Points or Polygon geomteries - it just
//     //             // requires wrapping all the coordinates with the extend method.
//     //             // var bounds = coordinates.reduce(function(bounds, coord) {
//     //             //     return bounds.extend(coord);
//     //             // }, new mapboxgl.LngLatBounds().extend(coordinates[0]).extend(coordinates[0]));

//     //             map.fitBounds(bbox, {
//     //                 padding: 200
//     //             });
//     //         });

//     //         var longLat = null;

//     //         map.on('click', 'usa-fills', function(e) {
//     //             usa_feat = e.features[0];
//     //             usa_prop = usa_feat.properties;

//     //             sidebarSummary.innerHTML = "<div class='mti_tooltip_text_cont'>" +
//     //                 "<h1 class='mti_tooltip_hed'>" + usa_prop.NAME + " Data</h1>" +
//     //                 "<div class='w-layout-grid grid_data'>" +
//     //                 "<div class='grid_stat_descr stat1'>Number of Immigrants:</div>" +
//     //                 "<div class='grid_stat stat1'>" + usa_prop["Immigrant Residents"] + "<br>‍</div>" +
//     //                 "<div class='grid_stat_descr'>Immigrant Share of Population:</div>" +
//     //                 "<div class='grid_stat'>" + "24.5%" + "</div>" +
//     //                 "<div class='grid_stat_descr stat1'>Immigrant Taxes Paid:</div>" +
//     //                 "<div class='grid_stat stat1'>" + "$4.1B" + "</div>" +
//     //                 "<div class='grid_stat_descr'>Immigrant Spending Power:</div>" +
//     //                 "<div class='grid_stat'>" + "$13.4B" + "</div>" +
//     //                 "<div class='grid_stat_descr stat1'>Number of Immigrant Entrepreneurs:</div>" +
//     //                 "<div class='grid_stat stat1'>" + "48,228" + "</div>" +
//     //                 "<div class='grid_stat_descr'>Number of Eligible Immigrant Voters:</div>" +
//     //                 "<div class='grid_stat'>" + "172,387" + "</div>" +
//     //                 "<div class='grid_stat_descr stat1'>Share of Foreign Born Pop. Working Age (16 - 64):</div>" +
//     //                 "<div class='grid_stat stat1'>" + "50%" + "<br>‍</div></div>" +
//     //                 "<a href='https://www.newamericaneconomy.org/locations/national/'>" +
//     //                 "<div class='see_more_button'>More " +
//     //                 usa_prop.NAME + " Data <i class='fa fa-long-arrow-right fa-adjust'></i></div></a>";
//     //             });

//     //         map.addSource('mapbox-streets-v8', {
//     //             type: 'vector',
//     //             url: 'mapbox://mapbox.mapbox-streets-v8'
//     //             });
//     //         map.addLayer({
//     //             'id': 'water',
//     //             'type': 'fill',
//     //             'source': 'mapbox-streets-v8',
//     //             'source-layer': 'water',
//     //             'paint': {
//     //                 'fill-color': '#fff'
//     //             }
//     //             });
//     //     });
//     // }

//     //District
//     // else if (layerId == 'ck7xpp57900dg1ipj4r3kgadf') {
//     //     map = new mapboxgl.Map({
//     //         container: 'map',
//     //         style: 'mapbox://styles/nae/ck7xpp57900dg1ipj4r3kgadf',
//     //         zoom: 2.3*Math.log10(window.innerWidth/50),
//     //         center: [-82.568, 38.058],
//     //         maxZoom: 6,
//     //         attributionControl: true
//     //         // maxBounds: bounds
//     //     });

//     //     //Add new map control
//     //     map.addControl(navigation);

//     //     map.on('load', function () {

//     //         map.addSource('district', {
//     //             'type': 'geojson',
//     //             'data':
//     //             'https://gist.githubusercontent.com/krwarner/c3c41dcfc0d460327964b0a9c7fcf37d/raw/bf11e119f9df4cb03ab607412ba9c6f5aba0d1b6/district_data_geojson_test.geojson'
//     //         });

//     //         map.addSource('states', {
//     //             'type': 'geojson',
//     //             'data':
//     //             'https://gist.githubusercontent.com/krwarner/d8bd487da68ac8eefd38ca763a2c5301/raw/b9f4390861f00d7af3761911cdd21b0074638225/state_data_geojson_test.geojson'
//     //         });

//     //         // #000000
//     //     // The featureState dependent fill-opacity expression will render the hover effect
//     //     // when a feature's hover state is set to true.
//     //         map.addLayer({
//     //             'id': 'district-fills',
//     //             'type': 'fill',
//     //             'source': 'district',
//     //             'layout': {},
//     //             'paint': {
//     //                 'fill-color': '#47ed9a',
//     //                 'fill-opacity': [
//     //                     'case',
//     //                     ['boolean', ['feature-state', 'hover'], false],
//     //                     1,
//     //                     0
//     //                 ]
//     //             }
//     //         });

//     //         map.addLayer({
//     //             'id': 'district-fills-click',
//     //             'type': 'fill',
//     //             'source': 'district',
//     //             'layout': {},
//     //             'paint': {
//     //                 'fill-color': '#000000',
//     //                 'fill-opacity': [
//     //                     'case',
//     //                     ['boolean', ['feature-state', 'click'], false],
//     //                     1,
//     //                     0
//     //                 ]
//     //             }
//     //         });

//     //         map.addLayer({
//     //             'id': 'state-borders',
//     //             'type': 'line',
//     //             'source': 'states',
//     //             'layout': {},
//     //             'paint': {
//     //                 'line-color': '#fff',
//     //                 'line-width': 1
//     //             }
//     //         });

//     //     // When the districter moves their modistricte over the district-fill layer, we'll update the
//     //     // feature district for the feature under the modistricte.
//     //         map.on('mousemove', 'district-fills', function(e) {
//     //             if (e.features.length > 0) {
//     //                 if (hoveredStateId) {
//     //                     map.setFeatureState(
//     //                         { source: 'district', id: hoveredStateId },
//     //                         { hover: false }
//     //                     );
//     //                 }
//     //                 hoveredStateId = e.features[0].id;
//     //                 map.setFeatureState(
//     //                     { source: 'district', id: hoveredStateId },
//     //                     { hover: true }
//     //                 );
//     //             }
//     //         });

//     //         // Change the cursor to a pointer when the modistricte is over the places layer.
//     //         map.on('mouseenter', 'district-fills', function() {
//     //             map.getCanvas().style.cursor = 'pointer';
//     //         });

//     //             // When the modistricte leaves the district-fill layer, update the feature district of the
//     //             // previodistrictly hovered feature.
//     //         map.on('mouseleave', 'district-fills', function() {
//     //             if (hoveredStateId) {
//     //                 map.setFeatureState(
//     //                     { source: 'district', id: hoveredStateId },
//     //                     { hover: false }
//     //                 );
//     //             }
//     //             hoveredStateId = null;

//     //             // Change back from pointer when outside map
//     //             map.getCanvas().style.cursor = '';
//     //         });

//     //         // map.addLayer({
//     //         //     'id': 'district-borders',
//     //         //     'type': 'line',
//     //         //     'source': 'district',
//     //         //     'layout': {},
//     //         //     'paint': {
//     //         //         'line-color': '#fff',
//     //         //         'line-width': 2
//     //         //     }
//     //         // });

//     //         // When a click event occurs on a feature in the places layer, open a popup at the
//     //     // location of the feature, with description HTML from its properties.
//     //         map.on('click', 'district-fills-click', function(e) {
//     //             if (e.features.length > 0) {
//     //                 if (clickedDistrictId) {
//     //                     map.setFeatureState(
//     //                         { source: 'district', id: clickedDistrictId },
//     //                         { click: false }
//     //                     );
//     //                 }
//     //                 clickedDistrictId = e.features[0].id;
//     //                 map.setFeatureState(
//     //                     { source: 'district', id: clickedDistrictId},
//     //                     { click: true }
//     //                 );
//     //             }

//     //             var bbox = turf.extent(e.features[0]);

//     //             bbox[0] = bbox[0]+2.2;
//     //             bbox[2] = bbox[2]+2.2;

//     //             // Pass the first coordinates in the LineString to `lngLatBounds` &
//     //             // wrap each coordinate pair in `extend` to include them in the bounds
//     //             // result. A variation of this technique could be applied to zooming
//     //             // to the bounds of multiple Points or Polygon geomteries - it jdistrictt
//     //             // requires wrapping all the coordinates with the extend method.
//     //             // var bounds = coordinates.reduce(function(bounds, coord) {
//     //             //     return bounds.extend(coord);
//     //             // }, new mapboxgl.LngLatBounds().extend(coordinates[0]).extend(coordinates[0]));

//     //             map.fitBounds(bbox, {
//     //                 padding: 200
//     //             });
//     //         });

//     //         var longLat = null;

//     //         map.on('click', 'district-fills', function(e) {
//     //             district_feat = e.features[0];
//     //             district_prop = district_feat.properties;

//     //             if (district_prop["District No."].includes("(at Large)") == true) {
//     //                 sidebarSummary.innerHTML = "<div class='mti_tooltip_text_cont'>" +
//     //                 "<h1 class='mti_tooltip_hed'>" + district_prop["District No."] + "</h1>" +
//     //                 "<div class='w-layout-grid grid_data'>" +
//     //                 "<div class='grid_stat_descr stat1'>Number of Immigrants:</div>" +
//     //                 "<div class='grid_stat stat1'>" + district_prop[" Foreign born; Estimate; Total population "] + "<br>‍</div>" +
//     //                 "<div class='grid_stat_descr'>Immigrant Share of Population:</div>" +
//     //                 "<div class='grid_stat'>" + "24.5%" + "</div>" +
//     //                 "<div class='grid_stat_descr stat1'>Immigrant Taxes Paid:</div>" +
//     //                 "<div class='grid_stat stat1'>" + "$4.1B" + "</div>" +
//     //                 "<div class='grid_stat_descr'>Immigrant Spending Power:</div>" +
//     //                 "<div class='grid_stat'>" + "$13.4B" + "</div>" +
//     //                 "<div class='grid_stat_descr stat1'>Number of Immigrant Entrepreneurs:</div>" +
//     //                 "<div class='grid_stat stat1'>" + "48,228" + "</div>" +
//     //                 "<div class='grid_stat_descr'>Number of Eligible Immigrant Voters:</div>" +
//     //                 "<div class='grid_stat'>" + "172,387" + "</div>" +
//     //                 "<div class='grid_stat_descr stat1'>Share of Foreign Born Pop. Working Age (16 - 64):</div>" +
//     //                 "<div class='grid_stat stat1'>" + "50%" + "<br>‍</div></div>" +
//     //                 "<a href='https://www.newamericaneconomy.org/locations/" + district_prop["District No."].toLowerCase().split(', ')[1].replace(/\s+/g, '-') + "/'>" +
//     //                 "<div class='see_more_button'>More " +
//     //                 district_prop["District No."] + " Data <i class='fa fa-long-arrow-right fa-adjust'></i></div></a>";
//     //             } else {

//     //                 sidebarSummary.innerHTML = "<div class='mti_tooltip_text_cont'>" +
//     //                     "<h1 class='mti_tooltip_hed'>" + district_prop["District No."] + "</h1>" +
//     //                     "<div class='w-layout-grid grid_data'>" +
//     //                     "<div class='grid_stat_descr stat1'>Number of Immigrants:</div>" +
//     //                     "<div class='grid_stat stat1'>" + district_prop[" Foreign born; Estimate; Total population "] + "<br>‍</div>" +
//     //                     "<div class='grid_stat_descr'>Immigrant Share of Population:</div>" +
//     //                     "<div class='grid_stat'>" + "24.5%" + "</div>" +
//     //                     "<div class='grid_stat_descr stat1'>Immigrant Taxes Paid:</div>" +
//     //                     "<div class='grid_stat stat1'>" + "$4.1B" + "</div>" +
//     //                     "<div class='grid_stat_descr'>Immigrant Spending Power:</div>" +
//     //                     "<div class='grid_stat'>" + "$13.4B" + "</div>" +
//     //                     "<div class='grid_stat_descr stat1'>Number of Immigrant Entrepreneurs:</div>" +
//     //                     "<div class='grid_stat stat1'>" + "48,228" + "</div>" +
//     //                     "<div class='grid_stat_descr'>Number of Eligible Immigrant Voters:</div>" +
//     //                     "<div class='grid_stat'>" + "172,387" + "</div>" +
//     //                     "<div class='grid_stat_descr stat1'>Share of Foreign Born Pop. Working Age (16 - 64):</div>" +
//     //                     "<div class='grid_stat stat1'>" + "50%" + "<br>‍</div></div>" +
//     //                     "<a href='https://www.newamericaneconomy.org/locations/" + district_prop["District No."].toLowerCase().split(', ')[1].replace(/\s+/g, '-') + '-' +
//     //                     district_prop["District No."].toLowerCase().split(' ')[1] + '-' + district_prop["District No."].toLowerCase().split(' ')[2] + "/'>" +
//     //                     "<div class='see_more_button'>More " +
//     //                     district_prop["District No."] + " Data <i class='fa fa-long-arrow-right fa-adjust'></i></div></a>";
//     //             }

//     //             });

//     //         map.addSource('mapbox-streets-v8', {
//     //             type: 'vector',
//     //             url: 'mapbox://mapbox.mapbox-streets-v8'
//     //             });
//     //         map.addLayer({
//     //             'id': 'water',
//     //             'type': 'fill',
//     //             'source': 'mapbox-streets-v8',
//     //             'source-layer': 'water',
//     //             'paint': {
//     //                 'fill-color': '#fff'
//     //             }
//     //             });
//     //     });
//     // }

//     //MSA
//     // else if (layerId == 'ck7qm5peo019v1imsllunq6gy') {
//     //     map = new mapboxgl.Map({
//     //         container: 'map',
//     //         style: 'mapbox://styles/nae/ck7qm5peo019v1imsllunq6gy',
//     //         zoom: 2.3*Math.log10(window.innerWidth/50),
//     //         center: [-82.568, 38.058],
//     //         maxZoom: 6,
//     //         attributionControl: true
//     //         // maxBounds: bounds
//     //     });

//     //     //Add new map control
//     //     map.addControl(navigation);

//     //     map.on('load', function () {

//     //         map.addSource('msa', {
//     //             'type': 'geojson',
//     //             'data':
//     //             'https://gist.githubusercontent.com/krwarner/3c17b02dd8b952c5235955869a2ea09f/raw/dfa614e9c578a2dc149874773b1034fd10bee17e/msa_data_geojson_test.geojson'
//     //         });

//     //         map.addSource('states', {
//     //             'type': 'geojson',
//     //             'data':
//     //             'https://gist.githubusercontent.com/krwarner/d8bd487da68ac8eefd38ca763a2c5301/raw/b9f4390861f00d7af3761911cdd21b0074638225/state_data_geojson_test.geojson'
//     //         });

//     //         // #000000
//     //     // The featureState dependent fill-opacity expression will render the hover effect
//     //     // when a feature's hover state is set to true.
//     //         map.addLayer({
//     //             'id': 'msa-fills',
//     //             'type': 'fill',
//     //             'source': 'msa',
//     //             'layout': {},
//     //             'paint': {
//     //                 'fill-color': '#fb7a70',
//     //                 'fill-opacity': [
//     //                     'case',
//     //                     ['boolean', ['feature-state', 'hover'], false],
//     //                     1,
//     //                     0
//     //                 ]
//     //             }
//     //         });

//     //         map.addLayer({
//     //             'id': 'msa-fills-click',
//     //             'type': 'fill',
//     //             'source': 'msa',
//     //             'layout': {},
//     //             'paint': {
//     //                 'fill-color': '#000000',
//     //                 'fill-opacity': [
//     //                     'case',
//     //                     ['boolean', ['feature-state', 'click'], false],
//     //                     1,
//     //                     0
//     //                 ]
//     //             }
//     //         });

//     //         map.addLayer({
//     //             'id': 'state-borders',
//     //             'type': 'line',
//     //             'source': 'states',
//     //             'layout': {},
//     //             'paint': {
//     //                 'line-color': '#fff',
//     //                 'line-width': 1
//     //             }
//     //         });

//     //     // When the msaer moves their momsae over the msa-fill layer, we'll update the
//     //     // feature msa for the feature under the momsae.
//     //         map.on('mousemove', 'msa-fills', function(e) {
//     //             if (e.features.length > 0) {
//     //                 if (hoveredStateId) {
//     //                     map.setFeatureState(
//     //                         { source: 'msa', id: hoveredStateId },
//     //                         { hover: false }
//     //                     );
//     //                 }
//     //                 hoveredStateId = e.features[0].id;
//     //                 map.setFeatureState(
//     //                     { source: 'msa', id: hoveredStateId },
//     //                     { hover: true }
//     //                 );
//     //             }
//     //         });

//     //         // Change the cursor to a pointer when the momsae is over the places layer.
//     //         map.on('mouseenter', 'msa-fills', function() {
//     //             map.getCanvas().style.cursor = 'pointer';
//     //         });

//     //             // When the momsae leaves the msa-fill layer, update the feature msa of the
//     //             // previomsaly hovered feature.
//     //         map.on('mouseleave', 'msa-fills', function() {
//     //             if (hoveredStateId) {
//     //                 map.setFeatureState(
//     //                     { source: 'msa', id: hoveredStateId },
//     //                     { hover: false }
//     //                 );
//     //             }
//     //             hoveredStateId = null;

//     //             // Change back from pointer when outside map
//     //             map.getCanvas().style.cursor = '';
//     //         });

//     //         // map.addLayer({
//     //         //     'id': 'msa-borders',
//     //         //     'type': 'line',
//     //         //     'source': 'msa',
//     //         //     'layout': {},
//     //         //     'paint': {
//     //         //         'line-color': '#fff',
//     //         //         'line-width': 2
//     //         //     }
//     //         // });

//     //         // When a click event occurs on a feature in the places layer, open a popup at the
//     //     // location of the feature, with description HTML from its properties.
//     //         map.on('click', 'msa-fills-click', function(e) {
//     //             if (e.features.length > 0) {
//     //                 if (clickedMsaId) {
//     //                     map.setFeatureState(
//     //                         { source: 'msa', id: clickedMsaId },
//     //                         { click: false }
//     //                     );
//     //                 }
//     //                 clickedMsaId = e.features[0].id;
//     //                 map.setFeatureState(
//     //                     { source: 'msa', id: clickedMsaId},
//     //                     { click: true }
//     //                 );
//     //             }

//     //             var bbox = turf.extent(e.features[0]);

//     //             bbox[0] = bbox[0]+2.2;
//     //             bbox[2] = bbox[2]+2.2;

//     //             // Pass the first coordinates in the LineString to `lngLatBounds` &
//     //             // wrap each coordinate pair in `extend` to include them in the bounds
//     //             // result. A variation of this technique could be applied to zooming
//     //             // to the bounds of multiple Points or Polygon geomteries - it jmsat
//     //             // requires wrapping all the coordinates with the extend method.
//     //             // var bounds = coordinates.reduce(function(bounds, coord) {
//     //             //     return bounds.extend(coord);
//     //             // }, new mapboxgl.LngLatBounds().extend(coordinates[0]).extend(coordinates[0]));

//     //             map.fitBounds(bbox, {
//     //                 padding: 200
//     //             });
//     //         });

//     //         var longLat = null;

//     //         map.on('click', 'msa-fills', function(e) {
//     //             msa_feat = e.features[0];
//     //             msa_prop = msa_feat.properties;


//     //             sidebarSummary.innerHTML = "<div class='mti_tooltip_text_cont'>" +
//     //                 "<h1 class='mti_tooltip_hed'>" + msa_prop.NAME + "</h1>" +
//     //                 "<div class='w-layout-grid grid_data'>" +
//     //                 "<div class='grid_stat_descr stat1'>Number of Immigrants:</div>" +
//     //                 "<div class='grid_stat stat1'>" + msa_prop["Immigrant Residents"] + "<br>‍</div>" +
//     //                 "<div class='grid_stat_descr'>Immigrant Share of Population:</div>" +
//     //                 "<div class='grid_stat'>" + "24.5%" + "</div>" +
//     //                 "<div class='grid_stat_descr stat1'>Immigrant Taxes Paid:</div>" +
//     //                 "<div class='grid_stat stat1'>" + "$4.1B" + "</div>" +
//     //                 "<div class='grid_stat_descr'>Immigrant Spending Power:</div>" +
//     //                 "<div class='grid_stat'>" + "$13.4B" + "</div>" +
//     //                 "<div class='grid_stat_descr stat1'>Number of Immigrant Entrepreneurs:</div>" +
//     //                 "<div class='grid_stat stat1'>" + "48,228" + "</div>" +
//     //                 "<div class='grid_stat_descr'>Number of Eligible Immigrant Voters:</div>" +
//     //                 "<div class='grid_stat'>" + "172,387" + "</div>" +
//     //                 "<div class='grid_stat_descr stat1'>Share of Foreign Born Pop. Working Age (16 - 64):</div>" +
//     //                 "<div class='grid_stat stat1'>" + "50%" + "<br>‍</div></div>" +
//     //                 "<a href='https://www.newamericaneconomy.org/city/" + msa_prop.NAME.split(', ')[0].split('-')[0].replace(/\s+/g, '-') + "/'>" +
//     //                 "<div class='see_more_button'>More " +
//     //                 msa_prop.NAME + " Data <i class='fa fa-long-arrow-right fa-adjust'></i></div></a>";

//     //                 // https://data.newamericaneconomy.org/en/refugee-resettlement-us/
//     //         });

//     //         map.addSource('mapbox-streets-v8', {
//     //             type: 'vector',
//     //             url: 'mapbox://mapbox.mapbox-streets-v8'
//     //             });
//     //         map.addLayer({
//     //             'id': 'water',
//     //             'type': 'fill',
//     //             'source': 'mapbox-streets-v8',
//     //             'source-layer': 'water',
//     //             'paint': {
//     //                 'fill-color': '#fff'
//     //             }
//     //             });
//     //     });
//     // };
// }

// for (var i = 0; i < inputs.length; i++) {
//     inputs[i].onclick = switchLayer;
// }
