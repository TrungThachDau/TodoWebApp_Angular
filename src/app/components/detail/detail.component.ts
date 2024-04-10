import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterOutlet, CommonModule,RouterModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit{
  id!: number;
  todo: Todo|null  = null;
  constructor(private todoService: TodoService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['todoId'];
    this.todoService.find(this.id).subscribe((data: Todo)=>{
      console.log(this.id);
      this.todo = data;
      console.log(this.todo);
    });
  }
}

