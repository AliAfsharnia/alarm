import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { EventSchema } from "./event-store/schema/event.schema";
import { EVENT_STORE_CONNECTION } from "src/core/core.constance";
import { EventSerializer } from "./event-store/serializers/event-serializer";
import { EventStorePublishe } from "./event-store/publishers/event-store.publisher";
import { MongoEventStore } from "./event-store/mongo-event-store";

@Module({
    imports: [
        MongooseModule.forFeature(
            [{ name: Event.name, schema: EventSchema }],
            EVENT_STORE_CONNECTION,
        ),
    ],
    providers: [EventSerializer, EventStorePublishe, MongoEventStore],
})
export class SharedInfraStructureModule{}