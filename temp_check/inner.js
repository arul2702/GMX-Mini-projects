

document.getElementById("submit").onclick =function(){
    
    let request;
    if(document.getElementById("ctemp").checked){
        request = document.getElementById("textbox").value;
        request = Number(request);
        request= celcius(request);
        document.getElementById("youask").innerHTML="celcius";
        document.getElementById("answer").value= Math.floor(request) + "C";
    }
    else if(document.getElementById("ftemp").checked){
        request = document.getElementById("textbox").value;
        request = Number(request);
        request = farenheit(request);
        document.getElementById("youask").innerHTML=request;
        document.getElementById("answer").value= Math.floor(request);
    }
}

function celcius(request)
{
    return (request - 32) * (5/9);
}

function farenheit(request){
    return request * 9/5 + 32;
}