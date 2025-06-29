import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos';
import { Todo } from '../../model/todo.type';
import { catchError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TodoItem } from '../components/todo-item/todo-item';
import { FormsModule } from '@angular/forms';
import { FilterTodosPipe } from '../pipes/filter-todos-pipe';

@Component({
  selector: 'app-todos',
  imports: [CommonModule, TodoItem, FormsModule, FilterTodosPipe],
  templateUrl: './todos.html',
  styleUrl: './todos.scss'
})

export class Todos implements OnInit {
  todoService = inject(TodosService);
  todoItems = signal<Array<Todo>>([]);
  searchTerm = signal<string>('');

  ngOnInit(): void {
    
    this.todoService.getTodosFromApi()
      .pipe(
        catchError((error) => {
          console.log(error);
          throw error;
        })
      )
      .subscribe(
        (todos) => {this.todoItems.set(todos)},
      )
  }

  updateTodoItem(todoItem: Todo){
    this.todoItems.update((todos) => {
      return todos.map(todo => {
        if (todo.id === todoItem.id) {
          return {
            ...todo,
            completed: !todo.completed
          }
        }
        return todo;
      })
    })
  }
}
