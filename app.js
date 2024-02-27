var data;

function levenshtein(a, b) {
  if (a.length == 0) return b.length;
  if (b.length == 0) return a.length;

  var matrix = [];

  // increment along the first column of each row
  var i;
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 3, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1
          )
        ); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
}

function is_good(str) {
  data.forEach((word) => {
    if (levenshtein(str, word) < 6 || word == str) {
      return false;
    }
  });
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
  window.lavenshtein = levenshtein;
});
