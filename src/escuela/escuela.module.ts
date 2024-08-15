import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EscuelaService } from './escuela.service';
import { EscuelaController } from './escuela.controller';
import { Escuela } from './entities/escuela.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Escuela
        ])],
    providers: [EscuelaService],
    controllers: [EscuelaController]
})
export class EscuelaModule { }
