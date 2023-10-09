import { ConflictException } from '@nestjs/common';

export class ForumAlreadyExistsException extends ConflictException {
  constructor() {
    super('Forum already exists.');
  }
}
