import 'dotenv/config'
import mongoose from 'mongoose'
import app from './src/app.js'
import cors from "cors";

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

const corsOptions = {
  origin: "https://client-umber-eta.vercel.app/", 
  methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true, 
};

app.use(cors(corsOptions));

async function start() {
  try {
    if (!MONGO_URI) throw new Error('MONGO_URI is missing in .env')
    await mongoose.connect(MONGO_URI)
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log(`API listening on :${PORT}`))
  } catch (err) {
    console.error('Startup error:', err.message)
    process.exit(1)
  }
}
start()
