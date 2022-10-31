import { DataSource } from "typeorm"
import * as path from 'path'
import { Todo } from "../entity/todo.entity"
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
export const myDataSource = new DataSource({
    type: "sqlite",
    database: path.resolve(__dirname,"..","todos.db"),
    entities: [Todo],
    logging: false,
    synchronize: true,
})
export const dataSourceInit = ()=>{
    myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

}