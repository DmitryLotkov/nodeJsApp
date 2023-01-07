import {Request, Response, Router} from "express";

export const productsRouter = Router({});
const products = [{id: 1, title:"tomato"}, {id: 2,title:"orange"}];
productsRouter.get('/', (req: Request, res:Response) => {
    if(req.query.title){
        const searchString = req.query.title.toString();
        res.send(products.filter(p => p.title.indexOf(searchString) > -1)) // проверяем наличие query параметра
    } else{
        res.send(products)
    }
});
productsRouter.get('/:productTitle', (req: Request, res:Response) => {
    let product = products.find(item => item.title === req.params.productTitle)
    if(product){
        res.send(product)
    } else{
        res.send(404)
    }

});
productsRouter.delete('/:id', (req: Request, res:Response) => {
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

});
productsRouter.post('/', (req: Request, res:Response) => {
    const newProduct = {
        id: Number(new Date()),
        title: req.body.title
    }
    products.push(newProduct)
    res.status(201).send(newProduct)
});
productsRouter.put('/:id', (req: Request, res:Response) => {
    let product = products.find(item => item.id === Number(req.params.id))
    if(product){
        product.title = req.body.title
        res.send(product)
    } else{
        res.send(404)
    }
});