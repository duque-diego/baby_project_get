import { NgModule } from '@angular/core';
import { BabyInputOverlayComponent } from './baby-input-overlay/baby-input-overlay';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [BabyInputOverlayComponent],
	imports: [ IonicModule ],
	exports: [BabyInputOverlayComponent]
})
export class ComponentsModule {}
