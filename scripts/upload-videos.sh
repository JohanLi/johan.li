#!/bin/sh
#
# Uploads every file in videos/ to the R2 bucket that worker/index.ts serves
# them from, with a hash of its contents in its name, e.g. videos/rush-hour.mp4
# becomes /videos/rush-hour.1a2b3c4d.mp4. The hash has to be computed the same
# way as in src/components/video/getVideoUrl.ts.
#
# --local uploads to the local bucket used by `wrangler dev` (and the
# end-to-end tests). --remote uploads to the actual bucket, which has to be
# created once using `wrangler r2 bucket create johan-li`.

set -eu

BUCKET=johan-li

case "${1:-}" in
  --local | --remote) target=$1 ;;
  *)
    echo "Usage: $0 --local | --remote" >&2
    exit 1
    ;;
esac

for file in videos/*; do
  case "$file" in
    *.mp4) content_type=video/mp4 ;;
    *.webm) content_type=video/webm ;;
    *)
      echo "Unknown video type: $file" >&2
      exit 1
      ;;
  esac

  hash=$(shasum -a 256 "$file" | cut -c 1-8)
  # the hash goes before the first dot, e.g.
  # uncharted-waters-new-horizons.1a2b3c4d.av1.mp4
  base=$(basename "$file")
  key="videos/${base%%.*}.$hash.${base#*.}"

  pnpm exec wrangler r2 object put "$BUCKET/$key" \
    --file "$file" \
    --content-type "$content_type" \
    "$target"
done
