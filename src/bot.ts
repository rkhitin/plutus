import { Bot } from 'grammy';
import { startCommand } from './commands/start';
import { newAccountCommand } from './commands/newAccount';

const botToken = process.env.TELEGRAM_BOT_TOKEN;

if (!botToken) {
    throw new Error('TELEGRAM_BOT_TOKEN is not defined in environment variables');
}

export const bot = new Bot(botToken);

// Register commands
bot.command('start', startCommand);
bot.command('new_account', newAccountCommand);

// Handle other messages
bot.on('message', async (ctx) => {
    await ctx.reply('Hello!');
});

export function startBot() {
    bot.start();
    console.log('Bot is running...');
}