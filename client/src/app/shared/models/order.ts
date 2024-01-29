export interface OrderToCreate {
    basketId: string; 
}

export interface Order {
  id: number
  buyerEmail: string
  orderdate: string
  total: number
  startDate: string
  returnDate: string
  isReturned: number
  carId: number
  carName: string
  imageUrl: string
  model: number
  rentalPrice: number
}