function getJSON(path){ return fetch(path).then(r => { if(!r.ok) throw new Error("Could not load world data"); return r.json(); }); }
function setText(id, value){ const el = document.getElementById(id); if(el) el.textContent = value; }
function makeButton(label, className = "choice-btn"){
  const button = document.createElement("button");
  button.className = className;
  button.type = "button";
  button.textContent = label;
  return button;
}
