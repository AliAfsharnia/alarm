import { Injectable } from "@nestjs/common";
import { AlarmEntity } from "../entities/alarm.entity";
import { Alarm } from "src/alarm/domain/alarm";
import { AlarmMapper } from "../mappers/alarm.mapper";
import { CreateAlarmRepository } from "src/alarm/application/ports/create-alarm.repository";
import { FindAlarmsRepository } from "src/alarm/application/ports/find-alarm.repository";
import { UpsertMaterializedAlarmRepository } from "src/alarm/application/ports/upsert-materialized-alarm.repository";
import { AlarmReadModel } from "src/alarm/domain/read-models/alarm.read-model";

@Injectable()
export class InMemoryAlarmRepository implements CreateAlarmRepository, FindAlarmsRepository, UpsertMaterializedAlarmRepository {
    private readonly alarms = new Map<string, AlarmEntity>
    private readonly materializedAlarmViews = new Map<string, AlarmReadModel>();
    constructor(){}

    async findAll():Promise<AlarmReadModel[]>{
        return Array.from(this.materializedAlarmViews.values())
    }

    async save(alarm: Alarm): Promise<Alarm> {
        const persistenceModel = AlarmMapper.toPersistence(alarm);
        this.alarms.set(persistenceModel.id, persistenceModel);

        const newEntity = await this.alarms.get(persistenceModel.id)
        return AlarmMapper.toDomain(newEntity);
    }

    async upsert(
        alarm: Pick<AlarmReadModel, 'id'> & Partial<AlarmReadModel>, 
    ): Promise<void>{
        if(this.materializedAlarmViews.has(alarm.id,)){
            this.materializedAlarmViews.set(alarm.id, {
                ...this.materializedAlarmViews.get(alarm.id),
                ...alarm
            });
            return;
        }
        this.materializedAlarmViews.set(alarm.id, alarm as AlarmReadModel)
    }
}