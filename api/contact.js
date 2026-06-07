import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

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

const MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // 1. Save to MongoDB Atlas
    await connectToDatabase();
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // 2. Send Email via Nodemailer
    // NOTE: This will fail locally if EMAIL_USER and EMAIL_PASS are not set correctly.
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_USER !== "your_personal_email@gmail.com") {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to yourself
        replyTo: email,
        subject: `New Portfolio Message from ${name}`,
        text: `You have received a new message from your portfolio!\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      });
    } else {
      console.warn("Skipping Nodemailer: EMAIL_USER or EMAIL_PASS not configured in .env");
    }

    return res.status(200).json({ success: true, message: 'Successfully saved and emailed!' });
  } catch (error) {
    console.error('Backend Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
