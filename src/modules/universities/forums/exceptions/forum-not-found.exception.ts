import { NotFoundException } from '@nestjs/common';

export class ForumNotFoundException extends NotFoundException {
  constructor() {
    super('Forum not found.');
  }
}
