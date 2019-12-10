let tabellaPazienti;


$.ajax({
    url: "/database/anno",
    method: "GET",
    dataType: "json",
    success: function (data) {
        console.log(data);
        var len = data.response.length;
        $("#anno").empty();
        for (var i = 0; i < len; i++) {
            var idAnno = data.response[i]['idanno'];
            var value1 = data.response[i]['anno'];
            $("#anno").append("<option value='" + idAnno + "' >" + value1 + "</option>");

        }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("Status: " + textStatus); alert("Error: " + errorThrown);
    }
});

$.ajax({
    url: "/database/asl",
    method: "GET",
    dataType: "json",
    success: function (data) {
        console.log(data);
        var len = data.response.length;
        $("#asl").empty();
        for (var i = 0; i < len; i++) {
            var idasl = data.response[i]['id_asl'];
            var value1 = data.response[i]['asl'];
            $("#asl").append("<option value='" + idasl + "' >" + value1 + "</option>");

        }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("Status: " + textStatus); alert("Error: " + errorThrown);
    }
});

$.ajax({
    url: "/database/comuneresidenza",
    method: "GET",
    dataType: "json",
    success: function (data) {
        console.log(data);
        var len = data.response.length;
        $("#comune").empty();
        for (var i = 0; i < len; i++) {
            var value1 = data.response[i]['comune'];
            var idComune = data.response[i]['idcomune_residenza'];
            $("#comune").append("<option value='" + idComune + "' >" + value1 + "</option>");

        }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("Status: " + textStatus); alert("Error: " + errorThrown);
    }
});

$.ajax({
    url: "/database/diagnosi",
    method: "GET",
    dataType: "json",
    success: function (data) {
        console.log(data);
        var len = data.response.length;
        $("#diagnosi").empty();
        for (var i = 0; i < len; i++) {
            var idDiagnosi = data.response[i]['id_diagnosi']
            var value1 = data.response[i]['diagnosi'];
            $("#diagnosi").append("<option value='" + idDiagnosi + "' >" + value1 + "</option>");
        }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("Status: " + textStatus); alert("Error: " + errorThrown);
    }
});

$(document).ready(function () {
   $("select#anno").change(function () {
       let annoSelezionato = $(this).children("option:selected").text();
       $.ajax({
           url: `/database/postazioniarpac/${annoSelezionato}`,
           method: "GET",
           dataType: "json",
           success: function (data) {
               console.log("post",data);
               var len = data.response.length;
               $("#postazioni").empty();
               for (var i = 0; i < len; i++){
                   var value1 = data.response[i].postazioni;
                   var idPostazioni = data.response[i].id_postazioni_arpac;
                   $("#postazioni").append("<option value='" + idPostazioni + "' >" + value1 + "</option>");
               }
           },
           error: function (XMLHttpRequest, textStatus, errorThrown) {
               alert("Status: " + textStatus); alert("Error: " + errorThrown);
           }
       });
   });
});


$("#cerca").click(function () {
    let idDiagnosi = $( "#diagnosi" ).val();
    let idAsl = $( "#asl" ).val();
    let idPostazioni = $( "#postazioni" ).val();
    let idComune = $( "#comune" ).val();
    let idAnno = $( "#anno" ).val();
    $.ajax({
        url: `/database/stella/${idDiagnosi}/${idAsl}/${idPostazioni}/${idComune}/${idAnno}`,
        method: "GET",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            if ($.fn.DataTable.isDataTable(tabellaPazienti)) {
                tabellaPazienti.destroy();
            }
            var len = data.response.length;
            if (len == 0) {
                $('#centralModalDanger').modal('show');
            }
            tabellaPazienti = $('#tabellaPazienti').DataTable({
                language: {
                    url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Italian.json',
                },
                data: data.response,
                select: true,
                columns: [
                    {"data": "anno"},
                    {"data": "sesso"},
                    {"data": "comune_nascita"},
                    {"data": "comune_residenza"},
                    {"data": "diagnosi"},
                    {"data": "eta"}
                ]
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });
});






