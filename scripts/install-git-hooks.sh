#!/usr/bin/env sh
#
# Installs a pre-push hook that refuses direct pushes to main and develop.
#
# GitHub branch protection needs a paid plan on private repos, so this is a
# local stand-in. It only protects the machine it is installed on — every
# contributor should run it once:
#
#   sh scripts/install-git-hooks.sh
#
set -e

HOOK_DIR="$(git rev-parse --git-dir)/hooks"
mkdir -p "$HOOK_DIR"

cat > "$HOOK_DIR/pre-push" <<'HOOK'
#!/usr/bin/env sh
# Refuse direct pushes to the long-lived branches. Use a pull request instead.
PROTECTED="main develop"

while read -r _local_ref _local_sha remote_ref _remote_sha; do
  branch="${remote_ref#refs/heads/}"
  for protected in $PROTECTED; do
    if [ "$branch" = "$protected" ]; then
      echo ""
      echo "  ✋ Direct push to '$protected' is blocked."
      echo ""
      echo "     This project follows GitFlow: open a pull request instead."
      echo "       git switch -c feature/my-change"
      echo "       git push -u origin feature/my-change"
      echo ""
      echo "     To override in an emergency: git push --no-verify"
      echo ""
      exit 1
    fi
  done
done

exit 0
HOOK

chmod +x "$HOOK_DIR/pre-push"
echo "✅ pre-push hook installed — direct pushes to main and develop are now blocked locally."
