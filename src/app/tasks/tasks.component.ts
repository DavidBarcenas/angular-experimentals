import { Component, computed, effect, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { Task } from './task.model';
import { NgClass, TitleCasePipe } from '@angular/common';

type Filter = 'all' | 'completed' | 'pending';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [NgClass, TitleCasePipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  @ViewChild('addInput') addInput!: ElementRef<HTMLInputElement>;
  filters = signal<Filter[]>(['all', 'completed', 'pending']);
  activeFilter = signal<Filter>('all');
  tasks = signal<Task[]>([]);
  tasksByFilter = computed(() => {
    return this.tasks().filter((task) => {
      switch (this.activeFilter()) {
        case 'completed':
          return task.completed;
        case 'pending':
          return !task.completed;
        default:
          return true;
      }
    });
  });

  constructor() {
    effect(() => {
      if (this.tasks().length > 0) {
        localStorage.setItem('tasks', JSON.stringify(this.tasks()));
      } else {
        localStorage.removeItem('tasks');
      }
    });
  }

  ngOnInit() {
    const storageTasks = localStorage.getItem('tasks');
    if (storageTasks) {
      const tasks = JSON.parse(storageTasks);
      this.tasks.set(tasks);
    } else {
      this.tasks.set([new Task('Learn Typescript 5.0')]);
    }
  }

  addTask(event: Event): void {
    const value = (event.target as HTMLInputElement).value.trim();
    if (value) {
      const newTask = new Task(value);
      this.tasks.update((tasks) => [...tasks, newTask]);
      this.addInput.nativeElement.value = '';
    }
  }

  deleteTask(id: string): void {
    this.tasks.update((tasks) => tasks.filter((task) => id !== task.id));
  }

  updateTask(id: string, event: Event): void {
    const value = (event.target as HTMLInputElement).value.trim();
    // Deactivate edit mode before updating the task title. This is to prevent the task from being updated twice.
    this.deactivateEditMode();
    this.tasks.update((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, title: value } : task))
    );
  }

  markAsCompleted(id: string): void {
    this.tasks.update((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  }

  activateEditMode(id: string): void {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, editing: true } : { ...task, editing: false }
      )
    );
  }

  deactivateEditMode(): void {
    this.tasks.update((tasks) => tasks.map((task) => ({ ...task, editing: false })));
  }

  changeFilter(filter: Filter): void {
    this.activeFilter.set(filter);
  }

  clearCompleted(): void {
    this.tasks.update((tasks) => tasks.filter((task) => !task.completed));
  }
}
