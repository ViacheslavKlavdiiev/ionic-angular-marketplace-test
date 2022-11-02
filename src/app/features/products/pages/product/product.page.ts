import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  public calcForm: FormGroup;

  private totalPrice;
  private totalQuantity;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private productsService: ProductsService
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
      this.totalQuantity = res.sku;
      this.initForm();
    });
  }

  private initForm() {
    this.calcForm = this.formBuilder.group({
      amount: [this.totalPrice, []],
      quantity: ['1', []],
    });

    this.amountFormControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        const quantity = Math.floor(res / this.totalPrice);
        if (this.quantityFormControl.value !== quantity) {
          this.quantityFormControl.setValue(quantity);
        }
      });

    this.quantityFormControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        const amount = this.totalPrice * res;
        if (this.amountFormControl.value !== amount) {
          this.amountFormControl.setValue(amount.toFixed(2));
        }
      });
  }

  get amountFormControl() {
    return this.calcForm.get('amount') as FormControl;
  }

  get quantityFormControl() {
    return this.calcForm.get('quantity') as FormControl;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
