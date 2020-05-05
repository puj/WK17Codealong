import express from "express";
import sales from "./data/avocado-sales.json";
import { start } from "repl";
const app = express();

const port = process.env.PORT || 8080;

// With "Query Parameter"
app.get("/sales", (req, res) => {
  // How to implement paging here?

  // Deconstruct which page to show
  const { page } = req.query;

  // Attempt to retrieve pageSize from query
  const pageSize = req.query.pageSize ?? 20;

  // Calculate start index
  const startIndex = page * pageSize;

  // Calculate and bound end index
  const endIndex = Math.min(startIndex + pageSize, sales.length);

  // Slice results
  const results = sales.slice(startIndex, endIndex);

  // Inform the client
  res.send({
    pageSize: pageSize,
    page: page,
    maxPages: parseInt(sales.length / pageSize),
    results: results,
  });
});

// With "Path Parameter"
app.get("/sales/:id", (req, res) => {
  const { id } = req.params; // ID is a string here
  const saleFound = sales.find((sale) => sale.id === +id /* Convert to num */);

  // What happens if not found?
  res.send(saleFound);
});

app.listen(port, () => {
  console.log("Hello World, the server is running");
});
