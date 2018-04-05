function setButtonListeners(){
    $('#voterSubmitButton').on('click', function() {
        console.log("Button Clicked");
        var jsonBody = {};
        jsonBody['\$class'] = "powlett.luke.votechain.Voter";
        let userId = "v" + Math.abs(hash((new Date()).getTime().toString() + $('#voterLastName').val()));
        jsonBody['userId'] = userId;
        jsonBody['firstName'] = $('#voterFirstName').val();
        jsonBody['lastName'] = $('#voterLastName').val();
    	jsonBody['address'] = $('#voterAddress').val();
        console.log(jsonBody);
        $.post("http://localhost:3000/api/Voter", jsonBody);
        generateBallot(userId);
        getVoters();
    });
}

function getVoters(){
    $.ajax({
            url: 'http://localhost:3000/api/Voter',
            dataType: 'json',
            success: function(data) {
                var stringJson = JSON.stringify(data);
                var json = JSON.parse(stringJson);
                var len = Object.keys(json).length;

                for(i = 0; i < len; i++){
                    let userId = json[i].userId;
                    let firstName = json[i].firstName;
                    let lastName = json[i].lastName;
                    let address = json[i].address;
                    appendVoter(userId, firstName, lastName, address);
                }
            },
            error: function() {
                $("#voterResponse").append("error");
                alert('error');
            }
    });
}

function appendVoter(userId, firstName, lastName, address){
    let numBallots = getUserBallotsNum(userId);
    var voterHtml = '<div class="row"><div class="col-sm-1"></div><div class="col-sm-10"><div class="well"><strong>User ID: ' + userId + '</strong><br><strong>Name: ' + firstName + ' ' + lastName + '</strong><br><strong>Address: ' + address + '</strong><br><strong>Ballots: ' + numBallots + '</strong></div></div><div class="col-sm-1"></div></div>';
    $("#voterResponse").append(voterHtml);
}

function deleteVoter(){
    $.ajax({
        url: 'http://localhost:3000/api/Voter/' + $('#voterId').val(),
        type: 'DELETE',
        success: function(result) {
            getVoters();
        }
    });

    // Also need to delete voters ballot
}

function hash(str){
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

function getUserBallotsNum(userId){
    // filter by json encoded string i.e. {"owner":"<user_id>"}
    let filter = '{"owner":"' + userId + '"}';
    let uriEncodeFilter = encodeURI(filter);
    let query = '?filter=' + uriEncodeFilter;

    let url = 'http://localhost:3000/api/Ballot' + query;
    console.log(url);

    var numBallots = -1;

    let stringJson = JSON.stringify($.get(url));
    let json = JSON.parse(stringJson);
    numBallots = Object.keys(json).length;
    return numBallots;

}

function generateBallot(voterId){
    var jsonBody = {};
    jsonBody['\$class'] = "powlett.luke.votechain.Ballot";
    jsonBody['ballotId'] = (new Date()).getTime().toString();
    jsonBody['owner'] = voterId;
    // TO BE REMOVED AFTER NEXT BUILD
    jsonBody['used'] = "false";

    console.log(jsonBody);

    $.post("http://localhost:3000/api/Ballot", jsonBody);
}

function updateHistorian(){
    $.ajax({
            url: 'http://localhost:3000/api/system/historian',
            dataType: 'json',
            success: function(data) {
                $("#historian").html(JSON.stringify(data));
            },
            error: function() {
                $("#historian").append("error");
                alert('error');
            }
    });
}
