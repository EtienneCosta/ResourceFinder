var addOption = document.getElementById("add-option");
var selectField = document.getElementById("type");
addOption.addEventListener("click", function() {
  var item = prompt("Insert the new type:");
  if(item){
    var option = document.createElement("option");
    option.setAttribute("value", item);
    var optionName = document.createTextNode(item);
    option.appendChild(optionName);
    selectField.appendChild(option);
  }
});