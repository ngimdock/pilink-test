import { ConflictException } from '@nestjs/common';

export class StudentAlreadyMemberOfThiForumException extends ConflictException {
  constructor() {
    super('The student is already a member of this forum.');
  }
}
