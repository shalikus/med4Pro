import { IsArray, IsDate, IsNumber, IsString } from 'class-validator'

class IData {
  @IsString({ message: 'Должно быть строкой!' })
  readonly sex: string

  @IsDate({ message: 'Должно быть датой' })
  readonly birthdate: Date

  @IsNumber({}, { message: 'Должно быть числом' })
  readonly id: number

  @IsString({ message: 'Должно быть строкой!' })
  readonly mkbCode: string

  @IsString({ message: 'Должно быть строкой!' })
  readonly diagnosis: string

  @IsDate({ message: 'Должно быть датой' })
  readonly date: Date

  @IsString({ message: 'Должно быть строкой!' })
  readonly post: string

  @IsArray({ message: 'Должно быть массивом строк' })
  @IsString({ message: 'Должно быть строкой!', each: true })
  readonly assignments: string[]
}

export class CreateAnalysisDto {
  @IsArray({ message: 'Должно быть массивом' })
  data: IData[]
}
