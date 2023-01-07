import {Request, Response, Router} from "express";
const addresses = [{id: 1, value: "Nazalejnasti 12"}, {id: 2, value: "Selickaga 11"}]
const addressesRouter = Router({})
addressesRouter.get('/', (req: Request, res:Response) => {
    res.send(addresses)
})
addressesRouter.get('/:id', (req: Request, res:Response) => {
    let address = addresses.find(item => item.id === Number(req.params.id))
    if(address){
        res.send(address)
    } else{
        res.send(404)
    }
})