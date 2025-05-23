import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlarmService } from './alarm.service';
import { AlarmController } from '../presenters/http/alarm.controller';
import { AlarmFactory } from '../domain/factories/alarm.factory';
import { CreateAlarmCommandHandler } from './commands/create-alarm.command-handler';
import { GetAlarmsQueryHandler } from './queries/get-alarm.query-handler';
import { AlarmCreatedEventHandler } from './event-handlers/alarm-created.event-handler';

@Module({
  controllers: [AlarmController],
  providers: [AlarmService, AlarmFactory, CreateAlarmCommandHandler, GetAlarmsQueryHandler, AlarmCreatedEventHandler],
})
export class AlarmModule {
  static withInfrastructure(infrastructureModule: Type | DynamicModule){
    return {
      module: AlarmModule,
      imports: [infrastructureModule]
    }
  }
}
