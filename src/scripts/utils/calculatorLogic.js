const d = document;
const eventType = ["click", "keydown"];
const $operationScreen = d.querySelector(".screen__panel--operation");
const $resultScreen = d.querySelector(".screen__panel--result");
const btnActions = {
  // clear both screens
  AC: () => {
    $operationScreen.innerHTML = "";
    $resultScreen.innerHTML = "";
  },
  // Delete the last entered character or "visual button" 
  DEL: () => {
    const visualBtn = [
      "ANS",
      "SET"
    ]
    visualBtn.forEach((btn) => {
      if($operationScreen.innerHTML.endsWith(btn)) {
        $operationScreen.innerHTML = $operationScreen.innerHTML.slice(0, -2)
      }
    })
    $operationScreen.innerHTML = $operationScreen.innerHTML.slice(0, -1);
    $resultScreen.innerHTML = "";
  }
};
let varList = {
  ANS: null,
  X: null,
  Y: null,
  Z: null,
};

// Extracts the input value from a button or a key and transforms special values to make them work in the code
const extractEntry = (e) => {
  let btnValue = e.target.value;
  let keyValue = e.key;

  if (keyValue === "Enter") keyValue = "=";
  if (keyValue === "Backspace") keyValue = "DEL";
  if (keyValue === "Delete") keyValue = "AC";
  if (keyValue === "s" && e.altKey) keyValue = "SET";
  if (keyValue === "a" && e.altKey) keyValue = "ANS";

  if (e.type === "click") return btnValue;
  if (e.type === "keydown") return keyValue.toUpperCase();
}

// validate if one of the action buttons was pressed
const validateActionBtn = (entry) => {
  return btnActions.hasOwnProperty(entry);
}

// execute the action of the button
const triggerBtnAction = (entry) => {
  return btnActions[entry]();
}

// validate if a type of character or button should be displayed on the screen
const validateToShow = (entry) => {
  const characterType = [/^[XYZ]/, /^\d/, /^[().*/+-]/];
  const buttonType = ["SET", "ANS"];
  let isValid = false;
  
  if(characterType.some(type => type.test(entry))) isValid = true;
  if(buttonType.some(type => entry?.includes(type))) isValid = true;

  return isValid;
}

// clear both screens
const clearScreen = () => {
  $operationScreen.innerHTML = "";
  $resultScreen.innerHTML = "";
}

/* To show at screen:
  * Prevents that two math operators are not entered consecutively.
  * Add the ANS variable before the next math operator.
*/
const showAtScreen = (entry) => {
  const validMathSymbols = /[.*/+-]/;
  let lastCharacter = $operationScreen.innerHTML.at(-1);

  if (validMathSymbols.test(entry) && validMathSymbols.test(lastCharacter)) {
    $operationScreen.innerHTML;
  } else if (validMathSymbols.test(entry) && varList.ANS && $operationScreen.innerHTML === "") {
    $operationScreen.innerHTML += "ANS" + entry;
  } else {
    $operationScreen.innerHTML += entry;
  }
}

// extracts screen operation value and adjust the implicit multiplication with parenthesis
const extractScreenValue = () => {
  // let value = $operationScreen.innerHTML.replace(/,/g, ".");
  let value = $operationScreen.innerHTML;
  let arrayValue = [...value];
  arrayValue.forEach((char, i) => {
    if (char === "(" && /\d/.test(arrayValue[i - 1])) {
      arrayValue.splice(i, 0, "*");
      value = arrayValue.join("");
    }
  })
  return value;
}

// Sets the variable value in the object and shows the confirmation
const setVariable = (value) => {
  let variable = value[0];
  let newValue;

  if (value.endsWith("ANS")) {
    value = value.replace("ANS", `${varList.ANS}`);
    newValue = value.split("").slice(4).join("");
  } else {
    newValue = value.split("").slice(4).join("");
  }

  varList[variable] = newValue;
  $resultScreen.innerHTML = `>${value[0]}=${varList[value[0]]}`;
}

// add the variables list updated to local storage
const addToSessionStorage = () => {
  const varListString = JSON.stringify(varList);
  sessionStorage.setItem("varList", varListString);
}

// Replace variables values before calculate the result
const replaceVariables = (value) => {
  let newValue = value;
  Object.keys(varList).forEach(variable => {
    newValue = newValue.replaceAll(`${variable}`, `${varList[variable]}`);
  })

  return newValue;
}

// Calculates and show the result or the Syntax error message
const calculateResult = (value) => {
  try {
    let calculatedValue = eval(value);

    varList.ANS = calculatedValue;
    $resultScreen.innerHTML = calculatedValue;
  } catch (e) {
    $resultScreen.innerHTML = "Syntax Error";
  }
}

const calculatorLogic = () => {
  eventType.forEach(type => {
    d.addEventListener(type, (e) => {
      let entry = extractEntry(e);
      let validToShow = validateToShow(entry);
      let validActionBtn = validateActionBtn(entry);

      // Verify if any action button has been pressed
      if (validActionBtn) {
        triggerBtnAction(entry);
      }

      // The screen is cleared when the given conditions are met
      if ($resultScreen.innerHTML && entry !== "DEL" && entry !== "?" && e.target.matches(".calculator__keypad input")) {
        clearScreen();
      }

      // Display valid character or button at operation screen
      if (validToShow) {
        showAtScreen(entry);
      }

      /* Pressing "Enter" or "=" can trigger one of two posible situations:
        * 1. Set the value of a variable if the required structure is met.
        * 2. Math operation showed at operation screen is calculated.
      */
      if (entry === "=") {
        let value = extractScreenValue();
        if (/^[XYZ]SET\d+$/.test(value) || /^[XYZ]SETANS+$/.test(value)) {
          setVariable(value);
        } else {
          value = replaceVariables(value);
          calculateResult(value);
        }
        addToSessionStorage();
      }
    })
  })
}

export default calculatorLogic;