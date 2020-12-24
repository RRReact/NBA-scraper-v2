import mongoose from "mongoose";

export const connect = async () => {
  await mongoose.connect(
    "mongodb+srv://robi123456:<password>@cluster0.zm1zd.mongodb.net/<dbname>?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  );
};
