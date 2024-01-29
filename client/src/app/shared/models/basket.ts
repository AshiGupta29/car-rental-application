import * as cuid from 'cuid';

export interface BasketItem {
    id: number;
    carName: string;
    rentalPrice: number;
    model: number;
    imageUrl: string;
    carMaker: string;
}

export interface Basket {
    id: string;
    item: BasketItem;
    startDate: string; 
    returnDate: string;
    totalDays: number;
}

export class Basket implements Basket {
    id = cuid();
    item: BasketItem;
    startDate: string;
    totalDays: number;
    constructor() {
        this.item = { id: 0, carName: '', rentalPrice: 0, model: 0, imageUrl: '', carMaker: '' };
        this.startDate ="";
        this.returnDate ="";
        this.totalDays = 0;
    }
    
}

export interface BasketTotals {
    shipping: number;
    subtotal: number;
    total: number;
    totalDays: number;
}