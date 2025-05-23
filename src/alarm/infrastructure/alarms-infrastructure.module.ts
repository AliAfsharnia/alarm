import { Module } from "@nestjs/common";
import { OrmAlarmPersistenceModule } from "./orm/orm-persistence.module";
import { inMemoryAlarmPersistenceModule } from "./in-memory/in-memory-persistance.module";
import { SharedModule } from "src/shared/shared.module";

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