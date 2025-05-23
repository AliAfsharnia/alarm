import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-option.interface';
import { EVENT_STORE_CONNECTION } from './core.constance';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27018/vf-event-store', {
            connectionName: EVENT_STORE_CONNECTION,
            directConnection: true,
            replicaSet: 'vf-event-store-repl-set'
        })
    ]
})
export class CoreModule {
    static forRoot(options: ApplicationBootstrapOptions){
        const imports = 
        options.driver === 'orm'
        ? [
            // we most user env instead
            // and "synchronize = true" isn't technically good
            TypeOrmModule.forRoot({
                database: 'alarm',
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                password: '123',
                username: 'postgres',
                autoLoadEntities: true,
                synchronize: true
            }),
            MongooseModule.forRoot('mongodb://localhost:27017/alarms')
        ]
        : [];

        return {
            module: CoreModule,
            imports
        };
    }
}
