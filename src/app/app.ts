import { Component, OnInit, signal, } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface Product {
  productId: number;
  name: string;
  price: number;
  stock: number;
  lastUpdated: Date;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  
  allProducts = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);

  ngOnInit() {
    this.getFilterdProducts();
    this.getAllProducts();
    this.postToMock();
  }

  
  async getFilterdProducts() {
    const responseGetFilterdProducts = await fetch('https://localhost:7181/api/Product/FIlteredProducts', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
      this.filteredProducts.set(await responseGetFilterdProducts.json());
  }

 async getAllProducts() {
  const responseGetAllProducts = await fetch('https://localhost:7181/api/Product/AllProducts', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.allProducts.set(await responseGetAllProducts.json())
 }    

 async postToMock() {
  const responsePostToMock = await fetch('https://localhost:7181/api/Product/SendProducts', {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },});
    console.log(await responsePostToMock.json());
 }
}

