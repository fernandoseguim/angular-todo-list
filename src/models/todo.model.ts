export class Todo {
  public id: Number;
  public description: String;
  public done: Boolean;  
  
  constructor(id: Number, description: String, done: Boolean) 
  {
    this.id = id;
    this.description = description;
    this.done = done;
  }
}