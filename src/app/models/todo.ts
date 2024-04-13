export class Todo {
  id: number;
  title: string;
  body: string;
  time: Date;
  status: number;
  constructor() {
    this.id = 0;
    this.title = '';
    this.body = '';
    this.time = new Date();
    this.status = 0;
  }

}
