import 'dotenv/config';
import { Bot } from 'grammy';

// Get the bot token from environment variables
const botToken = process.env.TELEGRAM_BOT_TOKEN;
if (!botToken) {
    throw new Error('TELEGRAM_BOT_TOKEN is not defined in environment variables');
}

// Create a bot instance
const bot = new Bot(botToken);

// Handle any message
bot.on('message', async (ctx) => {
    await ctx.reply('Hello!');
});

// Start the bot
bot.start();

// Log that the bot is running
console.log('Bot is running...');