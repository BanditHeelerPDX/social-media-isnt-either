const { connect, connection } = require("mongoose");

const connectDB = async () => {
  try {
    const connectionString =
      process.env.MONGODB_URI || "mongodb://localhost/social-network-api";
    await connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;