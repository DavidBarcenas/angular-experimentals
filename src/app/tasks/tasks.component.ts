import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  tasks = signal(['Learn TypeScript 5.0']);

  addTask(event: Event) {
    const newTask = (event.target as HTMLInputElement).value;
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(idx: number) {
    this.tasks.update((tasks) => tasks.filter((task, index) => idx !== index));
  }
}
