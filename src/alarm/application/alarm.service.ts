import { Injectable } from '@nestjs/common';
import { CreateAlarmCommand } from './commands/create-alarm.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAlarmsQuery } from './queries/get-alarm.query';

@Injectable()
export class AlarmService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ){}

  create(createAlarmCommand: CreateAlarmCommand) {
    return this.commandBus.execute(createAlarmCommand)
  }

  findAll() {
    return this.queryBus.execute(new GetAlarmsQuery())
  }
}
