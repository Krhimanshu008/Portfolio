import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

const IdeaSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  status: { type: String, default: 'Planning' },
  date: { type: Date, default: Date.now }
});

const Idea = mongoose.models.Idea || mongoose.model('Idea', IdeaSchema);

export default async function handler(req, res) {
  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const ideas = await Idea.find().sort({ date: -1 });
      return res.status(200).json({ success: true, data: ideas });
    } 
    else if (req.method === 'POST') {
      const { title, description, tags, status } = req.body;

      if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
      }

      const newIdea = new Idea({ title, description, tags, status });
      await newIdea.save();

      return res.status(201).json({ success: true, data: newIdea });
    } 
    else {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Backend Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
