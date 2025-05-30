import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAlarmsQuery } from "./get-alarm.query";
import { FindAlarmsRepository } from "../ports/find-alarm.repository";
import { AlarmReadModel } from "src/alarm/domain/read-models/alarm.read-model";

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler
    implements IQueryHandler<GetAlarmsQuery, AlarmReadModel[]>
{
    constructor(private readonly alarmRepository: FindAlarmsRepository){}
    async execute(query: GetAlarmsQuery): Promise<AlarmReadModel[]> {
        return this.alarmRepository.findAll();
    }
}