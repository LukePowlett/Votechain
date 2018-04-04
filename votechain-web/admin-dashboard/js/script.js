function setButtonListeners(){

    $('#candidateSubmitButton').on('click', function() {
        console.log("Button Clicked");
        var jsonBody = {};
        jsonBody['\$class'] = "powlett.luke.votechain.Candidate";
        jsonBody['userId'] = Math.abs(hash((new Date()).getTime().toString() + $('#candidateLastName').val()));
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
                $("#candidateResponse").html(JSON.stringify(data));
            //    var json = data, obj = JSON.parse(json);

            },
            error: function() {
                $("#candidateResponse").append("error");
                alert('error');
            }
    });

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
