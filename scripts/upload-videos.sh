#!/bin/sh
#
# Uploads every file in videos/ to the R2 bucket that worker/index.ts serves
# them from, e.g. videos/rush-hour.mp4 becomes /videos/rush-hour.mp4.
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

  pnpm exec wrangler r2 object put "$BUCKET/$file" \
    --file "$file" \
    --content-type "$content_type" \
    "$target"
done
