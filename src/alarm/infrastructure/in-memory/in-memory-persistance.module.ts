import { Module } from "@nestjs/common";
import { InMemoryAlarmRepository } from "./repositories/alarm.repository";
import { CreateAlarmRepository } from "src/alarm/application/ports/create-alarm.repository";
import { UpsertMaterializedAlarmRepository } from "src/alarm/application/ports/upsert-materialized-alarm.repository";
import { FindAlarmsRepository } from "src/alarm/application/ports/find-alarm.repository";

@Module({
    imports: [],
    providers: [
        InMemoryAlarmRepository,
        {
            provide: CreateAlarmRepository,
            useClass: InMemoryAlarmRepository
        },
        {
            provide: FindAlarmsRepository,
            useExisting: InMemoryAlarmRepository
        },
        {
            provide: UpsertMaterializedAlarmRepository,
            useExisting: InMemoryAlarmRepository
        },
    ],
    exports: [CreateAlarmRepository, FindAlarmsRepository, UpsertMaterializedAlarmRepository],
})
export class inMemoryAlarmPersistenceModule {}