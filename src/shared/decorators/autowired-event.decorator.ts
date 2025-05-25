import { EventsClsRegistry } from "../infrastructure/event-store/event-cls.registry"

export const AutoWiredEvent: ClassDecorator = (target: any) => {
    EventsClsRegistry.add(target);
};