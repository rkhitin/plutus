import { Context } from 'grammy';
import { User } from '../models/User';
import { Account } from '../models/Account';

export async function newAccountCommand(ctx: Context) {
    try {
        const telegramId = ctx.from?.id.toString();
        
        if (!telegramId) {
            await ctx.reply('Error: Could not identify user');
            return;
        }

        // Get account name from command arguments
        const accountName = ctx.match;
        
        if (!accountName) {
            await ctx.reply('Please provide an account name.\nExample: /new_account Cash');
            return;
        }

        // Check if user exists
        const user = await User.findOne({ telegramId });
        
        if (!user) {
            await ctx.reply('Please start the bot first with /start command');
            return;
        }

        // Check if account with this name already exists
        const existingAccount = await Account.findOne({ 
            userId: telegramId,
            name: accountName 
        });

        if (existingAccount) {
            await ctx.reply(`Account "${accountName}" already exists!`);
            return;
        }

        // Create new account
        const newAccount = new Account({
            name: accountName,
            userId: telegramId,
            balance: 0
        });

        await newAccount.save();
        await ctx.reply(`Account "${accountName}" created successfully! 🎉`);

    } catch (error) {
        console.error('Error in new_account command:', error);
        await ctx.reply('Sorry, something went wrong. Please try again later.');
    }
}