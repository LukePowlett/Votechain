function setButtonListeners(){

    $('#candidateSubmitButton').on('click', function() {
        console.log("Button Clicked");
        var jsonBody = {};
        jsonBody['\$class'] = "powlett.luke.votechain.Candidate";
        jsonBody['userId'] = "c" + Math.abs(hash((new Date()).getTime().toString() + $('#candidateLastName').val()));
        jsonBody['firstName'] = $('#candidateFirstName').val();
        jsonBody['lastName'] = $('#candidateLastName').val();
    	jsonBody['party'] = $('#candidateParty').val();
        console.log(jsonBody);
        $.post("http://localhost:3000/api/Candidate", jsonBody);
        getCandidates();
    });

}

function genUserId(){
    var userId = "";
    return userId;
}

function getCandidates(){
    $.ajax({
            url: 'http://localhost:3000/api/Candidate',
            dataType: 'json',
            success: function(data) {
                var stringJson = JSON.stringify(data);
                var json = JSON.parse(stringJson);
                var len = Object.keys(json).length;

                for(i = 0; i < len; i++){
                //    $("#candidateResponse").append(JSON.stringify(json[i]));
                    let userId = json[i].userId;
                    let firstName = json[i].firstName;
                    let lastName = json[i].lastName;
                    let party = json[i].party;
                    appendCandidate(userId, firstName, lastName, party);
                }
            },
            error: function() {
                $("#candidateResponse").append("error");
                alert('error');
            }
    });
}

function appendCandidate(userId, firstName, lastName, party){
    var candidateHtml = '<div class="row"><div class="col-sm-1"></div><div class="col-sm-10"><div class="well"><strong>User ID: ' + userId + '</strong><br><strong>Name: ' + firstName + ' ' + lastName + '</strong><br><strong>Party: ' + party + '</strong></div></div><div class="col-sm-1"></div></div>';
    $("#candidateResponse").append(candidateHtml);

}

function deleteCandidate(){
    $.ajax({
        url: 'http://localhost:3000/api/Candidate/' + $('#candidateId').val(),
        type: 'DELETE',
        success: function(result) {
            getCandidates();
        }
    });
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

function generateBallot(voterId){
    var jsonBody = {};
    jsonBody['\$class'] = "powlett.luke.votechain.Ballot";
    jsonBody['ballotId'] = (new Date()).getTime().toString();
    jsonBody['owner'] = voterId;

    console.log(jsonBody);

    $.post("http://localhost:3000/api/Vote", jsonBody);
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
