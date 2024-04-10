import { Component,OnInit } from '@angular/core';
import {RouterModule, Router, RouterLink, ActivatedRoute, RouterOutlet} from "@angular/router";
import {TodoService} from "../../services/todo.service";
import {Todo} from "../../models/todo";
import { FormGroup, FormsModule, ReactiveFormsModule,FormControl,Validator, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule,RouterOutlet],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.css'
})
export class EditTodoComponent implements OnInit{
  id!: number;
  todo: Todo = {
    id: 0,
    title: 'adsa',
    body: 'dsad' 
  };
  constructor(private todoService: TodoService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['todoId'];
    this.todoService.find(this.id).subscribe((data: Todo)=>{
      console.log(this.id);
      this.todo = data;
      console.log(this.todo);
    });
  }
  submit(){
    if(this.todo){
      this.todoService.update(this.id,this.todo).subscribe((data)=>{
        this.router.navigate(['/detail', this.todo?.id]);
      });
    }
  }
  
}
