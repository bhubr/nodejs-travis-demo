const app = require('./app');

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Listening on ${port}`);
  }
});
