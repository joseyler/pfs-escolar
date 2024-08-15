import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Escuela } from './entities/escuela.entity';
import { IEscuela } from './model/escuela.interface';
import { EscuelaService } from './escuela.service';

@Controller('/escuelas')
export class EscuelaController {

    constructor(private escuelaService: EscuelaService) { }

    // delete
    @Delete('/:id')
    async deleteEscuela(@Param('id') id: number) {
        return this.escuelaService.deleteEscuela(id);
    }

    // Udate
    @Put('/:id')
    async updateEscuela(@Body() escuela: IEscuela, @Param('id') id: number): Promise<IEscuela> {
        return this.escuelaService.uptadeEscuela(escuela, id);
    }

    // create
    @Post('/')
    async createNewEscuela(@Body() escuela: IEscuela): Promise<IEscuela> {
        
        return this.escuelaService.createEscuela(escuela)
    }

    // getAll    
    @Get('/')
    async getAllEscuelas(): Promise<Escuela[]> {
        return this.escuelaService.getAll();
    }

    // getById
    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number): Promise<Escuela> {
        return this.escuelaService.getById(id);
    }
}
