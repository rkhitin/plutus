import { Bot } from 'grammy';
import { startCommand } from './commands/start';
import { newAccountCommand } from './commands/newAccount';
import { StateMachine } from './state';

const botToken = process.env.TELEGRAM_BOT_TOKEN;

if (!botToken) {
    throw new Error('TELEGRAM_BOT_TOKEN is not defined in environment variables');
}

export const bot = new Bot(botToken);

// Register commands
bot.command('start', startCommand);

// Handle all messages based on state
bot.on('message', async (ctx) => {
    const userId = ctx.from?.id.toString();
    
    if (!userId) {
        await ctx.reply('Error: Could not identify user');
        return;
    }

    try {
        // Get current state
        const { state } = await StateMachine.getCurrentState(userId);

        // Route message based on state
        switch (state) {
            case 'new_account':
                await newAccountCommand(ctx);
                break;
            case 'idle':
            default:
                break;
        }
    } catch (error) {
        console.error('Error in message handling:', error);
        await ctx.reply('Sorry, something went wrong. Please try again later.');
    }
});

export function startBot() {
    bot.start();
    console.log('Bot is running...');
}