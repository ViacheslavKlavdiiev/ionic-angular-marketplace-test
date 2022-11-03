import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/core/models';
import { ProductsService } from 'src/app/core/services';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPage implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public product$: Observable<Product>;
  public errorObject: HttpErrorResponse | null = null;

  private totalPrice: number;

  public amount: string;
  public quantity: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private productsService: ProductsService,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.errorObject = null;
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.product$ = this.productsService.getProduct(id).pipe(
      catchError((err) => {
        this.errorObject = err;
        this.cd.detectChanges();
        return throwError(() => new Error(err.error.message));
      })
    );

    this.product$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.totalPrice = res.price;
      this.amount = (this.totalPrice * this.quantity).toFixed(2);
    });
  }

  public changeAmount(e) {
    const quantity = Math.floor(+e.target.value / this.totalPrice);
    if (this.quantity !== quantity) {
      this.quantity = quantity;
    }
  }

  public changeQuantity(e) {
    let amount = e.target.value * this.totalPrice;
    const amountFixed = amount.toFixed(2);
    if (this.amount !== amountFixed) {
      this.amount = amountFixed;
    }
  }

  public setAmount(value: number) {
    this.amount = value.toFixed(2);
    this.quantity = Math.floor(value / this.totalPrice);
  }

  public setQuantity(value: number) {
    this.quantity = value;
    this.amount = (value * this.totalPrice).toFixed(2);
  }

  public async addToCart() {
    const toast = await this.toastController.create({
      message: 'Product successfully added',
      duration: 1500,
      position: 'top',
      color: 'success',
    });

    await toast.present();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
