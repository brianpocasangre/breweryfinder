import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const API_URL = 'https://api.openbrewerydb.org/v1/breweries/random';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  const time = new Date();
  try {
    const response = await axios.get(API_URL);
    const result = response.data[0];
    res.render('index.ejs', {
      data: result,
      date: time.getFullYear,
    });
  } catch (error) {
    console.log(error.data.message);
  }
});

app.listen(port, () => {
  console.log(`Server listening on Port:${port}, http://localhost:${port}`);
});
