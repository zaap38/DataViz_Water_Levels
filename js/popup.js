function next(e) {
    var popup = $(e).parents()[3]
    var popupId = $(popup).attr("id")
    popupId = parseInt(popupId.split('-')[3]);

    //Go to next popup
    if (popupId != "popup-start-vizu-3" || popupId != "popup-start-vizu-6") {
        d3.dsv(';', "./db/ContentPopup.csv").then(function(data){
            for (var i = 0; i < data.length; i++) {
                //Search the next content
                if (data[i].id == "popup-start-vizu-" + (popupId + 1)) {
                    $(".modal-header").html(data[i].header);
                    $(".modal-body").html(data[i].content);
                    $(popup).attr("id", "popup-start-vizu-" + (popupId + 1));
                    break;
                }
            }
        })
    } else { //Display a visualization
        
    }
}

function down(e) {
    var popup = $(e).parents()[3];
    $(popup).css("display", "none");
    $("#popup-background").css("display", "none");
}