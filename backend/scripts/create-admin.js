import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import readline from 'readline';
import User from '../src/models/User.js';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('\n✅ Connected to MongoDB\n');

    console.log('=== Create Admin User ===\n');

    const email = await question('Enter admin email: ');
    const password = await question('Enter admin password (min 8 chars): ');
    const name = await question('Enter admin name: ');

    if (!email || !password || !name) {
      console.error('\n❌ All fields are required');
      process.exit(1);
    }

    if (password.length < 8) {
      console.error('\n❌ Password must be at least 8 characters');
      process.exit(1);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error('\n❌ User with this email already exists');
      process.exit(1);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const admin = await User.create({
      email,
      password: hashedPassword,
      name,
      role: 'ADMIN'
    });

    console.log('\n✅ Admin user created successfully!\n');
    console.log('Details:');
    console.log(`  ID: ${admin._id}`);
    console.log(`  Email: ${admin.email}`);
    console.log(`  Name: ${admin.name}`);
    console.log(`  Role: ${admin.role}`);
    console.log(`\nYou can now login at http://localhost:5173/login\n`);

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error creating admin:', error.message);
    process.exit(1);
  } finally {
    rl.close();
    await mongoose.connection.close();
  }
}

createAdmin();