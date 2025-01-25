const app = require("./app"); // Import the Express app
const connectDatabase = require("./config/database"); // Import the database connection function
const User = require("./model/userModel")
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" }); // Load environment variables from config.env


const cors = require('cors'); // Import CORS middleware

// CORS setup: Allow requests from the frontend (localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000', // Allow only your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Define allowed methods
  credentials: true, // Allow credentials (e.g., cookies, authorization headers)
}));



const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

connectDatabase(); // Connect to the database

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
