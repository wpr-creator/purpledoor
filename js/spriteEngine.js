function makeSprite(pathKey, options = {}) {
  const img = document.createElement('img');
  img.className = `game-sprite ${options.className || ''}`.trim();
  img.src = asset(pathKey);
  img.alt = options.alt || '';
  img.style.left = `${options.x || 0}%`;
  img.style.top = `${options.y || 0}%`;
  img.style.width = options.size || '72px';
  if (options.layer) img.style.zIndex = options.layer;
  return img;
}

function spawnSprite(scene, pathKey, options = {}) {
  const sprite = makeSprite(pathKey, options);
  scene.appendChild(sprite);
  return sprite;
}

function makeNode(options = {}) {
  const node = document.createElement('button');
  node.className = `map-node ${options.locked ? 'is-locked' : ''}`;
  node.style.left = `${options.x || 0}%`;
  node.style.top = `${options.y || 0}%`;
  node.innerHTML = `
    <span class="node-orb">${options.number || ''}</span>
    <span class="node-label">${options.label || 'Mystery Stop'}</span>
  `;
  return node;
}

function spawnNode(scene, options = {}, onClick = () => {}) {
  const node = makeNode(options);
  node.addEventListener('click', onClick);
  scene.appendChild(node);
  return node;
}

function buildScene(scene, layout = []) {
  scene.innerHTML = '';
  layout.forEach(item => {
    if (item.type === 'sprite') spawnSprite(scene, item.asset, item);
    if (item.type === 'node') spawnNode(scene, item, item.onClick);
  });
}
