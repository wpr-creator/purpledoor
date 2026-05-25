const Save = (() => {
  const KEY = "purpleDoorUniverseSave";
  const starter = { gems: 6, keys: 0, stickers: [], companions: [], decorations: [], portalNode: 0 };
  function load(){
    try { return { ...starter, ...(JSON.parse(localStorage.getItem(KEY)) || {}) }; }
    catch { return { ...starter }; }
  }
  function write(next){ localStorage.setItem(KEY, JSON.stringify(next)); return next; }
  function update(patch){ return write({ ...load(), ...patch }); }
  function reset(){ localStorage.removeItem(KEY); return load(); }
  return { load, write, update, reset };
})();
