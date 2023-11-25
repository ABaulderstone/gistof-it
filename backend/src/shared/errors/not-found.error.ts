export class RecordNotFoundError<T> extends Error {
  private readonly entityType: string;

  constructor(message: string, entityType: new () => T) {
    super(message);
    this.entityType = entityType.name;
  }

  getEntityType(): string {
    return this.entityType;
  }
}
