#!/bin/bash
# DuoExtra — First-time Termux setup & GitHub push
# Run this ONCE to initialize and push to GitHub
#
# BEFORE RUNNING: Edit the two variables below:

GITHUB_USERNAME="YOUR_GITHUB_USERNAME"
GITHUB_EMAIL="your-email@example.com"

# ─────────────────────────────────────────────

set -e

echo "🚀 DuoExtra — First-time setup"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Installing git..."
    pkg install git -y
fi

# Configure git
git config --global user.name "$GITHUB_USERNAME"
git config --global user.email "$GITHUB_EMAIL"
echo "✓ Git configured"

# Generate SSH key if it doesn't exist
if [ ! -f ~/.ssh/id_ed25519 ]; then
    echo "Generating SSH key..."
    ssh-keygen -t ed25519 -C "$GITHUB_EMAIL" -f ~/.ssh/id_ed25519 -N ""
    echo ""
    echo "╔══════════════════════════════════════════════════════╗"
    echo "║  IMPORTANT: Copy the SSH key below and add it to    ║"
    echo "║  GitHub → Settings → SSH Keys → New SSH key         ║"
    echo "║  https://github.com/settings/keys                   ║"
    echo "╚══════════════════════════════════════════════════════╝"
    echo ""
    cat ~/.ssh/id_ed25519.pub
    echo ""
    echo "Press Enter AFTER you've added the key to GitHub..."
    read -r
fi

# Test GitHub connection
echo "Testing GitHub connection..."
ssh -T git@github.com 2>&1 || true
echo ""

# Initialize repo
if [ ! -d .git ]; then
    git init
    echo "✓ Git repo initialized"
fi

# Add remote
if ! git remote | grep -q origin; then
    git remote add origin "git@github.com:${GITHUB_USERNAME}/duoextra.git"
    echo "✓ Remote added: git@github.com:${GITHUB_USERNAME}/duoextra.git"
else
    echo "✓ Remote already configured"
fi

# Stage, commit, push
git add .
git commit -m "Initial commit: DuoExtra — German exam prep & language learning platform"
git branch -M main
git push -u origin main

echo ""
echo "═══════════════════════════════════════════════"
echo "  ✅ SUCCESS! Project pushed to GitHub"
echo ""
echo "  Repo: https://github.com/${GITHUB_USERNAME}/duoextra"
echo ""
echo "  Next steps:"
echo "  1. Deploy backend to Render (see DEPLOY.md step 6)"
echo "  2. Deploy frontend to Netlify (see DEPLOY.md step 7)"
echo "═══════════════════════════════════════════════"
