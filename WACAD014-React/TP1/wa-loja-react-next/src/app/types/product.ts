interface imageProduct {
  titulo: string;
  src: string;
}

export interface Product {
  id: string;
  fotos: imageProduct[];
  nome: string;
  preco: string;
  descricao: string;
  vendido: string;
  usuario_id: string;
  // onAdd: () => void;
}
