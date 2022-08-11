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
  comments: Array<Comment>;
}

export interface Comment {
  approved: boolean;
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  comment: string;
  name: string;
  rating: number;
  product: {
    _ref: string;
    _type: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}
