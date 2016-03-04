// Adding an option
var addOptionBtn = document.getElementById('add-option');
var optionsDiv = document.getElementById('options')

addOptionBtn.addEventListener('click', function () {
  optionsDiv.appendChild(document.createElement('br'));

  var optionLabel = document.createElement('label');
  var optionText = document.createTextNode('Option: ');
  optionLabel.appendChild(optionText);

  optionsDiv.appendChild(optionLabel);

  var optionInput = document.createElement('input');
  optionInput.type = "text";
  optionInput.name = "options";
  optionInput.className = "form-control poll-option";

  optionsDiv.appendChild(optionInput);
});
