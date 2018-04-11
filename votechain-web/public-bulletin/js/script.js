function updateHistorian(){
    $.ajax({
            url: 'http://localhost:3000/api/Vote',
            dataType: 'json',
            success: function(data) {
                let jsonString = JSON.stringify(data, null, 2);
                console.log(jsonString);
                $("#transactionHistorian").html('<pre><code>' + jsonString + '<\code><\pre>');
            },
            error: function() {
                $("#historian").append("error");
                alert('error');
            }
    });
}
