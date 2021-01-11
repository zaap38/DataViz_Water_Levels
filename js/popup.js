function next(e) {
    var popup = $(".modal")
    var popupId = $(popup).attr("id")
    popupId = parseInt(popupId.split('-')[3]);

    //Go to next popup
    if (popupId != 3 && popupId != 6) {
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
        var popup = $(".modal")
        $(popup).css("display", "none");
        $("#popup-background").css("display", "none");
    }

    if (popupId == 6) {
        $(popup).attr("id", "popup-start-vizu-" + (popupId + 1));
    }
}

function nextVizu() {
    var popup = $(".modal")
    var popupId = $(popup).attr("id")
    popupId = parseInt(popupId.split('-')[3]);

    if (popupId == 3 || popupId == 6) {
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
    }

    if (popupId < 7) {
        $(popup).css("display", "block");
        $("#popup-background").css("display", "block");
    }

    console.log($("#svg-1").css("display"))

    //Switch to next visualization
    if($("#svg-1").css("display") == "block"){
        $("#svg-1").css("display", "none");  
        $("#complement-legend-visu-2").css("display", "block");
        $("#svg-2").css("display", "block");
    } else { //Display 2 vizu
        displayCreditView();
    }
}

function down(e) {
    var popup = $(".modal")
    $(popup).css("display", "none");
    $("#popup-background").css("display", "none");

    var popupId = $(popup).attr("id")
    popupId = parseInt(popupId.split('-')[3]);

    if (popupId < 4) {
        $(popup).attr("id", "popup-start-vizu-3");
    } else if (popupId > 3 && popupId < 7) {
        $(popup).attr("id", "popup-start-vizu-7");
    }
}