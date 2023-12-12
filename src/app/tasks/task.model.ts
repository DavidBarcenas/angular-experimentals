export class Task {
  id: string;
  completed: boolean;
  title: string;

  constructor(title: string, completed = false) {
    this.id = crypto.randomUUID();
    this.completed = completed;
    this.title = title;
  }
}
