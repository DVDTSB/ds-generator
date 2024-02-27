var data = 
  .trim()
  .split("\n");

function is_good(str) {
  if (data.includes(str)) {
    return false;
  }
  return true;
}

function generateStrings() {
  var outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "";

  for (var i = 0; i < 10; i++) {
    let str = sg.generate();

    if (is_good(str)) {
      var paragraph = document.createElement("p");
      paragraph.textContent = str;
      outputDiv.appendChild(paragraph);
    }
  }
}

var sg = new ROT.StringGenerator();

var lines = data.slice();

while (lines.length) {
  var line = lines.pop().trim();
  if (!line) {
    continue;
  }
  sg.observe(line);
}

// Initial generation when the page loads

document.addEventListener("DOMContentLoaded", function () {
  generateStrings();

  window.generateStrings = generateStrings;
});
