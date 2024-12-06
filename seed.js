const mongoose = require("mongoose");
const Product = require("./schema/product.schema");
const seedData = require("./seedData.json"); // Save the above JSON as seedData.json
const dotenv=require('dotenv');
dotenv.config();



const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Database connected");

    await Product.deleteMany(); // Clear existing data
    console.log("Existing data cleared");

    await Product.insertMany(seedData); // Insert new data
    console.log("Database seeded successfully");

    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

seedDatabase();
