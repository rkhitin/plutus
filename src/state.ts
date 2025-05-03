import { redisClient } from './redis';

// Define possible states
export type BotState = 'idle' | 'new_account';

// State machine class
export class StateMachine {
    private static getStateKey(userId: string) {
        return `user:${userId}:state`;
    }

    // Get current state with optional data
    static async getCurrentState<T = void>(userId: string): Promise<{ state: BotState; data?: T }> {
        const state = await redisClient.get(StateMachine.getStateKey(userId));
        const currentState = (state as BotState) || 'idle';
        
        try {
            const data = await StateMachine.getStateData<T>(userId);
            return { state: currentState, ...(data && { data }) };
        } catch {
            return { state: currentState };
        }
    }

    // Set new state with optional data
    static async setState<T = void>(userId: string, newState: BotState, data?: T): Promise<void> {
        await redisClient.set(StateMachine.getStateKey(userId), newState);
        if (data !== undefined) {
            await StateMachine.setStateData(userId, 'data', data);
        }
    }

    // Reset state to IDLE
    static async resetState(userId: string): Promise<void> {
        await redisClient.set(StateMachine.getStateKey(userId), 'idle');
        await StateMachine.clearStateData(userId);
    }

    // Get state data
    private static async getStateData<T>(userId: string): Promise<T | null> {
        const data = await redisClient.get(`${StateMachine.getStateKey(userId)}:data`);
        return data ? JSON.parse(data) : null;
    }

    // Set state data
    private static async setStateData<T>(userId: string, key: string, data: T): Promise<void> {
        await redisClient.set(`${StateMachine.getStateKey(userId)}:${key}`, JSON.stringify(data));
    }

    // Clear state data
    private static async clearStateData(userId: string): Promise<void> {
        await redisClient.del(`${StateMachine.getStateKey(userId)}:data`);
    }
}