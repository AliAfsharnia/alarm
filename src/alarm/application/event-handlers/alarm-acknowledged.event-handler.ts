import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { AlarmAcknowledgedEvent } from "src/alarm/domain/events/acknowledge-alarm.event";
import { SerializedEventPayload } from "src/shared/domain/interfaces/serializable-event";
import { UpsertMaterializedAlarmRepository } from "../ports/upsert-materialized-alarm.repository";
import { Logger } from "@nestjs/common";

@EventsHandler(AlarmAcknowledgedEvent)
export class AlarmAcknowledgedEventHandler
    implements IEventHandler<SerializedEventPayload<AlarmAcknowledgedEvent>>
{
    private readonly logger = new Logger(AlarmAcknowledgedEventHandler.name);

    constructor(
        private readonly upsertMaterialAlarmRepository: UpsertMaterializedAlarmRepository
    ){}

    async handle(event:SerializedEventPayload<AlarmAcknowledgedEvent>) {
        this.logger.log(`Alarm acknowledged event: ${JSON.stringify(event)}`)


        await this.upsertMaterialAlarmRepository.upsert({
            id: event.alarmId,
            isAcknowledged: true,
        })
    }
}