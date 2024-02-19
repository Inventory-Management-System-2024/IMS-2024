interface ProductImage {
    url: string;
  }
  
  interface Product {
    productName: string;
    description: string;
    price: number;
    image: ProductImage[];
    category: string;
    stock: number;
    _id:number;
    quantity:number;
  }
  
  export default Product;