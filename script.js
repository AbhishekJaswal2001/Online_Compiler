function func()
{ 
var load=document.getElementById("Load");  
var ip=document.getElementById("textCode");
var op=document.getElementById("textOutput");

var langId=document.getElementById("lg").value;
var code=ip.value;

if(code!="")
{
compile.style.display='none';
load.style.display='block';
fetchResult(code,langId);
}
else
{
    alert("Plese type your code");
}
}
function fetchResult(code,langId)
{

    var request=new XMLHttpRequest();
    request.open("POST","https://codequotient.com/api/executeCode");
    var obj=JSON.stringify({code, langId});

    request.setRequestHeader("Content-Type","application/json");
    request.send(obj);

    request.addEventListener("load",function(event)
    {
        var data=JSON.parse(event.currentTarget.responseText);
        if(data.codeId!=null)
        {
            print(data.codeId);
        }
    })
}

function print(codeId)
{
    var op=document.getElementById("textOutput");
    setTimeout(function(){
        var request=new XMLHttpRequest();
        request.open("GET","https://codequotient.com/api/codeResult/"+codeId);
        request.send();

        request.addEventListener("load",function(event){
            var output=JSON.parse(JSON.parse(event.currentTarget.responseText).data);
            if(output.output != "")
                op.innerHTML = output.output;
            else
            op.innerHTML = "error: "+output.errors;
           
        })
        var compile=document.getElementById("compile");  
        var load=document.getElementById("Load");  
        compile.style.display='block';
        load.style.display='none';
    },2000)

}
