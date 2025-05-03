import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AlarmRepository } from "src/alarm/application/ports/alarm.repository";
import { AlarmEntity } from "../entities/alarm.entity";
import { Repository } from "typeorm";
import { Alarm } from "src/alarm/domain/alarm";
import { AlarmMapper } from "../mappers/alarm.mapper";

@Injectable()
export class ormAlarmRepository implements AlarmRepository {
    constructor(@InjectRepository(AlarmEntity) private readonly alarmRepository: Repository<AlarmEntity>){}

    async findAll():Promise<Alarm[]>{
        const entities = await this.alarmRepository.find()

        return entities.map((item) => AlarmMapper.toDomain(item))
    }

    async save(alarm: Alarm): Promise<Alarm> {
        const persistenceModel = AlarmMapper.toPersistence(alarm);
        const newEntity = await this.alarmRepository.save(persistenceModel);
        return AlarmMapper.toDomain(newEntity);
    }
}