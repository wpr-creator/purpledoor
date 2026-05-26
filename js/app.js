const PD_KEY = "purpledoor_player_v2";

const titles = [
  "THE GREAT",
  "THE VERBIST",
  "THE RUNEKEEPER",
  "THE COMMA CRUSHER",
  "THE PORTAL WALKER",
  "THE STORY SEEKER",
  "THE CHAOS SCRIBE",
  "THE WORD WIZARD",
  "THE GLOWFORGED",
  "THE VERY LOUD",
  "THE SLIME WHISPERER",
  "THE PAGE KNIGHT",
  "THE STAR READER",
  "THE SENTENCE SMITH"
];

const familiars = [
  {
    name: "LANTERN BAT",
    src: "assets/kenney/2D assets/Monster Builder Pack/PNG/Default/body_blueA.png"
  },
  {
    name: "RUNE BLOB",
    src: "assets/kenney/2D assets/Monster Builder Pack/PNG/Default/body_greenA.png"
  },
  {
    name: "PAPER GOBLIN",
    src: "assets/kenney/2D assets/Monster Builder Pack/PNG/Default/body_whiteA.png"
  },
  {
    name: "CHAOS CUBE",
    src: "assets/kenney/2D assets/Shape Characters/PNG/Default/character_squareBlue.png"
  }
];

function $(id){ return document.getElementById(id); }

function showScreen(id){
  document.querySelectorAll(".screen").forEach(screen => screen.classList.remove("active"));
  const screen = $(id);
  if(screen) screen.classList.add("active");
}

function cleanName(value){
  return String(value || "")
    .trim()
    .replace(/[^a-zA-Z\-'\s]/g, "")
    .replace(/\s+/g, " ")
    .slice(0, 14);
}

function pickFrom(list, seedText){
  let seed = 0;
  for(const ch of seedText){ seed = (seed + ch.charCodeAt(0) * 17) % 9973; }
  return list[seed % list.length];
}

function savePlayer(player){
  localStorage.setItem(PD_KEY, JSON.stringify(player));
}

function getPlayer(){
  try { return JSON.parse(localStorage.getItem(PD_KEY)); }
  catch { return null; }
}

function createPlayer(name){
  const upperName = cleanName(name).toUpperCase();
  const title = pickFrom(titles, upperName);
  const familiar = pickFrom(familiars, upperName + title);
  const player = {
    name: upperName,
    title,
    familiar,
    portalsOpened: 0,
    legends: [title],
    createdAt: Date.now()
  };
  savePlayer(player);
  return player;
}

function updateHub(player){
  if(!player) return;
  $("playerStatus").textContent = `${player.name} ${player.title} HAS ENTERED THE CHAMBER.`;
  $("hudTitle").textContent = player.title;
  $("hudFamiliar").textContent = player.familiar?.name || "UNKNOWN";
}

function revealPlayer(player){
  $("revealName").textContent = player.name;
  $("revealTitle").textContent = player.title;
  if(player.familiar?.src) $("revealFamiliar").src = player.familiar.src;
  $("familiarText").textContent = `${player.familiar?.name || "A STRANGE ALLY"} HAS JOINED YOU.`;
  showScreen("revealScreen");
}

function enterHub(){
  const player = getPlayer();
  updateHub(player);
  showScreen("hubScreen");
}

document.addEventListener("DOMContentLoaded", () => {
  const existing = getPlayer();
  if(existing?.name){
    updateHub(existing);
    showScreen("hubScreen");
  } else {
    showScreen("introScreen");
  }

  $("nameForm")?.addEventListener("submit", event => {
    event.preventDefault();
    const name = cleanName($("playerName").value);
    if(!name){
      $("playerName").focus();
      return;
    }
    const player = createPlayer(name);
    revealPlayer(player);
  });

  $("enterHubBtn")?.addEventListener("click", enterHub);

  $("skipIntroBtn")?.addEventListener("click", () => {
    const existing = getPlayer();
    if(existing?.name) enterHub();
    else $("playerName").focus();
  });

  $("resetProfileBtn")?.addEventListener("click", () => {
    localStorage.removeItem(PD_KEY);
    $("playerName").value = "";
    showScreen("introScreen");
  });
});