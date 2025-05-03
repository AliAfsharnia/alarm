import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlarmService } from './alarm.service';
import { AlarmController } from '../presenters/http/alarm.controller';
import { AlarmFactory } from '../domain/factories/alarm.factory';

@Module({
  controllers: [AlarmController],
  providers: [AlarmService, AlarmFactory],
})
export class AlarmModule {
  static withInfrastructure(infrastructureModule: Type | DynamicModule){
    return {
      module: AlarmModule,
      imports: [infrastructureModule]
    }
  }
}
