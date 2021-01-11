var width = 600, height = 480;

departement = "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson"
dataAltitudePopulation = "./db/villeInf70m.csv"

var svg2 = d3
    .select("#container")
    .append("svg")
    .attr("id", "svg-2")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "svg");

// On rajoute un groupe englobant toute la visualisation pour plus tard
var g = svg2.append("g");

var projection = d3
    //Centrer la carte de la France
    .geoConicConformal().center([2.454071, 46.279229])
    .translate([width / 2, height / 2])
    .scale([2500]);

// On définit l’échelle de couleur
var color = d3.scaleQuantize()
    .range(["#e6e6ff","#ccccff","#b3b3ff","#9999ff", "#8080ff", "#6666ff", "#4d4dff", "#3333ff", "#1a1aff", "#0000ff"]);

var colorLegend = ["#e6e6ff","#ccccff","#b3b3ff","#9999ff", "#8080ff", "#6666ff", "#4d4dff", "#3333ff", "#1a1aff", "#0000ff"];

var path = d3.geoPath().projection(projection);

var tooltip = d3.select('body').append('div')
    .attr('class', 'hidden tooltip');

var min = 0;
var max = 400000;
var legendCellSize = 20;

var legendVisu2 = svg2.append('g')
    .attr('transform', 'translate(70, 220)');

legendVisu2.selectAll()
    .data(d3.range(colorLegend.length))
    .enter().append('svg:rect')
        .attr('height', legendCellSize + 'px')
        .attr('width', legendCellSize + 'px')
        .attr('x', 5)
        .attr('y', d => (colorLegend.length - 1 - d) * legendCellSize)
        .style("fill", d => colorLegend[d]);

var legendScale = d3.scaleLinear().domain([min, max])
        .range([colorLegend.length * legendCellSize, 0]);
        
legendAxis = legendVisu2.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(legendScale));

d3.dsv(';', dataAltitudePopulation).then(function(data) {
    //Set input domain for color scale
    color.domain([min, max]);

    d3.json(departement).then(function(json) {

        d3.select("#slider").on("input", function() {
            updateViz();
        });

        d3.select("#radioButtons").on("click", function() {
            updateViz();
        })
            
        // update the elements
        function updateViz() {
            updateSeaLevel()
            seaLevelPrediction /= 1000;
            drawMap(seaLevelPrediction)
        }
            
        function drawMap(seaLevel) {
            //Reset Value
            for (var i = 0; i < json.features.length; i++) {
                json.features[i].properties.value = 0.0
            }

            carte = svg2.selectAll("path")
              .data(json.features);
              
            // code en cas de mise a jour de la carte / de changement de semaine
            for (var i = 0; i < data.length; i++) {
                //CP du departement
                if (data[i].cINSEE.includes("2A")) {
                    dataDep = "2A";
                } else if (data[i].cINSEE.includes("2B")) {
                    dataDep = "2B";
                } else {
                    dataDep = parseInt(data[i].cp / 1000);
                }
                
                var altitude = parseInt(data[i].altitude);

                for (var j = 0; j < json.features.length; j++) {
                    var jsonDep = json.features[j].properties.code;
                    
                    if (dataDep == jsonDep && altitude <= seaLevel) {
                        json.features[j].properties.value += parseFloat(data[i].population.replace(',', '.')) * 1000.0;

                        break;
                    }
                }
            }

            
            carte.attr("class", "update")
                .style("fill", function(d) {
                    //on prend la valeur recuperee plus haut
                    var value = d.properties.value;

                    if (value) {
                        return color(value);
                    } else {
                        // si pas de valeur alors en gris
                        return "#ccc";
                    }
                })
              
            // code pour la creation de la carte quand les donnees sont chargees la 1e fois.
            carte.enter()
              .append("path")
              .attr("class", "enter")
              .attr("d", path)
              .style("fill", function(d) {
                  //on prend la valeur recuperee plus haut
                  var value = d.properties.value;

                  if (value) {
                      return color(value);
                  } else {
                      // si pas de valeur alors en gris
                      return "#ccc";
                  }
              })
              .on('mousemove', (event, d) => {
                var posVizu = $("#svg-2 ").offset()
                
                // on recupere la position de la souris
                var mousePosition = d3.pointer(event);
                
                // on affiche le toolip
                tooltip.classed('hidden', false)
                    // on positionne le tooltip en fonction 
                    // de la position de la souris
                    .attr('style', 'left:' + (posVizu.left + mousePosition[0] + 15) +
                            'px; top:' + (posVizu.top + mousePosition[1] - 35) + 'px')
                    // on recupere le nom de l'etat 
                    .html(d.properties.nom + "</br>" + d.properties.value);
              })
              .on('mouseout', () => {
                  // on cache le toolip
                  tooltip.classed('hidden', true);
              });
        }    

        drawMap(0)
    });
});