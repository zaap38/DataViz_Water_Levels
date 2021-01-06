
/**
 * Déclaration des variables
**/
const width = document.getElementById("container").offsetWidth * 0.90,
graphHeight = 600,

/* Largeur des blocs de la légende du graphe */
legendCellWidth = 80,

/* Largeur des blocs du graphe */
barWidth = 80,

/* Espace entre chaque bloc */
barSpace = 2;

/* Police */
fontPolice = "verdana";

/* Echelle de couleur pour la légende du graphe */
const legendColor = ["#002e4d", "#003d66", "#004d80", "#005c99", "#006bb3", "#007acc", "#008ae6", "#0099ff", "#1aa3ff", "#33adff", "#4db8ff", "#66c2ff", "#80ccff", "#99d6ff", "#b3e0ff", "#ccebff", "#e6f5ff"];

const svg = d3.select('#container').append("svg")
	.attr("id", "svg")
	.attr("width", 12 * (legendCellWidth + barSpace) + (legendCellWidth + barSpace) - barSpace)
	.attr("height", graphHeight)
	.attr("transform", "translate(0, 100)")
	.attr("class", "svg");
	
/* Conteneur du graphe */
const graph = svg.append("g")
	.attr("width", width-legendCellWidth)
	.attr("transform", "translate("+legendCellWidth+", 0)");
/* Conteneur de la légende du graphe */
const legend = svg.append("g")
	.attr("width", legendCellWidth);

d3.csv(
	"./db/world-countries-elevation.csv"
).then(function (data) {
	
	/* Taille d'une cellule d'un mètre d'altitude */
	legendCellHeight = graphHeight / 35;
	
	/**
	 * Construction de la légende du graphe
	**/
	legend.selectAll("rect")
		.data(d3.range(legendColor.length))
		.enter().append("rect")
			.attr("height", function(d){
				if(d < 16)
					return legendCellHeight;
				else
					return graphHeight - (legendColor.length - 1) * legendCellHeight;
			})
			.attr("width", legendCellWidth)
			.attr("x", 0)
			.attr("y", function(d){
				if(d < 16)
					return graphHeight - (d + 1) * legendCellHeight;
				else
					return 0;
			})
			.style("fill", function(d){return legendColor[d]});
			
	legend.selectAll("text")
		.data(d3.range(legendColor.length))
		.enter().append("text")
			.attr("x", legendCellWidth/2)
			.attr("y", function(d){
				if(d < 16)
					return graphHeight - (d + 1) * legendCellHeight + 15;
				else
					return 0 + 15;
					
			})
			.style("font-size", "12.5")
			.style("font-weight", "bold")
			.style("text-anchor", "middle")
			.style("font-family", fontPolice)
			.text(function(d){
				if(d < 16)
					return d+1+"m";
				else if(d == 16)
					return 35+"m";
				else
					return 50+"m";
			});
			
	/**
	 * Construction du graphe
	**/
	graph.selectAll("rect")
		.data(data)
		.enter().append("rect")
			.attr("x", function(d){return d.id * (barWidth+barSpace)})
			.attr("y", function(d){return graphHeight - d.elevation * legendCellHeight})
			.attr("width", function(d){return barWidth})
			.attr("height", function(d){return d.elevation * legendCellHeight})
			.attr("fill", "black");
	
	graph.selectAll("text")
		.data(data)
		.enter().append("text")
			.attr("x", function(d){return d.id * (barWidth+barSpace) + barWidth/2})
			.attr("y", function(d){return graphHeight - d.elevation * legendCellHeight + legendCellHeight/2 + 5})
			.style("fill", "white")
			.style("font-size", "9.5")
			.style("font-weight", "bold")
			.style("text-anchor", "middle")
			.style("font-family", fontPolice)
			.text(function(d){return d.name});
});