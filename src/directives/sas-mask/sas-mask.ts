import { Directive, ElementRef, HostListener, Input, Renderer } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { SasMaskHelper } from "../../helpers/sas-mask-helper";

@Directive({
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: SasMaskDirective,
  }],
  selector: "[sasMask]",
})
export class SasMaskDirective implements ControlValueAccessor {

  @Input("sasMask") public sasMask: string;

  constructor(private renderer: Renderer, private elementRef: ElementRef) {
  }

  @HostListener("keydown", ["$event"])
  public inputKeydown(event: any): void {
    if (event.key.length > 1 || event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    const value = this.returnValue(event.target.value + event.key);
    if (value === event.target.value) {
      event.preventDefault();
    }
  }

  @HostListener("keyup", ["$event"])
  public inputKeyup(event: any): void {
    this.handleTextInput(event);
  }

  @HostListener("textInput", ["$event"])
  public textInput(event: any): void {
    this.handleTextInput(event);
  }

  @HostListener("paste", ["$event"])
  public onPaste(event: any): void {
    const pasteValue = event.clipboardData.getData("text/plain");
    const value = this.returnValue(pasteValue);
    event.preventDefault();

    if (document.queryCommandSupported("insertText")) {
      document.execCommand("insertText", false, value);
    } else {
      document.execCommand("paste", false, value);
    }
  }

  @HostListener("ionBlur", ["$event"])
  public inputOnblur(event: any): void {
    const value = this.returnValue(event.value);
    this.writeValue(value);
    event.value = value;
  }

  @HostListener("ionFocus", ["$event"])
  public inputFocus(event: any): void {
    const value = this.returnValue(event.value);
    this.writeValue(value);
    event.value = value;
  }

  public handleTextInput(event: any) {
    const value = this.returnValue(event.target.value);
    this.writeValue(value);

    const selectionStart = event.target.selectionStart;
    const sameValue = event.target.value === value;

    if (!sameValue) {
      event.target.value = value;
    }

    if (!sameValue && value && event.target.value && event.target.value.length > selectionStart + 1) {
      event.target.selectionStart = selectionStart;
      event.target.selectionEnd = selectionStart;
    }
  }

  public writeValue(fn: any): void {
    this.renderer.setElementProperty(this.elementRef.nativeElement, "value", fn);
  }

  public registerOnChange(fn: any): void {
    return;
  }

  public registerOnTouched(fn: any): void {
    return;
  }

  public returnValue(value) {
    return SasMaskHelper.formatMask(this.sasMask, value);
  }
}
