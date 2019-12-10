let  pazientiPerAnnoM = [];
let  pazientiPerAnnoF = [];
let date = [];

$( document ).ready(function() {
    sesso();
    numeroPazienti();
});

function sesso(){
    $.ajax({
        url: "/datistatistici/sesso",
        method: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var ctx = $('#graficoSesso');
            console.log(data.response);
            var myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Maschio', 'Femmina'],
                    datasets: [{
                        label: '# of Votes',
                        data: data.response,
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 99, 132, 1)',

                        ],
                        borderWidth: 1
                    }]
                },
                options: {

                }
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus); alert("Error: " + errorThrown);
        }
    });
}


function numeroPazienti() {
    $.ajax({
        url: "/datistatistici/date",
        method: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data.response);
            //recuperaNumeroPazientiPerAnno (response.data);
            let risultato = {};
            pazientiPerAnnoM = [];
            pazientiPerAnnoF = [];
            for (var i = 0; i < data.response.length; i++) {
                var temp = data.response[i]['anno'];
                recuperaPazientiPerAnno(temp, data.response);
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus); alert("Error: " + errorThrown);

        }
    });
}

function recuperaPazientiPerAnno(data, anni) {
    $.ajax({
        url: `/datistatistici/sessoPazientiPerData/${data}`,
        method: "GET",
        dataType: "json",
        success: function (conteggioPazienti) {
            console.log(conteggioPazienti.response[0]['count(id_pazienti)']);
            pazientiPerAnnoM.push(conteggioPazienti.response[0]['count(id_pazienti)']);
            pazientiPerAnnoF.push(conteggioPazienti.response[1]['count(id_pazienti)']);
            if (pazientiPerAnnoM.length === 8){
                printRadar(anni);
            }
        }
    });
}

function printRadar(data) {
    console.log(data);
    console.log("sono qui");
    for (var i = 0; i < data.length; i++) {
        date.push(data[i]['anno']);
    }
    var ctx = $('#graficoDate');
    var myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: date,
            datasets: [{
                label: "Maschio",
                backgroundColor: "rgba(200,0,0,0.2)",
                data: pazientiPerAnnoM
            }, {
                label: "Femmina",
                backgroundColor: "rgba(0,0,200,0.2)",
                data: pazientiPerAnnoF
            }]
        }
    });
}
