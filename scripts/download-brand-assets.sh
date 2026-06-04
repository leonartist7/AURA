#!/usr/bin/env bash
# Downloads the Magnific-generated & upscaled brand photos and commits them.
# Run from the repo root on any machine with outbound internet access.
# Usage: bash scripts/download-brand-assets.sh

set -euo pipefail

mkdir -p public/assets/brand public/assets/testimonials

declare -A URLS=(
  ["public/assets/brand/hero-scene.jpg"]="https://pikaso.cdnpk.net/private/production/4495871939/enhanced-optimized.jpg?token=exp=1780963200~hmac=d4dbbcbf1551392aec146fbd08e1676af2f54d84ccd8f7cb321d4c2fbe526a50"
  ["public/assets/brand/cozy-night.jpg"]="https://pikaso.cdnpk.net/private/production/4495873150/enhanced-optimized.jpg?token=exp=1780963200~hmac=be678629abac0fd01534c7ec790573cd52a24d314728404bc9b8614835d9d673"
  ["public/assets/brand/cafe-band.jpg"]="https://pikaso.cdnpk.net/private/production/4495876414/enhanced-optimized.jpg?token=exp=1780963200~hmac=8623cc8307ba4f4d41c1eeeca0278c4325042e218a17fc3147c80ebda699771a"
  ["public/assets/brand/card-ordering.jpg"]="https://pikaso.cdnpk.net/private/production/4495874604/enhanced-optimized.jpg?token=exp=1780963200~hmac=4415a8fb8c1db41aacbc73db0d2250b666325cc294ae8ba400aaf74e8bad13da"
  ["public/assets/brand/card-regulars.jpg"]="https://pikaso.cdnpk.net/private/production/4495874946/enhanced-optimized.jpg?token=exp=1780963200~hmac=1f7ce25ca9f5cce7420ee3d919988aee21128cbddaefad680e28a3bdc200a6d7"
  ["public/assets/brand/card-social.jpg"]="https://pikaso.cdnpk.net/private/production/4495874583/enhanced-optimized.jpg?token=exp=1780963200~hmac=3d3540bd3cf7f310c6a4d95fc8297cec8b382134840d5c0bf4d8704d3c272808"
  ["public/assets/testimonials/elena-moretti.jpg"]="https://pikaso.cdnpk.net/private/production/4495872862/enhanced-optimized.jpg?token=exp=1780963200~hmac=6973ed2735975d22f4fb171e48faa8c78b50f18e1bfdf3bbef315dd0f51ef2da"
  ["public/assets/testimonials/david-okonkwo.jpg"]="https://pikaso.cdnpk.net/private/production/4495870928/enhanced-optimized.jpg?token=exp=1780963200~hmac=72222a56ab75b20cf294e5b1e7fe0ce20f2b0844f968612d2359258e0fd40e74"
  ["public/assets/testimonials/mei-tanaka.jpg"]="https://pikaso.cdnpk.net/private/production/4495870969/enhanced-optimized.jpg?token=exp=1780963200~hmac=b74b7013e7afc801f70d4215dd01bf74ca1dbd43bad1472e9ee22926d7693df8"
)

echo "Downloading 9 brand assets..."
for path in "${!URLS[@]}"; do
  url="${URLS[$path]}"
  echo "  → $path"
  curl -fsSL "$url" -o "$path"
  size=$(wc -c < "$path")
  echo "    ✓ ${size} bytes"
done

echo ""
echo "Committing to branch claude/vibrant-mayer-kDu4O ..."
git checkout claude/vibrant-mayer-kDu4O 2>/dev/null || git checkout -b claude/vibrant-mayer-kDu4O
git add public/assets/brand/ public/assets/testimonials/
git commit -m "feat: add Magnific-generated & 4K-upscaled brand photos

Generated with Google Nano Banana 2 (imagen-nano-banana-2-flash):
- Brand/landscape images: 2K → 4K upscale, warm analog film grain
- Testimonial portraits: 1K → 2048×2048 upscale, soft natural light

Paths added:
  public/assets/brand/{hero-scene,cozy-night,cafe-band,card-ordering,card-regulars,card-social}.jpg
  public/assets/testimonials/{elena-moretti,david-okonkwo,mei-tanaka}.jpg"
git push -u origin claude/vibrant-mayer-kDu4O
echo "Done."
