import { Injectable } from '@nestjs/common'
import { CreateAnalysisDto } from './dto/create-analysis.dto'

/**
 * ОБЪЕКТ ПАКЕТНЫХ НАЗНАЧЕНИЙ
 *
 * Структура:
 * [Код]: [Массив Назначений]
 *
 * Пример:
 * 'K21.0': [
 *      'Клинический анализ крови',
 *      'Анализ кала на скрытую кровь',
 *      'ЭКГ',
 *      'ЭГДС',
 *      'Рентгенография пищевода и желудка',
 *      'АТ к НР'
 * ]
 */
const BatchAssignments: Record<string, string[]> = {}

/**
 * ОБЪЕКТ СТАНДАРТОВ МЗ
 *
 * Структура:
 * [Код]: [Массив Назначений]
 */
const Standarts: Record<string, string[]> = {}

/**
 * 804 ПРИКАЗ
 *
 * Структура:
 * [Код]: [Назначение]
 *
 * Пример:
 * 'A01.01.001': 'Сбор анамнеза и жалоб в дерматологии'
 */
const Codes804: Record<string, string> = {}

const checkAssignments = (
  realAssignments: string[],
  assignmentsFromInput: string[],
): string => {
  const realAssignmentsLength = realAssignments.length
  const assignmentsFromInputLength = assignmentsFromInput.length

  if (assignmentsFromInputLength > realAssignmentsLength)
    return 'Назначения не входящие в стандарт'

  if (assignmentsFromInputLength < realAssignmentsLength)
    return 'Частичные назначения'

  realAssignments.sort()
  assignmentsFromInput.sort()

  for (let i = 0; i < realAssignmentsLength; i++) {
    const realAssignmentsElement = realAssignments[i]
    const assignmentsFromInputElement = assignmentsFromInput[i]

    if (assignmentsFromInputElement !== realAssignmentsElement) {
      return 'Назначения не входящие в стандарт'
    }
  }

  return 'Назначения соответствуют стандарту'
}

@Injectable()
export class AnalysisService {
  async create(createAnalysisDto: CreateAnalysisDto) {
    return createAnalysisDto.data.map((input) => {
      const mkbCode = input.mkbCode

      // ищем в кодах пакетных назначений ДЗМ
      if (BatchAssignments[mkbCode]) {
        // нашли => анализируем п.5.2.1
        return {
          input,
          result: checkAssignments(
            BatchAssignments[mkbCode],
            input.assignments,
          ),
        }
      } else {
        // не нашли => ищем в стандарте МЗ
        if (Standarts[mkbCode]) {
          // нашли => анализируем п.5
          return {
            input,
            result: checkAssignments(Standarts[mkbCode], input.assignments),
          }
        } else {
          // не нашли => добавляем код "нет подходящего стандарта"
          return {
            input,
            result: 'Нет подходящего стандарта',
          }
        }
      }
    })
  }
}
