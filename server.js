import express from 'express';
import sales from './data/avocado-sales.json';
const app = express();

const port = process.env.PORT || 8080;

// /sales endpoint
// PARAMETERS:
//  - page (minValue:0, default: 0): a number indicating which page of the results to return
//     usage: localhost:8080/?page=2
//  - pageSize (default: 20) : a number indicating how many results per page
// RETURNS:  all sales from avocado-sales.json
app.get('/sales', (req, res) => {
  // const { page } = req.query; // req.query === {page:1}
  // ?? allows us to specify a default value
  const page = req.query.page ?? 0;

  // 20 is default value, maybe should be it's own constant
  const pageSize = req.query.pageSize ?? 20;

  // Calculate the start index
  const startIndex = page * pageSize;

  // Calculate the end index
  const endIndex = startIndex + +pageSize;

  // Slice results
  const salesForPage = sales.slice(startIndex, endIndex);

  // Return 404 if no results
  if (salesForPage.length === 0) {
    // Send 404 error to client
    res.status(404).send({ error: 'No results found' });

    // Do not continue executing code in this endpoint
    return;
  }

  // Create return object with information and results
  const returnObject = {
    pageSize: pageSize,
    page: page,
    maxPages: parseInt(sales.length / pageSize),
    results: salesForPage,
  };

  // Send return object back to the client
  res.send(returnObject);
});

app.listen(port, () => {
  console.log('Hello World, the server is running');
});
