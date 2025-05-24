import { Module } from "@nestjs/common";
import { OrmAlarmPersistenceModule } from "./orm/orm-persistence.module";
import { SharedModule } from "src/shared/shared.module";
import { inMemoryAlarmPersistenceModule } from "./in-memory/in-memory-persistence.module";

@Module({imports:[SharedModule], exports: [SharedModule]})
export class AlarmInfrastructureModule{
    static use(driver: 'orm' | 'in-memory'){
        const persistenceModule = driver === 'orm' 
        ? OrmAlarmPersistenceModule
        : inMemoryAlarmPersistenceModule

        return {
            module: AlarmInfrastructureModule,
            imports: [persistenceModule],
            exports: [persistenceModule]
        }
    }
}