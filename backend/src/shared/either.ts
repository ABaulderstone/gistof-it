export class Either<T, E extends Error> {
  private constructor(
    private readonly value: T | E,
    private readonly success: boolean,
  ) {}

  static left<T, E extends Error>(value: T): Either<T, E> {
    return new Either<T, E>(value, true);
  }

  static right<T, E extends Error>(error: E): Either<T, E> {
    return new Either<T, E>(error, false);
  }

  isSuccess(): boolean {
    return this.success;
  }

  isErr(): boolean {
    return !this.success;
  }

  map<U>(f: (value: T) => U): Either<U, E> {
    if (this.success) {
      return Either.left<U, E>(f(this.value as T));
    } else {
      return Either.right<U, E>(this.value as E);
    }
  }

  flatMap<U>(f: (value: T) => Either<U, E>): Either<U, E> {
    if (this.success) {
      return f(this.value as T);
    } else {
      return Either.right<U, E>(this.value as E);
    }
  }

  unwrap(): T | E {
    return this.value;
  }
}
