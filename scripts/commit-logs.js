#!/usr/bin/env node

/**
 * Automatic Log Committer
 * This script commits and pushes logs to GitHub automatically
 * Can be run manually, via cron, or as part of a deployment workflow
 */

const fs = require('fs');
const path = require('path');
const simpleGit = require('simple-git');

const git = simpleGit();
const logsDir = path.join(process.cwd(), 'logs');
const log = (message = '') => {
    process.stdout.write(`${message}\n`);
};

async function commitLogs() {
    try {
        log('🔍 Checking for log files...');

        // Ensure logs directory exists
        if (!fs.existsSync(logsDir)) {
            log('⚠️  No logs directory found. Creating it...');
            fs.mkdirSync(logsDir, { recursive: true });
            return;
        }

        // Check if there are any log files
        const logFiles = fs.readdirSync(logsDir).filter(f => f.endsWith('.log'));
        if (logFiles.length === 0) {
            log('ℹ️  No log files to commit.');
            return;
        }

        log(`📝 Found ${logFiles.length} log file(s)`);

        // Check git status
        const status = await git.status();

        // Add all log files
        await git.add('logs/*.log');

        // Check if there are changes to commit
        const statusAfterAdd = await git.status();
        if (statusAfterAdd.files.length === 0) {
            log('✅ Logs are already up to date.');
            return;
        }

        // Create commit message with timestamp
        const timestamp = new Date().toISOString();
        const commitMessage = `chore: update logs [${timestamp}]`;

        // Commit the logs
        await git.commit(commitMessage);
        log('✅ Logs committed successfully');

        // Push to remote
        log('🚀 Pushing logs to GitHub...');
        await git.push();
        log('✅ Logs pushed to GitHub successfully!');

        // Show summary
        log('\n📊 Summary:');
        log(`   Files committed: ${statusAfterAdd.files.length}`);
        log(`   Commit message: ${commitMessage}`);
        log(`   Branch: ${status.current}`);

    } catch (error) {
        console.error('❌ Error committing logs:', error.message);

        // If push fails due to no remote, explain
        if (error.message.includes('No remote')) {
            log('\n💡 Tip: Make sure your git remote is set up:');
            log('   git remote add origin <your-repo-url>');
        }

        // If push fails due to authentication
        if (error.message.includes('Authentication') || error.message.includes('permission')) {
            log('\n💡 Tip: Make sure you have push access to the repository');
            log('   You may need to set up SSH keys or use a personal access token');
        }

        process.exit(1);
    }
}

// Run the function
commitLogs();
