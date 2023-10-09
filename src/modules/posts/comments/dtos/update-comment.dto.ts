import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends OmitType(PartialType(CreateCommentDto), [
  'postId',
  'ownerId',
]) {}
