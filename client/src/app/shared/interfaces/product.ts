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
  }
  
  export default Product;