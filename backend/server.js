import "dotenv/config";
import connectDb from "./src/config/db.js";
import app from "./src/index.js";

const port = process.env.PORT || 4000;

await connectDb();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});