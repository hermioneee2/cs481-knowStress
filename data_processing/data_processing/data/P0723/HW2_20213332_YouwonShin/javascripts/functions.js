
// in dropdown menu in bootstrap, the "select..." can not be changed into the values that the user selected
// code below can change the text of the first dropdown menu button

var dropdownMenu = document.querySelectorAll(".dropdown-menu li a")

for (let i = 0; i < dropdownMenu.length; i++){
    dropdownMenu[i].addEventListener('click', function(evt){
        document.querySelector("#dropdownMenuButton1").innerHTML = evt.target.textContent
    });
}

// the string of csv into json
function csvJSON(csv){

    var lines=csv.split("\r\n");
    var result = [];
  
    var headers=lines[0].split(",");
  
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
  
        result.push(obj);
  
    }
  
    return JSON.stringify(result); //JSON
}