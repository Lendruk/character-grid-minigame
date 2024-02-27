export type Payment = {
  id: string;
  name: string;
  amount: number;
  code: string;
  grid: {
    sizeX: number;
    sizeY: number;
  }
}

export type PaymentWithCalculatedGridSize = Payment & {
  gridSize: number;
}