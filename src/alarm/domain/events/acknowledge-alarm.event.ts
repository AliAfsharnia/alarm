import { AutoWiredEvent } from "src/shared/decorators/autowired-event.decorator";

@AutoWiredEvent
export class AlarmAcknowledgedEvent {
    constructor(public readonly alarmId: string) {}
}