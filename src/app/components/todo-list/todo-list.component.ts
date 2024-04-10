import { Component,OnInit } from '@angular/core';
import {RouterModule, RouterOutlet} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TodoService} from "../../services/todo.service";
import {Todo} from "../../models/todo";
import {CommonModule} from "@angular/common";
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterModule,FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit{

  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  constructor(private todoService: TodoService) { }
  searchTerm: string = '';
  ngOnInit(): void {
    this.todoService.getAll().subscribe((todos: Todo[]) => {
      this.todos = todos;
      this.search(); // Gọi hàm search sau khi nhận được dữ liệu
    });
  }
  search(): void {
    
    if (this.searchTerm) {
      //loat lai full todo truoc khi loc
      this.ngOnInit();
      this.filteredTodos = this.todos.filter(todo =>
        todo.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        //In ra
      );
      //in ra fieredTodos
      console.log(this.filteredTodos);
      this.todos = this.filteredTodos;
    } else if(this.searchTerm === ''){
      console.log('searchTerm is empty');
      
      this.filteredTodos = this.todos;
    }
  }

  deleteTodo(id: number) {
    this.todoService.delete(id).subscribe(() => {
      this.todos = this.todos.filter(todo => todo.id !== id);
      this.search(); // Cập nhật filteredTodos sau khi xóa một todo
    }, error => {
      console.error('Error deleting todo:', error);
    });
  }
  
 
}
