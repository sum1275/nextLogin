import { log } from "console";
import mongoose from "mongoose";
export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected");
    });
    connection.on("error", (err) => {
      console.log("Error Occured while connecting " + err);
    });
  } catch (error) {
    console.log("Error connecting to database: ", error);
  }
}
