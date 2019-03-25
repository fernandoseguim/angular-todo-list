import { Component } from '@angular/core';
import { Todo } from 'src/models/todo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public mode: String = 'list';

  public todos: Todo[] = []
  public title: String = 'TODO APP';
  public subTitle: String = 'List of tasks';
 
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });
    
    this.load();
  }

  add = () => {
    const description = this.form.controls['title'].value;
    const id = this.todos.length+1;
    this.todos.push(new Todo(id,description, false));
    this.save();
    this.clear();
  }
  
  remove = (todo: Todo) => {
    const index = this.todos.indexOf(todo);
    console.log(index);
    this.todos.splice(index, 1);
    this.save();
  }
  
  done = (todo: Todo) => {
    todo.done = true;
    this.save();
  }
  unDone = (todo: Todo) => {
    todo.done = false;
    this.save();
  }
  clear = () => this.form.reset();

  save(){
    const data = JSON.stringify(this.todos);
    localStorage.setItem("todos", data);
  }

  load(){
    const data = localStorage.getItem("todos");
    const todos = JSON.parse(data);

    this.todos.push(...todos);
  }

  changeMode = (mode: String) => this.mode = mode;
  
}
