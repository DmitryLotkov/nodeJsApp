import express from 'express'
import {productsRouter} from "./routes/products-router";
import * as mongoose from "mongoose";
import postRouter from "./routes/post-router";
import fileUpload from "express-fileupload"


const app = express()
const port = process.env.PORT || 5000
const DB_URL = "mongodb+srv://dmitry_lotkov:Sositenogi1@firstapp.opxvirc.mongodb.net/?retryWrites=true&w=majority"
mongoose.set('strictQuery', true);
app.use(fileUpload({}))
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use("/products", productsRouter)
app.use("/addresses", productsRouter)
app.use("/", postRouter)

// Handling non matching request from the client
app.all('*', (req, res) => {
    res.status(404).send('<h1>404 Page not found</h1>');
});


async function startApp() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

startApp()