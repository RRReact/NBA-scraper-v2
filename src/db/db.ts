import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connect = async () => {
  mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zm1zd.mongodb.net/nba?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  );
  mongoose.connection.on("connected", () => {
    console.log("Successfully connected to DB");
  });
};
