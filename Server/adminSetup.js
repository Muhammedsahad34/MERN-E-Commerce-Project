const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/shoppingCart', { useNewUrlParser: true, useUnifiedTopology: true });

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
  // Add other fields as needed
});

const Admin = mongoose.model('admin', adminSchema);

// Check if an admin user already exists
Admin.findOne({ username: 'admin@gmail.com' })
  .then(existingAdmin => {
    if (!existingAdmin) {
      // If no admin user exists, create a new admin
      const newAdmin = new Admin({
        username: 'admin@gmail.com',
        password: bcrypt.hashSync('admin123', 10), // Hash the password
        // Add other fields as needed
      });

      return newAdmin.save();
    }
  })
  .then(() => {
    console.log('Admin setup complete');
  })
  .catch(error => {
    console.error('Error setting up admin:', error);
  })
  .finally(() => {
    mongoose.disconnect(); // Close the database connection
  });

// Run the server to execute the script
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
