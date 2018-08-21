import { Pipe, PipeTransform } from "@angular/core";
import { SasMaskHelper } from "../../helpers/sas-mask-helper";

@Pipe({
  name: "sasMask",
})
export class SasMaskPipe implements PipeTransform {
  public transform(value: any, ...args) {
    return SasMaskHelper.formatMask(args[0], value);
  }
}
