import { Component } from '@angular/core';
import {RouterModule, Router} from "@angular/router";
import {TodoService} from "../../services/todo.service";
import {Todo} from "../../models/todo";
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent {
  todo: Todo = new Todo();
  errorMessage: string = '';

  constructor(private todoService: TodoService, private router:Router) { }
  
  addTodo() {
    this.todoService.create(this.todo).subscribe(
      () => {
        this.todo = new Todo();
        this.router.navigate(['/todo-list']);
      },
      (error) => {
        this.errorMessage = 'Lỗi khi thêm.';
        console.error(error);
      }
    );
  }
}
