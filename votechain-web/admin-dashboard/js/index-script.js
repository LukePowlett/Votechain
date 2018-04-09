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

function generateCandidate(firstName, lastName, party){
    var jsonBody = {};
    jsonBody['\$class'] = "powlett.luke.votechain.Candidate";
    jsonBody['userId'] = "c" + Math.abs(hash((new Date()).getTime().toString() + lastName));
    jsonBody['firstName'] = firstName;
    jsonBody['lastName'] = lastName;
    jsonBody['party'] = party;
    console.log(jsonBody);
    $.post("http://localhost:3000/api/Candidate", jsonBody);
}

function generateVoter(firstName, lastName, address){
    var jsonBody = {};
    jsonBody['\$class'] = "powlett.luke.votechain.Voter";
    let userId = "v" + Math.abs(hash((new Date()).getTime().toString() + lastName));
    jsonBody['userId'] = userId;
    jsonBody['firstName'] = firstName;
    jsonBody['lastName'] = lastName;
    jsonBody['address'] = address;
    console.log(jsonBody);

    $.ajax({
            url: 'http://localhost:3000/api/Voter',
            data: jsonBody,
            dataType: 'json',
            success: function(data) {
                generateBallot(userId);
            },
            error: function(error) {
                console.error(error);
            }
    });
}

function generateBallot(voterId){
    var jsonBody = {};
    jsonBody['\$class'] = "powlett.luke.votechain.Ballot";
    jsonBody['ballotId'] = "b" + Math.abs(hash((new Date()).getTime().toString() + voterId));
    jsonBody['owner'] = voterId;
    // TO BE REMOVED AFTER NEXT BUILD
    jsonBody['used'] = "false";
    console.log(jsonBody);

    $.ajax({
            url: 'http://localhost:3000/api/Ballot',
            data: jsonBody,
            dataType: 'json',
            success: function(data) {
                generateBallot(userId);
            },
            error: function(error) {
                console.error(error);
            }
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
                resetView();

                for(i = 0; i < len; i++){
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
    let candidateBallots = getUserBallotsNum(userId);
    var candidateHtml = '<div class="row"><div class="col-sm-1"></div><div class="col-sm-10"><div class="well"><strong>User ID: ' + userId + '</strong><br><strong>Name: ' + firstName + ' ' + lastName + '</strong><br><strong>Party: ' + party + '</strong><br><strong>Votes: ' + candidateBallots + '</strong></div></div><div class="col-sm-1"></div></div>';
    $("#candidateResponse").append(candidateHtml);
}

function resetView(){
    $("#candidateResponse").innerHtml="<br>";
}

function getUserBallotsNum(userId){
    // filter by json encoded string i.e. {"owner":"<user_id>"}
    let filter = '%7B%22where%22%3A%7B%22owner%22%3A%22resource%3Apowlett.luke.votechain.Candidate%23' + userId + '%22%7D%7D';
    // let uriEncodeFilter = encodeURI(filter);
    let query = '?filter=' + filter;

    let url = 'http://localhost:3000/api/Ballot' + query;
    console.log(url);

    var numBallots = -1;

    $.ajax({
            url: url,
            dataType: 'json',
            async: false,
            success: function(data) {
                let stringJson = JSON.stringify(data);
                let json = JSON.parse(stringJson);
                console.log(json);
                numBallots = Object.keys(json).length;
            },
            error: function(error) {
                console.log(error);
            }
    });

    return numBallots;

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

function demo(){
    console.log("DEMO");
    generateCandidate("Alistar", "Brown", "Red");
    generateCandidate("June", "Craddock", "Blue");
    generateCandidate("Michael", "Fletcher", "Green");

    generateVoter("Anna", "Melbrook", "12 Owl Street");
    generateVoter("Nicholas", "West", "6a Hanley Avenue");
    generateVoter("Steven", "Colt", "33 Long Road");

    location.reload();
}
