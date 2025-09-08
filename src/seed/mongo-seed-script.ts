import { connect, model } from 'mongoose';
import { Research, ResearchSchema } from '../documnet/entity/docs.entity'; // ✅ Correct path to your schema
import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_STRING_CNNECTION as string; // ✅ Load from .env

async function seedResearch() {
  try {
    await connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const ResearchModel = model<Research>('Research', ResearchSchema);

    await ResearchModel.insertMany([
      {
        projectId: 1,
        title: 'AI-Powered Recommendation System',
        content:
          'Exploring the development of AI-powered recommendation engines for personalized shopping experiences.',
        tags: ['AI', 'Machine Learning', 'Recommendation'],
      },
      {
        projectId: 2,
        title: 'E-commerce Analytics 2025',
        content:
          'Deep dive into e-commerce data analytics for boosting conversion rates and improving ROI.',
        tags: ['E-commerce', 'Analytics', 'Data Science'],
      },
    ]);

    console.log('Research documents seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seedResearch();
