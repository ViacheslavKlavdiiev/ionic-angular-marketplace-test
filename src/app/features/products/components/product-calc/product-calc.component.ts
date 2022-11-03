import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ICartItem } from 'src/app/core/models';

@Component({
  selector: 'app-product-calc',
  templateUrl: './product-calc.component.html',
  styleUrls: ['./product-calc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCalcComponent implements OnInit {
  @Input() productPrice: number;
  @Output() changeCalc = new EventEmitter<ICartItem>();
  public amount: number;
  public quantity: number = 1;

  constructor() {}

  ngOnInit(): void {
    this.amount = +(this.productPrice * this.quantity).toFixed(2);
    this.emitChange();
  }

  public changeAmount(e) {
    const value = +e.target.value;
    this.setAmount(value);
  }

  public changeQuantity(e) {
    const value = +e.target.value;
    this.setQuantity(value);
  }

  public setAmount(value: number) {
    this.amount = +value.toFixed(2);
    this.quantity = Math.floor(value / this.productPrice);
    this.emitChange();
  }

  public setQuantity(value: number) {
    this.quantity = value;
    this.amount = +(value * this.productPrice).toFixed(2);
    this.emitChange();
  }

  private emitChange() {
    this.changeCalc.emit({
      amount: this.amount,
      quantity: this.quantity,
    });
  }
}
