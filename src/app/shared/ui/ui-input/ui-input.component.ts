import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, Optional, Self } from '@angular/core';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { UIInputBaseComponent } from '../ui-input-base/ui-input-base.component';

type inputType = 'text' | 'number';

@Component({
  selector: 'ui-input',
  templateUrl: './ui-input.component.html',
  styleUrls: ['./ui-input.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class UIInputComponent
  extends UIInputBaseComponent
  implements OnChanges
{
  constructor(@Self() @Optional() private control: NgControl) {
    super();
    this.control.valueAccessor = this;
    this.inputControl = this.control;
  }
  @Input() type: inputType = 'text';

  override ngOnChanges(): void {
    super.ngOnChanges();
  }
}
