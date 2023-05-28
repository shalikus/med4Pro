import { Controller, Post, Body } from '@nestjs/common'
import { AnalysisService } from './analysis.service'
import { CreateAnalysisDto } from './dto/create-analysis.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Анализ')
@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post()
  create(@Body() createAnalysisDto: CreateAnalysisDto) {
    return this.analysisService.create(createAnalysisDto)
  }
}
