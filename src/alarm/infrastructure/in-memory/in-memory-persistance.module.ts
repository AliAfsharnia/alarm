import { AlarmRepository } from "src/alarm/application/ports/alarm.repository";
import { Module } from "@nestjs/common";
import { InMemoryAlarmRepository } from "./repositories/alarm.repository";

@Module({
    imports: [],
    providers: [
        {
        provide: AlarmRepository,
        useClass: InMemoryAlarmRepository
        },
    ],
    exports: [AlarmRepository]
})
export class inMemoryAlarmPersistenceModule {}