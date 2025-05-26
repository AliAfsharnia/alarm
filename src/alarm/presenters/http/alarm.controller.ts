import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlarmService } from '../../application/alarm.service';
import { CreateAlarmDto } from './dto/create-alarm.dto';
import { CreateAlarmCommand } from 'src/alarm/application/commands/create-alarm.command';

@Controller('alarm')
export class AlarmController {
  constructor(private readonly alarmService: AlarmService) {}

  @Post()
  create(@Body() createAlarmDto: CreateAlarmDto) {
    return this.alarmService.create(
      new CreateAlarmCommand(createAlarmDto.name, createAlarmDto.severity, createAlarmDto.triggeredAt, createAlarmDto.isAcknowledged, createAlarmDto.items)
    );
  }

  @Get()
  findAll() {
    return this.alarmService.findAll();
  }

  @Patch(':id/acknowledged')
  acknowledged(@Param('id') id: string) {
    return this.alarmService.acknowledged(id);
  }

}
