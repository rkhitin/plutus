import 'dotenv/config';
import { connectToDatabase, disconnectFromDatabase } from './database';
import { startBot } from './bot';

async function initialize() {
    await connectToDatabase();
    startBot();
}

// Handle process termination
process.on('SIGTERM', async () => {
    await disconnectFromDatabase();
    process.exit(0);
});

// Start the application
initialize();