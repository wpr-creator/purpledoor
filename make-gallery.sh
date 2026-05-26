#!/bin/bash

make_gallery () {
  PACK="$1"
  OUT="$2"

  find "$PACK" -type f \( -name "*.png" -o -name "*.svg" \) \
    | grep -v "Preview.png" \
    | grep -v "Sample.png" \
    | head -300 \
    | awk '{print "\"" $0 "\","}' > /tmp/gallery_assets.txt

  cat > "$OUT.html" <<HTML
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>$OUT</title>
<style>
body{font-family:Arial,sans-serif;background:#171124;color:white;padding:24px}
h1{font-size:36px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:18px}
.card{background:#261b3a;border:1px solid #4c3c66;border-radius:14px;padding:12px}
img{width:100%;height:130px;object-fit:contain;background:#0e0a17;border-radius:10px}
code{font-size:11px;word-break:break-all;color:#d7c8ff}
</style>
</head>
<body>
<h1>$OUT</h1>
<div class="grid" id="grid"></div>
<script>
const assets=[
HTML

  cat /tmp/gallery_assets.txt >> "$OUT.html"

  cat >> "$OUT.html" <<'HTML'
];
const grid=document.getElementById("grid");
assets.forEach(src=>{
 const card=document.createElement("div");
 card.className="card";
 card.innerHTML=`<img src="${src}" alt=""><code>${src}</code>`;
 grid.appendChild(card);
});
</script>
</body>
</html>
HTML
}

make_gallery "assets/kenney/2D assets/Isometric Miniature Overworld" "gallery-overworld"
make_gallery "assets/kenney/2D assets/Isometric Miniature Library" "gallery-library"
make_gallery "assets/kenney/2D assets/Isometric Nature" "gallery-nature"
make_gallery "assets/kenney/2D assets/Tiny Town" "gallery-tinytown"
make_gallery "assets/kenney/2D assets/Planets" "gallery-planets"
make_gallery "assets/kenney/2D assets/Shape Characters" "gallery-shapes"
make_gallery "assets/kenney/2D assets/Monster Builder Pack" "gallery-monsters"
make_gallery "assets/kenney/2D assets/Background Elements Remastered" "gallery-backgrounds"
