import express from "express";
import cors from "cors";

import posts from "./posts";
import users from "./users";

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

posts(app);
users(app);
