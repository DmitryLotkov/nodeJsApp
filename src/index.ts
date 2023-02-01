import express from 'express'
import {productsRouter} from "./routes/products-router";
import * as mongoose from "mongoose";
import postRouter from "./routes/post-router";
import fileUpload from "express-fileupload"
import {MongoDBUris, PORT} from "./main/config";


const app = express()

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
        await mongoose.connect(MongoDBUris)
        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

startApp()