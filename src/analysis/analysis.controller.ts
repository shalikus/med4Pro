import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { AnalysisService } from './analysis.service'
import { CreateAnalysisDto } from './dto/create-analysis.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Анализ')
@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @ApiOperation({ summary: 'Сделать анализ' })
  @ApiResponse({ status: 200 })
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createAnalysisDto: CreateAnalysisDto) {
    return this.analysisService.create(createAnalysisDto)
  }
}
