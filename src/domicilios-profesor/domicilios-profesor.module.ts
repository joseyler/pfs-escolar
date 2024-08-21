import { Module } from '@nestjs/common';
import { DomiciliosProfesorService } from './domicilios-profesor.service';
import { DomiciliosProfesorController } from './domicilios-profesor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomiciliosProfesor } from './entities/domicilios-profesor.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DomiciliosProfesor,Profesor,Ciudad])],
  controllers: [DomiciliosProfesorController],
  providers: [DomiciliosProfesorService],
})
export class DomiciliosProfesorModule {}
