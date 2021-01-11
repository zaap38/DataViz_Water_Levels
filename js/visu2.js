var width = 600, height = 480;

departement = "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson"
data = "https://lyondataviz.github.io/teaching/lyon1-m2/2020/data/covid-france-mars-avril.csv"

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

var path = d3.geoPath().projection(projection);

var tooltip = d3.select('body').append('div')
    .attr('class', 'hidden tooltip');

daysArray = []
daysArraySet = false

//Partie Bonus
d3.csv(data).then(function(data) {
    //Set input domain for color scale
    color.domain([
        d3.min(data, function(d) { 
            return d.hosp;
        }),
        d3.max(data, function(d) {
            return d.hosp; 
        })
    ]);

    d3.json(departement).then(function(json) {
        if (daysArraySet == false) {
            var i = 0
            while(data[i].dep == 1) {
                daysArray.push(data[i].jour)
                i++
            }

            /*d3.select('#day').html(daysArray[0]);
            d3.select('#slider').attr("max", i-1);*/

            daysArraySet = true
        }
   
        /*d3.select("#slider").on("input", function() {
            updateViz(this.value);
        });*/
            
        // update the elements
        /*function updateViz(value) {
            d3.select('#day').html(daysArray[value]);
            drawMap(daysArray[value]);
        }*/
            
        function drawMap(currentWeek) {
            carte = svg2.selectAll("path")
              .data(json.features);
              
            // code en cas de mise a jour de la carte / de changement de semaine
            for (var i = 0; i < data.length; i++) {
                //Nom dU departement
                var dataDep = data[i].dep;
                
                //Jour
                var dataDay = data[i].jour

                //Valeur associee a l'etat
                var dataValue = parseInt(data[i].hosp);

                //Recherche de l'etat dans le GeoJSON
                for (var j = 0; j < json.features.length; j++) {
                    var jsonDep = json.features[j].properties.code;
                    if (dataDep == jsonDep && dataDay == currentWeek) {
                        //On injecte la valeur de l'Etat dans le json
                        json.features[j].properties.value = dataValue;

                        //Pas besoin de chercher plus loin
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
                  console.log("oui")
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
                    .html(d.properties.nom);
              })
              .on('mouseout', () => {
                  // on cache le toolip
                  tooltip.classed('hidden', true);
              });
        }    

        drawMap(daysArray[0])
    });
});