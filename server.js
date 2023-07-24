import { app } from "./app.js";
import { connectDB} from "./data/database.js";


//database connect
connectDB();



//server listning
app.listen(process.env.PORT, () => {
    console.log("server is working")
})