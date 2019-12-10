var mymap = L.map('mapid').setView([40.9284, 14.1919], 10);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoiYWsxMnN2aWx1cHBvIiwiYSI6ImNrMG1lNjBkbDAxcTAzbHBhZ3Vudm9hYnAifQ.OfQ49RjPYLYVcNislzfDwg'
}).addTo(mymap);

$.ajax({
    url: "/dati/anno",
    method: "GET",
    dataType: "json",
    success: function (data) {
        console.log(data);
        var len = data.response.length;
        $("#anno").empty();
        for (var i = 0; i < len; i++) {
            var idAnno = data.response[i]['idanno'];
            var value1 = data.response[i]['anno'];
            $("#anno").append("<option value='" + value1 + "' >" + value1 + "</option>");

        }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("Status: " + textStatus); alert("Error: " + errorThrown);
    }
});

$.ajax({
    url: "/dati/inquinanti",
    method: "GET",
    dataType: "json",
    success: function (data) {
        console.log(data);
        var len = data.response.length;
        $("#inquinanti").empty();
        for (var i = 5; i < len; i++) {
            var value1 = data.response[i]['COLUMN_NAME'];
            $("#inquinanti").append("<option value='" + value1 + "' >" + value1 + "</option>");

        }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("Status: " + textStatus); alert("Error: " + errorThrown);
    }
});

$("#cerca").click(function () {
    let anno = $( "#anno" ).val();
    let inquinante = $('#inquinanti').val();
    $.ajax({
        url: `/dati/inquinante/${anno}/${inquinante}`,
        method: "GET",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            var response = data.response;
            var len = data.response.length;
            for(var i = 0; i<len; i++) {
                var marker = L.marker([response[i]['latitudine'], response[i]['longitudine']]).addTo(mymap);
                var circle = L.circle([response[i]['latitudine'], response[i]['longitudine']], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 500
                }).addTo(mymap);
                marker.bindPopup("<b>" + response[i]['postazioni'] + "</b><br>" + response[i]['value']).openPopup();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus); alert("Error: " + errorThrown);
        }
    });
});