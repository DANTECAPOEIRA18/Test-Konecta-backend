import { Controller, Get, Post, Body, Query, UseGuards, Req, Param, Put, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TasksService } from '../../application/task/task.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TaskCreateDto } from './dto/task-create.dto';
import { TaskUpdateDto } from './dto/task-update.dto';

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/tasks')
export class TasksController {
  constructor(private readonly tasks: TasksService) {}

  @Get()
  @ApiOkResponse({ description: 'List tasks of current user' })
  list(@Req() req: any, @Query('completed') completed?: string) {
    const isCompleted = completed === undefined ? undefined : completed === 'true';
    return this.tasks.findAll(req.user.userId, isCompleted);
  }

  @Get(':id')
  get(@Req() req: any, @Param('id') id: string) {
    return this.tasks.findOne(id, req.user.userId);
  }

  @Post()
  create(@Req() req: any, @Body() dto: TaskCreateDto) {
    return this.tasks.create(req.user.userId, dto);
  }

  @Put(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() dto: TaskUpdateDto) {
    return this.tasks.update(id, req.user.userId, dto);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.tasks.delete(id, req.user.userId);
  }
}
