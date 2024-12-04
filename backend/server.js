const app = require("./app"); // Import the Express app
const connectDatabase = require("./config/database"); // Import the database connection function

const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" }); // Load environment variables from config.env

connectDatabase(); // Connect to the database

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
