import express from 'express'
import bodyParser from "body-parser";
import {productsRouter} from "./routes/products-router";

const app = express()
const port = process.env.PORT || 5000


const parserMiddleware = bodyParser({}) //конвертируем body в JSON
app.use(parserMiddleware)
app.use("/products", productsRouter)
app.use("/addresses", productsRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})