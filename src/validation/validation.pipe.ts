import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private zodtype: ZodType) {}

  transform(value: any, _metadata: ArgumentMetadata) {
    return this.zodtype.parse(value);
  }
}
