import app from "./app.js";
import { connectDB } from "./db.js";

async function main() {
  try {
    await connectDB();
    app.listen(4000, () => {
      console.log("Server run");
    });
  } catch (error) {
    console.error(error);
  }
}

main();
