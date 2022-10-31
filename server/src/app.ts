import express from "express"
import  { Request, Response } from "express"
import { myDataSource,dataSourceInit } from "./data-source/app-data-source"
import { Todo } from "./entity/todo.entity"

export function bootstrap(){
const PORT = process.env.PORT||3000

dataSourceInit()
const app = express()
app.use(express.json())


app.get("/todos",async function (req: Request, res: Response) {
    const users = await myDataSource.getRepository(Todo).find()
    return res.send(users)
})

app.get("/todos/:id",async function (req: Request, res: Response) {
    const user = await myDataSource.getRepository(Todo).findOneBy({id:+req.params.id ?? 1})
 return res.send(user)
})

app.post("/todos",async function (req: Request, res: Response) {    
    const user = await myDataSource.getRepository(Todo).create(req.body)
    const results = await myDataSource.getRepository(Todo).save(user)
    return res.send(results)
})

app.put("/todos/:id",async function (req: Request, res: Response) {
    const todo = await myDataSource.getRepository(Todo).findOneBy({
        id: +req.params.id,
    })
    if(!todo) throw new Error("todo not found")
    myDataSource.getRepository(Todo).merge(todo, req.body)
    const results = await myDataSource.getRepository(Todo).save(todo)
 return res.send(results)
    
})

app.delete("/todos/:id",async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(Todo).delete(req.params.id)
    return res.send(results)
})

app.listen(PORT,()=>{
    console.log(`server start on port:${PORT}`);
    
})

}
bootstrap()