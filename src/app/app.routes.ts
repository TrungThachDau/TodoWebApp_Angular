import { Routes } from '@angular/router';
import {TodoListComponent} from "./components/todo-list/todo-list.component";
import {AddTodoComponent} from "./components/add-todo/add-todo.component";
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';
import { DetailComponent } from './components/detail/detail.component';


export const routes: Routes = [
  { path: '', redirectTo: '/todo-list', pathMatch: 'full' },
  { path: 'todo-list', component: TodoListComponent },
  { path: 'add-todo', component: AddTodoComponent},
  { path: 'edit/:todoId', component: EditTodoComponent},
  { path: 'detail/:todoId', component:DetailComponent},
];
