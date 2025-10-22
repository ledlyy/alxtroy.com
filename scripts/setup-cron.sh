#!/bin/bash

##############################################
# Automatic Log Commit Setup Script
# Sets up cron jobs to automatically commit logs to GitHub
##############################################

echo "🚀 Setting up automatic log commits..."

# Get the current directory (project root)
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SCRIPT_PATH="$PROJECT_DIR/scripts/commit-logs.js"

# Check if node is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Make the commit script executable
chmod +x "$SCRIPT_PATH"

echo "📋 Choose how often you want to commit logs:"
echo "  1) Every hour (recommended for production)"
echo "  2) Every 6 hours"
echo "  3) Every 12 hours"
echo "  4) Once daily at midnight"
echo "  5) Custom cron expression"
read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        CRON_SCHEDULE="0 * * * *"  # Every hour
        DESCRIPTION="every hour"
        ;;
    2)
        CRON_SCHEDULE="0 */6 * * *"  # Every 6 hours
        DESCRIPTION="every 6 hours"
        ;;
    3)
        CRON_SCHEDULE="0 */12 * * *"  # Every 12 hours
        DESCRIPTION="every 12 hours"
        ;;
    4)
        CRON_SCHEDULE="0 0 * * *"  # Daily at midnight
        DESCRIPTION="daily at midnight"
        ;;
    5)
        read -p "Enter custom cron expression: " CRON_SCHEDULE
        DESCRIPTION="custom schedule"
        ;;
    *)
        echo "❌ Invalid choice. Exiting."
        exit 1
        ;;
esac

# Create cron job entry
CRON_JOB="$CRON_SCHEDULE cd $PROJECT_DIR && /usr/bin/node $SCRIPT_PATH >> $PROJECT_DIR/logs/cron.log 2>&1"

# Check if cron job already exists
if crontab -l 2>/dev/null | grep -q "commit-logs.js"; then
    echo "⚠️  A cron job for log commits already exists."
    read -p "Do you want to replace it? (y/n): " replace
    if [[ $replace != "y" ]]; then
        echo "❌ Setup cancelled."
        exit 0
    fi
    # Remove old cron job
    crontab -l 2>/dev/null | grep -v "commit-logs.js" | crontab -
fi

# Add new cron job
(crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

echo "✅ Cron job installed successfully!"
echo "📅 Logs will be committed $DESCRIPTION"
echo ""
echo "📝 To view your cron jobs: crontab -l"
echo "🗑️  To remove this cron job: crontab -e (then delete the line with 'commit-logs.js')"
echo ""
echo "💡 Testing the script now..."
node "$SCRIPT_PATH"

echo ""
echo "✨ Setup complete! Your logs will now be automatically committed to GitHub."
