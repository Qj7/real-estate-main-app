#!/usr/bin/env node
/**
 * Configures the Telegram bot's menu button to open the Mini App.
 * Run after setting MINI_APP_URL and TELEGRAM_BOT_TOKEN in .env
 *
 * Usage: node scripts/setup-telegram-miniapp.js
 * Or:    npm run setup:miniapp
 */

const fs = require('fs');
const path = require('path');

// Load .env from project root
const envPath = path.resolve(__dirname, '../.env');
if (!fs.existsSync(envPath)) {
  console.error('❌ .env file not found. Create .env with MINI_APP_URL and TELEGRAM_BOT_TOKEN');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
for (const line of envContent.split('\n')) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim();
  }
}

const token = env.TELEGRAM_BOT_TOKEN;
const url = env.MINI_APP_URL;

if (!token || !url) {
  console.error('❌ Set MINI_APP_URL and TELEGRAM_BOT_TOKEN in .env');
  console.error('   MINI_APP_URL - URL of your Mini App (e.g. https://your-app.com)');
  console.error('   TELEGRAM_BOT_TOKEN - Bot token from @BotFather');
  process.exit(1);
}

const menuText = env.TELEGRAM_MENU_TEXT || 'Открыть приложение';

async function main() {
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/setChatMenuButton`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          menu_button: {
            type: 'web_app',
            text: menuText,
            web_app: { url },
          },
        }),
      }
    );
    const json = await res.json();

    if (json.ok) {
      console.log('✅ Telegram Mini App menu button configured successfully');
      console.log(`   URL: ${url}`);
      console.log(`   Button text: ${menuText}`);
    } else {
      console.error('❌ Telegram API error:', json.description || json);
      process.exit(1);
    }
  } catch (err) {
    console.error('❌ Failed to configure:', err.message);
    process.exit(1);
  }
}

main();
