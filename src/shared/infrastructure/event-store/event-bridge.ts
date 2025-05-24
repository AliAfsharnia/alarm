import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EVENT_STORE_CONNECTION } from "src/core/core.constance";
import { EventDocument } from "./schema/event.schema";
import { ChangeStream, ChangeStreamInsertDocument } from "mongodb";
import { EventDeserializer } from "./deserializers/event-deserializer";

@Injectable()
export class EventBridge 
    implements OnApplicationBootstrap, OnApplicationShutdown {
    private changeStream: ChangeStream;

    constructor(
        @InjectModel(Event.name, EVENT_STORE_CONNECTION)
        private readonly eventStore: Model<Event>,
        private readonly eventBus: EventBus,
        private readonly eventDeserializer: EventDeserializer
    ){}

    onApplicationBootstrap() {
        this.changeStream = this.eventStore.watch()
        .on('change', (change :ChangeStreamInsertDocument<EventDocument>) => {
            if(change.operationType === 'insert') {
                this.handleEventStoreChange(change);
            }
        });
    }

    onApplicationShutdown() {
        return this.changeStream.close();
    }

    handleEventStoreChange(change: ChangeStreamInsertDocument<EventDocument>){
        const insertedEvent = change.fullDocument;
        console.debug(insertedEvent);
        const eventInstance = this.eventDeserializer.deserializer(insertedEvent);
        console.debug(eventInstance);
        this.eventBus.subject$.next(eventInstance.data);
    }
}