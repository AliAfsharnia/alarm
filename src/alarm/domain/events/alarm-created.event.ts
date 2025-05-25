import { AutoWiredEvent } from "src/shared/decorators/autowired-event.decorator";
import { Alarm } from "../alarm";

@AutoWiredEvent
export class AlarmCreatedEvent {
    constructor(public readonly alarm: Alarm){}
}