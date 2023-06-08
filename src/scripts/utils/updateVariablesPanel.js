const d = document;
const ss = sessionStorage;
const eventType = ["click", "keydown"];

const fillVariablePanel = () => {
  const varListObject = JSON.parse(ss.getItem("varList"));
  console.log(varListObject);
  for (const varName in varListObject) {
    let varContent = d.querySelector(`.variable-${varName}`);
    console.log(varContent);
    varContent.textContent = `${varName} = ${varListObject[varName]}`
  }
}

const updateVariablesPanel = () => {
  fillVariablePanel();
  eventType.forEach(type => {
    d.addEventListener(type, (e) =>{
      if (e.target.value === "=" || e.key === "Enter") {
        fillVariablePanel();
      }
    })
  })
}

export default updateVariablesPanel;