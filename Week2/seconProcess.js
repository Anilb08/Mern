function logResponseBody(jsonBody){
    console.log(jsonBody);
}

function callbackFn(result){
    result.json().then(logResponseBody)
}

var sendObj = {
    method : "GET"
};


fetch("https://localhost:3000/handleSum?counter=10",sendObj)