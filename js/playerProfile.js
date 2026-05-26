const PROFILE_KEY = "purpledoor_profile_v1";

const starterTitles = [
  { title: "THE GREAT", rarity: "SPARK TITLE" },
  { title: "THE VERBIST", rarity: "WORD TITLE" },
  { title: "THE RUNEKEEPER", rarity: "MAGIC TITLE" },
  { title: "THE COMMA CRUSHER", rarity: "CHAOS TITLE" },
  { title: "THE PORTAL SCOUT", rarity: "FIRST DOOR TITLE" },
  { title: "THE BOOKSTORM", rarity: "RARE TITLE" },
  { title: "THE VERY LOUD", rarity: "ODD TITLE" },
  { title: "THE STAR READER", rarity: "SKY TITLE" },
  { title: "THE SLIME WHISPERER", rarity: "FAMILIAR TITLE" },
  { title: "THE SENTENCE SMITH", rarity: "FORGED TITLE" },
  { title: "THE CHAOS GOBLIN", rarity: "SECRETLY NORMAL TITLE" },
  { title: "THE GLOWFORGED", rarity: "GLIMMER TITLE" }
];

const familiarPool = [
  "CANDLE SLIME",
  "RUNE OWL",
  "PAPER DRAGON",
  "LANTERN BAT",
  "SLEEPY ORB",
  "BOOK GOBLIN"
];

function cleanName(value) {
  return value
    .replace(/[^a-zA-Z\-']/g, "")
    .trim()
    .slice(0, 14);
}

function titleIndexFor(name) {
  let total = 0;
  for (const char of name.toUpperCase()) total += char.charCodeAt(0);
  return total % starterTitles.length;
}

function buildProfile(firstName) {
  const titleData = starterTitles[titleIndexFor(firstName)];
  const familiar = familiarPool[(titleIndexFor(firstName) + firstName.length) % familiarPool.length];

  return {
    firstName,
    title: titleData.title,
    rarity: titleData.rarity,
    familiar,
    portalsOpened: 0,
    titlesUnlocked: [titleData.title],
    alliesDiscovered: [familiar],
    createdAt: new Date().toISOString()
  };
}

function saveProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function loadProfile() {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_KEY));
  } catch {
    return null;
  }
}

function updateHomeStatus(profile) {
  if (!profile) return;

  const legendStatus = document.getElementById("legendStatus");
  const allyStatus = document.getElementById("allyStatus");
  const portalStatusText = document.getElementById("portalStatusText");

  if (legendStatus) legendStatus.textContent = `${profile.firstName.toUpperCase()} ${profile.title}`;
  if (allyStatus) allyStatus.textContent = profile.familiar;
  if (portalStatusText) portalStatusText.textContent = `${profile.portalsOpened || 0} / 3`;
}

function hideGate() {
  const gate = document.getElementById("nameGate");
  if (!gate) return;
  gate.classList.add("gate-closed");
  setTimeout(() => gate.remove(), 520);
}

function initNameGate() {
  const existing = loadProfile();
  updateHomeStatus(existing);

  if (existing) {
    hideGate();
    return;
  }

  const gate = document.getElementById("nameGate");
  const form = document.getElementById("nameForm");
  const input = document.getElementById("playerName");
  const nameCard = document.getElementById("nameCard");
  const reveal = document.getElementById("titleReveal");
  const revealName = document.getElementById("revealName");
  const revealLine = document.getElementById("revealLine");
  const enterButton = document.getElementById("enterUniverse");

  if (!gate || !form || !input) return;

  setTimeout(() => input.focus(), 400);

  form.addEventListener("submit", event => {
    event.preventDefault();
    const firstName = cleanName(input.value);
    if (!firstName) {
      input.value = "";
      input.placeholder = "TRY AGAIN";
      input.focus();
      return;
    }

    const profile = buildProfile(firstName);
    saveProfile(profile);
    updateHomeStatus(profile);

    revealName.textContent = `${profile.firstName.toUpperCase()} ${profile.title}`;
    revealLine.textContent = `${profile.rarity} • ${profile.familiar} HAS APPEARED`;

    nameCard.classList.add("hidden");
    reveal.classList.remove("hidden");
    gate.classList.add("reveal-mode");
  });

  enterButton?.addEventListener("click", hideGate);
}

initNameGate();
