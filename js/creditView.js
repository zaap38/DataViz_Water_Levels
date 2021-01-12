function displayCreditView() {
    $("#credit-view").css("display", "block");
    $("#back-visu-1")
		.attr("onclick", "displayFirstView()")
		.text("Retour sur la première visualisation")
		.css("display", "inline-block");
    $("#back-visu-2")
		.attr("onclick", "displaySecondView()")
		.text("Retour sur la seconde visualisation")
		.css("display", "inline-block");
    $("#container").css("display", "none");
    $("#svg-1").css("display", "none");
    $("#svg-2").css("display", "none");
    $("#complement-legend-visu-2").css("display", "none");
    $("#next-vizu").css("display", "none");
}

function displayFirstView() {
    $("#credit-view").css("display", "none");
    $("#back-visu-1")
		.attr("onclick", "displayCreditView()")
		.text("Retour sur la page de crédit")
		.css("display", "inline-block");
    $("#back-visu-2")
		.attr("onclick", "displaySecondView()")
		.text("Retour sur la seconde visualisation")
		.css("display", "inline-block");
    $("#container").css("display", "block");
    $("#svg-1").css("display", "block");
    $("#svg-2").css("display", "none");
    $("#complement-legend-visu-2").css("display", "none");
    $("#title").text("Prédiction du niveau des eaux pour l'année :");
}

function displaySecondView() {
    $("#credit-view").css("display", "none");
    $("#back-visu-1")
		.attr("onclick", "displayFirstView()")
		.text("Retour sur la première visualisation")
		.css("display", "inline-block");
    $("#back-visu-2")
		.attr("onclick", "displayCreditView()")
		.text("Retour sur la page de crédit")
		.css("display", "inline-block");
    $("#container").css("display", "block");
    $("#svg-1").css("display", "none");
    $("#svg-2").css("display", "block");
    $("#complement-legend-visu-2").css("display", "block");
    $("#title").text("Prédiction de la population et de la superficie touchées par la montée des eaux en :");
}