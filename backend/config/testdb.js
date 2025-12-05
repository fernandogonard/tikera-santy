import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

export const connectTestDB = async () => {
  try {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    
    console.log('🚀 MongoDB Memory Server started');
    console.log(`📍 URI: ${uri}`);
    
    return uri;
  } catch (error) {
    console.error('❌ Error starting MongoDB Memory Server:', error);
    throw error;
  }
};

export const disconnectTestDB = async () => {
  if (mongoServer) {
    await mongoServer.stop();
    console.log('🛑 MongoDB Memory Server stopped');
  }
};
