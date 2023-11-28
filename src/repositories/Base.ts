export abstract class Repository<T extends { id: number }> {
  public abstract getAll(): Promise<T[]>

  public abstract get(id: number): Promise<T>

  public abstract add(entity: Omit<T, 'id'>): Promise<T>

  public abstract edit(changes: Partial<T>): Promise<T>

  public abstract delete(id: number): Promise<void>
}