import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Put,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/authentication/jwt/jwt-auth.guard';
import {
  MatchFinishInputDto,
  MatchInputDto,
  MatchInputUpdateDto,
  MatchOutputDto,
} from './dto/match.dto';
import MatchService from '../services/match.service';
import { UserOutputDto } from 'src/modules/user/controllers/DTOs/user.dto';
import LoggedUser from 'src/modules/authentication/user.decorator';
import { MatchStatus } from '../entities/matchs.entity';

@Controller('match')
@UseGuards(JwtAuthGuard)
class MatchController {
  constructor(private matchService: MatchService) {}

  @Get()
  async getAllMatchs(@Query('status') status: MatchStatus): Promise<MatchOutputDto[]> {
    const result = await this.matchService.getAllMatchs(status);

    return result.map(MatchOutputDto.fromEntity);
  }

  @Post()
  async createNewMatch(
    @Body() body: MatchInputDto,
    @LoggedUser() user: UserOutputDto
  ): Promise<MatchOutputDto> {
    return await this.createOrUpdate(body, user);
  }

  private async createOrUpdate(
    body: MatchInputDto,
    user: UserOutputDto
  ): Promise<MatchOutputDto> {
    const createdMatch = await this.matchService.createNewMatch(body, user.id);

    return MatchOutputDto.fromEntity(createdMatch);
  }

  @Put()
  async updateMatch(
    @Body() body: MatchInputUpdateDto,
    @LoggedUser() user: UserOutputDto
  ): Promise<MatchOutputDto> {
    return await this.createOrUpdate(body, user);
  }

  @Get(':id')
  async getById(@Param('id', new ParseIntPipe()) id: number): Promise<MatchOutputDto> {
    const result = await this.matchService.getById(id);

    return MatchOutputDto.fromEntity(result);
  }

  @Put('cancel')
  async cancelMatch(
    @Param('id', new ParseIntPipe()) id: number
  ): Promise<MatchOutputDto> {
    const result = await this.matchService.cancelMatch(id);

    return MatchOutputDto.fromEntity(result);
  }

  @Put('finish')
  async finishMatch(@Body() match: MatchFinishInputDto): Promise<void> {
    await this.matchService.finishMatch(match);
  }
}

export default MatchController;
