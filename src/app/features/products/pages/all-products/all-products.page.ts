import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from 'src/app/core/models';
import { ProductsService } from 'src/app/core/services';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.page.html',
  styleUrls: ['./all-products.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllProductsPage implements OnInit {
  public errorObject: HttpErrorResponse | null = null;
  public products$: Observable<Product[]>;

  constructor(
    private cd: ChangeDetectorRef,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.errorObject = null;
    this.productsService.getProducts();
    this.products$ = this.productsService.products$.pipe(
      catchError((err) => {
        this.errorObject = err;
        this.cd.detectChanges();
        return throwError(() => new Error(err.error.message));
      })
    );
  }
}
