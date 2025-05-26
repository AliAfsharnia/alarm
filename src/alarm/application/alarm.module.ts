import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlarmService } from './alarm.service';
import { AlarmController } from '../presenters/http/alarm.controller';
import { AlarmFactory } from '../domain/factories/alarm.factory';
import { CreateAlarmCommandHandler } from './commands/create-alarm.command-handler';
import { GetAlarmsQueryHandler } from './queries/get-alarm.query-handler';
import { AlarmCreatedEventHandler } from './event-handlers/alarm-created.event-handler';
import { AlarmAcknowledgedEventHandler } from './event-handlers/alarm-acknowledged.event-handler';
import { AcknowledgedAlarmCommandHandler } from './commands/acknowledged-alarm.command-handler';

@Module({
  controllers: [AlarmController],
  providers: [
    AlarmService, 
    AlarmFactory, 
    CreateAlarmCommandHandler, 
    GetAlarmsQueryHandler, 
    AlarmCreatedEventHandler,
    AlarmAcknowledgedEventHandler,
    AcknowledgedAlarmCommandHandler
    ],
})
export class AlarmModule {
  static withInfrastructure(infrastructureModule: Type | DynamicModule){
    return {
      module: AlarmModule,
      imports: [infrastructureModule]
    }
  }
}
