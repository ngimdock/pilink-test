import { ForbiddenException } from '@nestjs/common';

export class StudentIsNotMemberOfThisForumException extends ForbiddenException {
  constructor() {
    super('The student is not member of this forum.');
  }
}
