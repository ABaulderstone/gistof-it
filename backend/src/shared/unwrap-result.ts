import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Either } from './either';
import { RecordNotFoundError } from './errors/not-found.error';

export const unwrapResult = <T, E extends Error>(
  controllerType: new () => T,
  result: Either<T, E>,
): T => {
  if (result.isErr()) {
    const err = result.unwrap();
    if (err instanceof RecordNotFoundError) {
      if (err.getEntityType() === controllerType.name) {
        throw new NotFoundException(err.message);
      }
      throw new BadRequestException(err.message);
    }
  }

  return result.unwrap() as T;
};
