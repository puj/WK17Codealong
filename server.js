import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const port = process.env.PORT || 8080;
const app = express();

const data = [
  { name: "Bob", age: 34 },
  { name: "Ivan", age: 22 },
  { name: "Karl", age: 42 },
  { name: "Anton", age: 21 },
];

app.use(cors());
app.use(bodyParser.json());

app.get("/people", (req, res) => {
  res.send(data);
});

app.get("/people/:index", (req, res) => {
  const { index } = req.params;
  res.send(data[index]);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
