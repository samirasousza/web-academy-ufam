import { Product } from "../types/product";

export const mockProducts: Product[] = [
  {
    id: "notebook-3",
    images: [
      {
        title: "notebook-4",
        src: "https://ranekapi.origamid.dev/wp-content/uploads/2019/03/notebook-2.jpg",
      },
      {
        title: "smartwatch-3",
        src: "https://ranekapi.origamid.dev/wp-content/uploads/2019/03/smartwatch-2.jpg",
      },
    ],
    name: "Notebook",
    value: "2300",
    discount: 15,
    description: "descrição legal",
    sold: "false",
    user_id: "lobo@origamid.com",
  },
  {
    id: "smartphone-2",
    images: [
      {
        title: "smartphone-3",
        src: "https://ranekapi.origamid.dev/wp-content/uploads/2019/03/smartphone-2.jpg",
      },
      {
        title: "tablet-3",
        src: "https://ranekapi.origamid.dev/wp-content/uploads/2019/03/tablet-2.jpg",
      },
    ],
    name: "Smartphone",
    value: "2399",
    discount: 8,
    description: "descrição legal",
    sold: "false",
    user_id: "lobo@origamid.com",
  },
  {
    id: "camera",
    images: [
      {
        title: "camera-2",
        src: "https://ranekapi.origamid.dev/wp-content/uploads/2019/03/camera.jpg",
      },
    ],
    name: "Câmera",
    value: "2199",
    discount: 10,
    description: "descrição legal",
    sold: "false",
    user_id: "lobo@origamid.com",
  },
  {
    id: "smartwatch",
    images: [
      {
        title: "smartwatch-2",
        src: "https://ranekapi.origamid.dev/wp-content/uploads/2019/03/smartwatch-1.jpg",
      },
    ],
    name: "Smartwatch",
    value: "1199",
    discount: 8,
    description: "descrição legal",
    sold: "false",
    user_id: "lobo@origamid.com",
  },
  {
    id: "smartspeaker",
    images: [
      {
        title: "speaker",
        src: "https://ranekapi.origamid.dev/wp-content/uploads/2019/03/speaker.jpg",
      },
      {
        title: "tablet",
        src: "https://ranekapi.origamid.dev/wp-content/uploads/2019/03/tablet.jpg",
      },
    ],
    name: "Smartspeaker",
    value: "1499",
    discount: 10,
    description: "Esse é um speaker novo.",
    sold: "false",
    user_id: "maria@origamid.com",
  },
];
