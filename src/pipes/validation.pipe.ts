import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { ValidationException } from '../exceptions/validation.exception'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value)
    const errors = await validate(obj)

    if (errors.length) {
      const errorsObject = {}
      errors.forEach((err) => {
        errorsObject[err.property] = Object.values(err.constraints)[0]
      })
      throw new ValidationException(errorsObject)
    }
    return value
  }
}
