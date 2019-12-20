$("document").ready(function(){
    $("input[type=file]").change(function(){
        let nomefile = this.files[0].name;
        $.ajax({
            url: "/home/matlab/" + nomefile,
            method: "GET",
            //dataType: "json",
            dataType: "text",
            success: function (data) {
                console.log(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus); alert("Error: " + errorThrown);
            }
        });
    });
});