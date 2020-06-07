// Get History
function getHistory() {
  return document.querySelector("#history-value").innerHTML;
}
// Print Output
function printHistory(num) {
  document.querySelector("#history-value").innerHTML = num;
}

// Get Output
function getOutput() {
  return document.querySelector("#output-value").innerHTML;
}
// Print Output
function printOutput(num) {
  if (num === "") {
    document.querySelector("#output-value").innerHTML = num;
  } else {
    document.querySelector("#output-value").innerHTML = getFormattedNumber(num);
  }
}

// Formats the number
function getFormattedNumber(num) {
  if (num === "-") {
    return "";
  }
  let n = Number(num);
  let value = n.toLocaleString("en");
  return value;
}

// Removes commas & converts to number
function reverseNumberFormat(num) {
  return Number(num.replace(/,/g, ""));
}

// Getting the operators and looping through each one
var operators = document.getElementsByClassName("operator");
for (var i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", function () {
    if (this.id === "clear") {
      printHistory("");
      printOutput("");
    } else if (this.id === "backspace") {
      var output = reverseNumberFormat(getOutput()).toString();
      if (output) {
        // if output has a value
        output = output.substring(0, output.length - 1);
        printOutput(output);
      }
    } else {
      var output = getOutput();
      var history = getHistory();
      if (output == "" && history != "") {
        if (isNaN(history[history.length - 1])) {
          history = history.substring(0, history.length - 1);
        }
      }
      if (output != "" || history != "") {
        output = output == "" ? output : reverseNumberFormat(output);
        history = history + output;
        if (this.id === "=") {
          var result = eval(history);
          printOutput(result);
          printHistory("");
        } else {
          history = history + this.id;
          printHistory(history);
          printOutput("");
        }
      }
    }
  });
}
// Same thing but for numbers
var numbers = document.getElementsByClassName("number");
for (var i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", function () {
    var output = reverseNumberFormat(getOutput());
    if (output != NaN) {
      // if output is a number
      output = output + this.id;
      printOutput(output);
    }
  });
}
