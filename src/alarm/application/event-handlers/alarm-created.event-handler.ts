import { Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { AlarmCreatedEvent } from "src/alarm/domain/events/alarm-created.event";
import { UpsertMaterializedAlarmRepository } from "../ports/upsert-materialized-alarm.repository";

@EventsHandler(AlarmCreatedEvent)
export class AlarmCreatedEventHandler
    implements IEventHandler<AlarmCreatedEvent>
    {
    private readonly logger = new Logger(AlarmCreatedEventHandler.name)
    constructor(
        private readonly upsertMaterializedAlarmRepository: UpsertMaterializedAlarmRepository,
    ){}
    async handle(event: AlarmCreatedEvent) {
        this.logger.log(`Alarm Created Event: ${JSON.stringify(event)}`)

        //In a production app we need to do this in atomic way "Transactional inbox/outbox pattern"

        await this.upsertMaterializedAlarmRepository.upsert({
            id: event.alarm.id,
            name: event.alarm.id,
            severity: event.alarm.severity.value,
            triggeredAt: event.alarm.triggeredAt,
            isAcknowledged: event.alarm.isAcknowledged,
            items: event.alarm.items
        })
    }
}