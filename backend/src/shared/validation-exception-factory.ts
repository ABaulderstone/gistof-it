import {
  ValidationError,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';

export interface ErrorsCollection {
  [fieldName: string]: string[];
}

export const validationExceptionFactory = (
  errors: ValidationError[],
): BadRequestException => {
  const formattedErrors = errors.reduce(
    (errors: ErrorsCollection, validationError: ValidationError) => {
      const { property, constraints = {} } = validationError;
      errors[property] = Object.values(constraints);
      return errors;
    },
    {},
  );

  const errorObject = {
    statusCode: HttpStatus.BAD_REQUEST,
    errors: formattedErrors,
    error: 'Bad Request',
  };
  return new BadRequestException(errorObject);
};
