import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { PaginitionComponent } from './paginition/paginition.component'

@NgModule({
    declarations: [PaginitionComponent],
    exports: [PaginitionComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],

})

export class ComponentModule {


}