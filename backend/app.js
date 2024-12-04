const express = require("express");

const app = express();
const cookieParser=require("cookie-parser");

app.use(express.json())
app.use(cookieParser());
const product = require("../backend/routes/productRoute");
const user=require("./routes/userRoute");
const order=require("./routes/orderRoute");

app.use("/products", product);

app.use("/api/v1",user);

app.use("/api/v1",order);

module.exports=app; 