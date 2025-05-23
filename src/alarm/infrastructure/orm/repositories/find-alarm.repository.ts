import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { MaterializedAlarmView } from "../schemas/materialized-alarm-view.schema";
import { Model } from "mongoose";
import { AlarmReadModel } from "src/alarm/domain/read-models/alarm.read-model";
import { FindAlarmsRepository } from "src/alarm/application/ports/find-alarm.repository";

@Injectable()
export class OrmFindAlarmsRepository implements FindAlarmsRepository {
    constructor (
        @InjectModel(MaterializedAlarmView.name) private readonly alarmModel: Model<MaterializedAlarmView>
    ){}

    async findAll(): Promise<AlarmReadModel[]>{
        return await this.alarmModel.find();
    }
}