import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { Task } from './task.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [NgClass],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  @ViewChild('addInput') addInput!: ElementRef<HTMLInputElement>;
  tasks = signal<Task[]>([new Task('Learn Typescript 5.0')]);

  addTask(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim();
    if (value) {
      const newTask = new Task(value);
      this.tasks.update((tasks) => [...tasks, newTask]);
      this.addInput.nativeElement.value = '';
    }
  }

  deleteTask(id: string) {
    this.tasks.update((tasks) => tasks.filter((task) => id !== task.id));
  }

  updateTask(id: string) {
    this.tasks.update((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  }

  activateEditMode(id: string) {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, editing: true } : { ...task, editing: false }
      )
    );
  }

  deactivateEditMode(id: string) {
    this.tasks.update((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, editing: false } : task))
    );
  }
}
