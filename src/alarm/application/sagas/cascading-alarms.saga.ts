import { Injectable, Logger } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { bufferTime, filter, groupBy, map, mergeMap, Observable } from "rxjs";
import { AlarmCreatedEvent } from "src/alarm/domain/events/alarm-created.event";
import { NotifyFacilitySupervisorCommand } from "../commands/notify-facility-supervisor.command";

@Injectable()
export class CasCadingAlarmsSaga {
    private readonly logger = new Logger(CasCadingAlarmsSaga.name);

    @Saga()
    start = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(AlarmCreatedEvent),
            groupBy((event) => event.alarm.name),
            mergeMap((groupedEvents$) => groupedEvents$.pipe(bufferTime(5000, undefined, 3)),
        ),
        filter((events) => events.length >= 3),
        map((events) => {
            this.logger.debug("<><><> 3 alarms in 5 seconds");
            const facilityId = '12345';


            return new NotifyFacilitySupervisorCommand(
                facilityId, 
                events.map((event) => event.alarm.id),
            );
        }),
        );
    };
}