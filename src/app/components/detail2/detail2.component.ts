import { Component } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-detail2',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './detail2.component.html',
  styleUrl: './detail2.component.css'
})
export class Detail2Component {
  todo: Todo = {
    id: 0,
    title: 'adsa',
    body: 'dsad' 
  };

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    // Giả sử bạn muốn lấy thông tin của Todo có id là 1
   //Đẩy data lên html
   this.todoService.find(1).subscribe((data: Todo)=>{
    this.todo = data;
    console.log(this.todo);
  });
 
  }  
}
