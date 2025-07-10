const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoute");
const productRoute = require("./routes/productRoute")
const cartRoutes = require("./routes/cartRoute");
const reviewRoute = require("./routes/reviewRoute")
const orderRoute = require("./routes/orderRoutes")
dotenv.config();

const app = express();
const PORT = 5000
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoute)
app.use("/api/cart", cartRoutes);
app.use("/api/reviews",reviewRoute );
app.use("/api/orders",orderRoute );


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected")
    } catch (error) {
        console.log(error)
    }
}


connectDB()

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

