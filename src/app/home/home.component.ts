import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  products = [
    {
      id: 1,
      name: "iPhone 13 Pro",
      specifications: {
        color: "Black",
        weight: "250g",
        storage: "256GB",
        price: 1000
      },
      picture: "https://img.phonandroid.com/2021/06/iphone-13-pro-noir.jpg",
    },
    {
      id: 2,
      name: "Airpods",
      specifications: {
        color: "white",
        weight: "50g",
        storage: "N/A",
        price: 200
      },
      picture: "https://images.frandroid.com/wp-content/uploads/2021/10/airpods-3-meilleur-prix-2021.jpg"
    },
    {
      id: 3,
      name: "Samsung S22",
      specifications: {
        color: "black",
        weight: "250g",
        storage: "512GB",
        price: 900
      },
      picture: "https://images.samsung.com/levant/smartphones/galaxy-s22/buy/S22_S22plus_ProductKV_Black_MO.jpg"
    },
    {
      id: 4,
      name: "Samsung Note10",
      specifications: {
        color: "black",
        weight: "250g",
        storage: "256GB",
        price: 950
      },
      picture: "https://img.20mn.fr/3oI1yenQR7qTwedgI2kbEQ/768x492_profitez-samsung-galaxy-note-10-promotion-chez-rue-commerce"
    },
    {
      id: 5,
      name: "Phone 14",
      specifications: {
        color: "white",
        weight: "250g",
        storage: "256GB",
        price: 1300
      },
      picture: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-deeppurple?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1663703841896"
    }
  ];
  ProductName: any;
  cart: any ;


  onMouseOver(productId: any) : void {
    this.ProductName = this.products.find(product => product.id == productId)?.name;
  }

  onMouseOut() : void {
    this.ProductName = null;
  }

  addToCart(productId: any) : void {
    this.cart = this.localStorageService.getData("cart");
    let productSelected = this.products.find(product => product.id == productId);

    let productToAdd = {
      id: productSelected?.id,
      name: productSelected?.name,
      specifications: productSelected?.specifications,
      picture: productSelected?.picture,
      quantity: 1
    }

    if (this.cart != []) {
      if(productSelected?.id == this.cart.find((product:any) => product.id == productId)?.id) {
        this.cart.find((product:any) => product.id == productId).quantity++;
        this.localStorageService.saveData("cart", this.cart);
        console.log(this.cart);
      }else
      {
        let newCart = [...this.cart, productToAdd];
        this.localStorageService.saveData("cart", newCart);
        console.log(this.cart);
      }
    }else if (this.cart == []) {
      this.localStorageService.saveData("cart", [productToAdd]);
      console.log(this.cart);
    }
  }

  ngOnInit(): void {
    // this.localStorageService.clearData();
  }


}
