import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-option.interface';

@Module({})
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
            })
        ]
        : [];

        return {
            module: CoreModule,
            imports
        };
    }
}
