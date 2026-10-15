#!/bin/sh
#
# johan.li/uncharted-waters-2 is served from the build output of
# https://github.com/JohanLi/uncharted-waters-2. This clones (or updates) and
# builds it, then copies the output into dist/ — run it after `astro build`.
#
# Requires git-lfs, as the game's assets are stored using Git LFS.

set -eu

REPOSITORY=https://github.com/JohanLi/uncharted-waters-2
CACHE_DIRECTORY=.cache/uncharted-waters-2
OUTPUT_DIRECTORY=dist/uncharted-waters-2

if [ ! -d dist ]; then
  echo "dist/ doesn't exist. Run astro build first." >&2
  exit 1
fi

if [ -d "$CACHE_DIRECTORY/.git" ]; then
  git -C "$CACHE_DIRECTORY" fetch --quiet --depth 1 origin HEAD
  git -C "$CACHE_DIRECTORY" reset --quiet --hard FETCH_HEAD
else
  git clone --quiet --depth 1 "$REPOSITORY" "$CACHE_DIRECTORY"
fi

git -C "$CACHE_DIRECTORY" lfs pull

commit=$(git -C "$CACHE_DIRECTORY" rev-parse HEAD)

# skip rebuilding if the previous build was of the same commit
if [ "$(cat "$CACHE_DIRECTORY/build/.commit" 2>/dev/null)" != "$commit" ]; then
  (
    cd "$CACHE_DIRECTORY"
    pnpm install --frozen-lockfile
    PUBLIC_PATH=/uncharted-waters-2/ pnpm build
  )
  echo "$commit" > "$CACHE_DIRECTORY/build/.commit"
fi

rm -rf "$OUTPUT_DIRECTORY"
cp -R "$CACHE_DIRECTORY/build" "$OUTPUT_DIRECTORY"
rm "$OUTPUT_DIRECTORY/.commit"

echo "Uncharted Waters 2 ($commit) copied to $OUTPUT_DIRECTORY"
