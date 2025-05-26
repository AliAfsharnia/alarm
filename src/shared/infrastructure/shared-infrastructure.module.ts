import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { EventSchema } from "./event-store/schema/event.schema";
import { EVENT_STORE_CONNECTION } from "src/core/core.constance";
import { EventSerializer } from "./event-store/serializers/event-serializer";
import { EventStorePublisher } from "./event-store/publishers/event-store.publisher";
import { MongoEventStore } from "./event-store/mongo-event-store";
import { EventBridge } from "./event-store/event-bridge";
import { EventDeserializer } from "./event-store/deserializers/event-deserializer";
import { EventStore } from "../application/ports/event-store";

@Module({
    imports: [
        MongooseModule.forFeature(
            [{ name: Event.name, schema: EventSchema }],
            EVENT_STORE_CONNECTION,
        ),
    ],
    providers: [
        EventSerializer, 
        EventStorePublisher, 
        MongoEventStore, 
        EventBridge, 
        EventDeserializer,
        {
            provide: EventStore,
            useClass: MongoEventStore
        }
    ],
    exports: [EventStore]
})
export class SharedInfraStructureModule{}