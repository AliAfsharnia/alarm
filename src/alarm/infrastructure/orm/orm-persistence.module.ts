import { TypeOrmModule } from "@nestjs/typeorm";
import { AlarmEntity } from "./entities/alarm.entity";
import { AlarmRepository } from "src/alarm/application/ports/alarm.repository";
import { ormAlarmRepository } from "./repositories/alarm.repository";
import { Module } from "@nestjs/common";

@Module({
    imports: [TypeOrmModule.forFeature([AlarmEntity])],
    providers: [
        {
        provide: AlarmRepository,
        useClass: ormAlarmRepository
        },
    ],
    exports: [AlarmRepository]
})
export class OrmAlarmPersistenceModule {}