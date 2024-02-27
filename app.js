var data;

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

function fetchData() {
  fetch("https://raw.githubusercontent.com/DVDTSB/ds-generator/main/data.txt")
    .then((response) => response.text())
    .then((text) => {
      data = text.trim().split("\n");
      initializeGenerator();
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function initializeGenerator() {
  var lines = data.slice();

  while (lines.length) {
    var line = lines.pop().trim();
    if (!line) {
      continue;
    }
    sg.observe(line);
  }

  // Initial generation when the page loads
  generateStrings();
}

// Fetch data from GitHub repo and initialize generator when the page loads
document.addEventListener("DOMContentLoaded", function () {
  fetchData();
  window.generateStrings = generateStrings;
});
