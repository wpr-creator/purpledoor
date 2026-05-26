const AssetRegistry = {
  ui: {
    panelBlue: '../assets/kenney/ui/UI Adventure Pack/PNG/panel_blue.png',
    panelBeige: '../assets/kenney/ui/UI Adventure Pack/PNG/panel_beigeLight.png',
    panelBrown: '../assets/kenney/ui/UI Adventure Pack/PNG/panel_brown.png',
    buttonBlue: '../assets/kenney/ui/UI Adventure Pack/PNG/buttonLong_blue.png',
    buttonBeige: '../assets/kenney/ui/UI Adventure Pack/PNG/buttonLong_beige.png',
    buttonBrown: '../assets/kenney/ui/UI Adventure Pack/PNG/buttonLong_brown.png',
    arrowRight: '../assets/kenney/ui/UI Adventure Pack/PNG/arrowBlue_right.png'
  },
  rewards: {
    jewelYellow: '../assets/kenney/ui/UI Pack - Adventure/PNG/Default/minimap_icon_jewel_yellow.png',
    jewelRed: '../assets/kenney/ui/UI Pack - Adventure/PNG/Default/minimap_icon_jewel_red.png',
    starYellow: '../assets/kenney/ui/UI Pack/PNG/Yellow/Default/star.png'
  },
  map: {
    treeTall: '../assets/kenney/tiles/Cartography Pack/PNG/Retina/treeTall.png',
    treePinesSmall: '../assets/kenney/tiles/Cartography Pack/PNG/Retina/treePinesSmall.png',
    flag: '../assets/kenney/tiles/Cartography Pack/PNG/Retina/flag.png',
    campfire: '../assets/kenney/tiles/Cartography Pack/PNG/Retina/campfire.png',
    bridge: '../assets/kenney/tiles/Cartography Pack/PNG/Retina/bridgeRope.png',
    lake: '../assets/kenney/tiles/Cartography Pack/PNG/Retina/lakeRound.png',
    houses: '../assets/kenney/tiles/Cartography Pack/PNG/Retina/houses.png',
    castle: '../assets/kenney/tiles/Cartography Pack/PNG/Retina/castle.png',
    pathCorner: '../assets/kenney/tiles/Cartography Pack/PNG/Retina/pathCorner.png',
    arrowSmall: '../assets/kenney/tiles/Cartography Pack/PNG/Retina/arrowSmall.png'
  }
};

function asset(pathKey) {
  return pathKey.split('.').reduce((obj, key) => obj && obj[key], AssetRegistry);
}
