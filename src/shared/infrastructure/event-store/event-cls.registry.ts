import { Type } from "@nestjs/common";

export class EventsClsRegistry {
    private static readonly eventClsMap = new Map<string, any>();

    static add(eventCls: Type): void {
        this.eventClsMap.set(eventCls.name, eventCls)
    }

    static get(eventClsName: string): Type {

        const eventCls = this.eventClsMap.get(eventClsName)

        if(!eventCls) new Error( `${eventClsName} not registered!`)

        return eventCls;
    }
}