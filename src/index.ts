import express, {Request, Response} from 'express'
import bodyParser from "body-parser";

const app = express()
const port = process.env.PORT || 5000
const products = [{id: 1, title:"tomato"}, {id: 2,title:"orange"}]
const addresses = [{id: 1, value: "Nazalejnasti 12"}, {id: 2, value: "Selickaga 11"}]
const parserMiddleware = bodyParser({}) //конвертируем body в JSON
app.use(parserMiddleware)
app.get('/products', (req: Request, res:Response) => {
    if(req.query.title){
        const searchString = req.query.title.toString();
        res.send(products.filter(p => p.title.indexOf(searchString) > -1)) // проверяем наличие query параметра
    } else{
        res.send(products)
    }
})
app.get('/products/:productTitle', (req: Request, res:Response) => {
    let product = products.find(item => item.title === req.params.productTitle)
    if(product){
        res.send(product)
    } else{
        res.send(404)
    }

})
app.get('/addresses', (req: Request, res:Response) => {
    res.send(addresses)
})
app.get('/addresses/:id', (req: Request, res:Response) => {
    let address = addresses.find(item => item.id === Number(req.params.id))
    if(address){
        res.send(address)
    } else{
        res.send(404)
    }
})
app.delete('/products/:id', (req: Request, res:Response) => {
    for (let i =0;i<products.length;i++){
        if(products[i].id === Number(req.params.id)){
            products.splice(i, 1)
            res.send(204)
            return
        }
        else{
            res.send(404)
        }
    }

})
app.post('/products', (req: Request, res:Response) => {
    const newProduct = {
        id: Number(new Date()),
        title: req.body.title
    }
    products.push(newProduct)
    res.status(201).send(newProduct)
})
app.put('/products/:id', (req: Request, res:Response) => {
    let product = products.find(item => item.id === Number(req.params.id))
    if(product){
        product.title = req.body.title
        res.send(product)
    } else{
        res.send(404)
    }
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})