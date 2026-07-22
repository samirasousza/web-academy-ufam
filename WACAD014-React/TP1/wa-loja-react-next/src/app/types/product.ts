interface imageProduct {
  title: string;
  src: string;
}

export interface Product {
  id: string;
  images: imageProduct[];
  name: string;
  value: string;
  discount: number;
  description: string;
  sold: string;
  user_id: string;
  // onAdd: () => void;
}
