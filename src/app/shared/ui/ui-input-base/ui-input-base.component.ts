import { Component, Input, OnChanges } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'ui-input-base',
  template: ``,
  standalone: true,
})
export class UIInputBaseComponent implements OnChanges, ControlValueAccessor {
  @Input() bottomSpace: number = 12;
  @Input() passedLabel = '';
  @Input() passedError = '';
  @Input() passedPlaceholder = '';
  @Input() isDisabled = false;
  @Input() isEdit = false;
  public isActive = false;
  public isEmpty = true;
  public inputControl: NgControl | null = null;
  public innerValue = '';

  constructor() {}

  public onChange: (value: string) => void = () => {};
  public onTouched: (value: string) => void = () => {};

  public writeValue(value: string): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
    this.isEmpty = !(this.inputControl as NgControl).control?.value;
  }

  public registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public change(value: string): void {
    this.innerValue = value;
    this.onChange(this.innerValue);
    this.onTouched(value);
  }

  ngOnChanges(): void {
    this.isEmpty = !(this.inputControl as NgControl).control?.value;
  }

  public onFocus(): void {
    this.isActive = true;
  }

  public onUnFocus(): void {
    this.isActive = false;
  }

  public onBlur(): void {
    this.isActive = !this.isEmpty;
  }

  public onInput(): void {
    this.isEmpty = !(this.inputControl as NgControl).control?.value;
  }
}
