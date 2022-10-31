import { TodoStatus } from "./status.entity";
import { Type } from "class-transformer";
export interface TodoInterface {
  id?: number;
  title: string;
  description: string;
  plannedTo: Date;
  status: TodoStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
export class Todo implements TodoInterface {
  
    public id?: number


  @Type(() => Date)
  plannedTo: Date;
  constructor(
    public title: string = "",
    public description: string = "",
    plannedTo: Date = new Date(),
    public status: TodoStatus = TodoStatus.PLANNED,
    public createdAt?: Date,
    public updatedAt?: Date

  ) {
    this.plannedTo = plannedTo;
  }
}
