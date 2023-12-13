export class Task {
  readonly id: string;
  completed: boolean;
  editing: boolean;
  title: string;

  constructor(title: string, completed = false) {
    this.id = crypto.randomUUID();
    this.completed = completed;
    this.editing = false;
    this.title = title;
  }
}
