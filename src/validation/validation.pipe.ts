import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private zodtype: ZodType) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if(metadata.type == 'body') {
      return this.zodtype.parse(value);
    } else {
      return value;
    }
  }
}
