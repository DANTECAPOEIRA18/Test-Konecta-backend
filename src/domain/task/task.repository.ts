export class Task {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string | null,
    public completed: boolean,
    public readonly userId: string,
  ) {}
}