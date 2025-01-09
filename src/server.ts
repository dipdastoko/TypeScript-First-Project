import app from "./app";
const mongoose = require("mongoose");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

async function main() {
  await mongoose.connect(process.env.DATABASE_URL);
}
