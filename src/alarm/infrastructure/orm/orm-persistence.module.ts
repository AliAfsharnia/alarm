import { TypeOrmModule } from "@nestjs/typeorm";
import { AlarmEntity } from "./entities/alarm.entity";
import { Module } from "@nestjs/common";
import { AlarmItemsEntity } from "./entities/alarm-item.entity";
import { CreateAlarmRepository } from "src/alarm/application/ports/create-alarm.repository";
import { OrmCreateAlarmRepository } from "./repositories/create-alarm.repository";
import { FindAlarmsRepository } from "src/alarm/application/ports/find-alarm.repository";
import { OrmFindAlarmsRepository } from "./repositories/find-alarm.repository";
import { UpsertMaterializedAlarmRepository } from "src/alarm/application/ports/upsert-materialized-alarm.repository";
import { OrmUpsertMaterializedAlarmRepository } from "./repositories/upsert-materialized-alarm.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { MaterializedAlarmView, MaterializedAlarmViewSchema } from "./schemas/materialized-alarm-view.schema";

@Module({
    imports: [TypeOrmModule.forFeature([AlarmEntity, AlarmItemsEntity]),
                MongooseModule.forFeature([{
                    name: MaterializedAlarmView.name,
                    schema: MaterializedAlarmViewSchema
                }])],
    providers: [
        {
            provide: CreateAlarmRepository,
            useClass: OrmCreateAlarmRepository
        },
        {
            provide: FindAlarmsRepository,
            useClass: OrmFindAlarmsRepository
        },
        {
            provide: UpsertMaterializedAlarmRepository,
            useClass: OrmUpsertMaterializedAlarmRepository
        },
    ],
    exports: [CreateAlarmRepository, FindAlarmsRepository, UpsertMaterializedAlarmRepository]
})
export class OrmAlarmPersistenceModule {}