import { NgModule } from '@angular/core';
import { MyFilterPipe } from './my-filter/my-filter';
import { SortPipe } from './sort/sort';
@NgModule({
	declarations: [MyFilterPipe,
    SortPipe],
	imports: [],
	exports: [MyFilterPipe,
    SortPipe]
})
export class PipesModule {}
