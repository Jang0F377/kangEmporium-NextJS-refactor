export interface Product {
  _id: string;
  title: string;
  color: string;
  countInStock: number;
  price: number;
  mainImage: string;
  size: [
    {
      _key: string;
      description: string;
      name: string;
    }
  ];
  slug: {
    current: string;
  };
  body: Array;
  onSale: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
}
