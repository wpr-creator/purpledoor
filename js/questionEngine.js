const QuestionEngine = (() => {
  function shuffle(items){
    const a = [...items];
    for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
    return a;
  }
  function uniqueChoices(choices){
    const seen = new Set();
    return choices.filter(choice => { const key = String(choice.label ?? choice).trim().toLowerCase(); if(seen.has(key)) return false; seen.add(key); return true; });
  }
  function prepare(item){
    const choices = shuffle(uniqueChoices(item.choices));
    return { ...item, choices };
  }
  function pick(bank, filters = {}){
    let pool = bank.filter(item => Object.entries(filters).every(([k,v]) => item[k] === v));
    if(!pool.length) pool = [...bank];
    return prepare(pool[Math.floor(Math.random()*pool.length)]);
  }
  function isCorrect(item, answer){ return String(answer) === String(item.answer); }
  return { pick, isCorrect, shuffle };
})();
