import { Context } from 'grammy';
import { User } from '../models/User';

export async function startCommand(ctx: Context) {
    try {
        const telegramId = ctx.from?.id.toString();
        
        if (!telegramId) {
            await ctx.reply('Error: Could not identify user');
            return;
        }

        // Check if user exists
        const existingUser = await User.findOne({ telegramId });

        if (!existingUser) {
            // Create new user
            const newUser = new User({ telegramId });
            await newUser.save();
            await ctx.reply('Welcome to Plutus Finance Bot! 🎉');
        } else {
            await ctx.reply('Welcome back to Plutus Finance Bot! 🎉');
        }
    } catch (error) {
        console.error('Error in start command:', error);
        await ctx.reply('Sorry, something went wrong. Please try again later.');
    }
}