import { Controller, Body, Param, Get, Post, Delete } from '@nestjs/common';
import { RoleService } from './roles.service';

@Controller('role')
export class RoleController {
    constructor(
        private readonly roleService: RoleService,
    ){}

    @Post()
    create(@Body() name) {
        return this.roleService.create(name);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.roleService.delete(id);
    }

    @Get()
    getAll() {
        return this.roleService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.roleService.getOne(id);
    }

    
    
}
