import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "../local-storage.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  cartItems: any = this.localStorageService.getData('cart');

  ngOnInit(): void {
  }

  getTotal() {
    let total = 0;
    this.cartItems.forEach((item: any) => {
      total += item.specifications.price * item.quantity;
    });
    return total;
  }

  removeFromCart(cartItem: any) {
    let elementToRemove = this.cartItems.find((item: any) => item.id === cartItem.id);
    if(elementToRemove.quantity <=1){
      this.cartItems = this.cartItems.filter((item: any) => item.id !== cartItem.id);
      this.localStorageService.saveData('cart', this.cartItems);
    }else if (elementToRemove.quantity > 1){
      elementToRemove.quantity -= 1;
      this.localStorageService.saveData('cart', this.cartItems);
    }
  }

  addFromCart(cartItem: any) {
    let elementToAdd = this.cartItems.find((item: any) => item.id === cartItem.id);
    elementToAdd.quantity += 1;
    this.localStorageService.saveData('cart', this.cartItems);
  }
}
