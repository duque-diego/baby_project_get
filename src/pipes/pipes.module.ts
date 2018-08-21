import { NgModule } from "@angular/core";
import { SasMaskPipe } from "./sas-mask/sas-mask";

@NgModule({
   declarations: [SasMaskPipe],
   exports: [SasMaskPipe],
   imports: [],
})
export class PipesModule {
   public static forRoot() {
       return {
           ngModule: PipesModule,
           providers: [],
       };
   }
}
