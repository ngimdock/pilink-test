import { ConflictException } from '@nestjs/common';

export class StudentAlreadyExistsException extends ConflictException {
  constructor() {
    super('Student already exists.');
  }
}
