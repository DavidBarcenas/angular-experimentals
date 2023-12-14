import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { Task } from './task.model';
import { NgClass, TitleCasePipe } from '@angular/common';

const storeKey = 'tasks';
enum Filters {
  All = 'all',
  Completed = 'completed',
  Pending = 'pending',
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [NgClass, TitleCasePipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent implements OnInit {
  @ViewChild('addInput') addInput!: ElementRef<HTMLInputElement>;

  filters = signal<Filters[]>([Filters.All, Filters.Completed, Filters.Pending]);
  activeFilter = signal<Filters>(Filters.All);
  tasks = signal<Task[]>([]);

  tasksByFilter = computed(() => {
    return this.tasks().filter((task) => {
      switch (this.activeFilter()) {
        case Filters.Completed:
          return task.completed;
        case Filters.Pending:
          return !task.completed;
        default:
          return true;
      }
    });
  });

  constructor() {
    effect(() => {
      if (this.tasks().length > 0) {
        localStorage.setItem(storeKey, JSON.stringify(this.tasks()));
      } else {
        localStorage.removeItem(storeKey);
      }
    });
  }

  ngOnInit(): void {
    const storageTasks = localStorage.getItem(storeKey);
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

  changeFilter(filter: Filters): void {
    this.activeFilter.set(filter);
  }

  clearCompleted(): void {
    this.tasks.update((tasks) => tasks.filter((task) => !task.completed));
  }
}
