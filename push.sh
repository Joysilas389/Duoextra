#!/bin/bash
# DuoExtra — Quick push from Termux
# Usage: bash push.sh "your commit message"

set -e

MSG="${1:-update: minor changes}"

echo "📦 DuoExtra — Pushing to GitHub..."
echo ""

git add .
echo "✓ Files staged"

git status --short
echo ""

git commit -m "$MSG"
echo "✓ Committed: $MSG"

git push origin main
echo ""
echo "✅ Pushed to GitHub!"
echo "   Netlify and Render will auto-deploy."
echo ""
echo "🌐 Frontend: https://duoextra.netlify.app"
echo "🔧 Backend:  https://duoextra-api.onrender.com/api/docs"
