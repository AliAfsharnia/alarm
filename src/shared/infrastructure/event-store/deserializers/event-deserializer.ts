import { Injectable, Type } from "@nestjs/common";
import { AlarmCreatedEvent } from "src/alarm/domain/events/alarm-created.event";
import { SerializableEvent } from "src/shared/domain/interfaces/serializable-event";
import { Event } from "../schema/event.schema";

@Injectable()
export class EventDeserializer {
    deserializer<T>(event: Event): SerializableEvent<T> {
        const eventCls = this.getEventClassByType(event.type);
        return {
            ...event,
            data: this.instantiateSerializedEvent(eventCls, event.data),
        };
    }

    getEventClassByType(type: string) {
        switch (type) {
            case AlarmCreatedEvent.name:
                return AlarmCreatedEvent;
        }
    }

    instantiateSerializedEvent<T extends Type>(
        eventCls: T,
        data: Record<string, any>,
    ){
        return Object.assign(Object.create(eventCls.prototype), data);
    }
}