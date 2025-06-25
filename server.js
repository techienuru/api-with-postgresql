import express from "express";
import dbConn from "./config/dbConn.js";
import rootRouter from "./routes/root.js";

const app = express();
const PORT = 3500;

app.use(express.json());

app.use("/users", rootRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Page not found." });
});

dbConn.connect((err) => {
  if (err) {
    console.error("Failed to connect to DB: ", err.message);
    process.exit(1);
  } else {
    console.log("Connected to DB successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }
});
