import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { ICartItem, Product } from 'src/app/core/models';
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

  public selectedProduct: ICartItem;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private productsService: ProductsService,
    private toastController: ToastController,
    public navCtrl: NavController
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
  }

  public changeCalc(event: ICartItem) {
    this.selectedProduct = event;
    this.cd.detectChanges();
  }

  public async addToCart() {
    const toast = await this.toastController.create({
      message: 'Product successfully added',
      duration: 1500,
      position: 'top',
      color: 'success',
    });

    //ToDo Need to create a Cart service with storage and set CartItem there
    await toast.present();
  }

  public navToProductsPage() {
    this.navCtrl.navigateRoot('/products', { animated: true });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
