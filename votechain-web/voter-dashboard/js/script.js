function setButtonListeners(){

    $('#voterLoginButton').on('click', function() {
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
