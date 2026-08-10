const {
  firstName,
  checkStockAvailability,
  calculateTotalPrice,
} = require("../../utils/validacoes.js");

describe("First name", () => {
  it("Deve retornar o primeiro nome quando houver nome completo", () => {
    const fullName = "Samira Souza";
    const res = firstName(fullName);

    expect(res).toBe("Samira");
  });

  it("Deve retornar o próprio nome quando não houver espaços", () => {
    const fullName = "Samira";
    const res = firstName(fullName);

    expect(res).toBe("Samira");
  });

  it("Deve retornar uma string vazia quando o nome completo for uma string vazia", () => {
    const fullName = "";
    const res = firstName(fullName);
    expect(res).toBe("");
  });

  it("Deve retornar o primeiro nome quando houver espaços no início e no final do nome completo", () => {
    const fullName = "   Samira Souza   ";
    const res = firstName(fullName);
    expect(res).toBe("Samira");
  });

  it("Deve retornar string vazia quando o parâmetro não for string", () => {
    expect(firstName(null)).toBe("");
    expect(firstName(123)).toBe("");
  });
});

describe("Check Stock Availability", () => {
  it("Deve retornar true quando houver quantidade suficiente em estoque", () => {
    const productType = "laptop";
    const quantity = 5;
    const res = checkStockAvailability(productType, quantity);
    expect(res).toBe(true);
  });

  it("Deve retornar false quando a quantidade desejada do tipo de produto especificado for maior que o estoque", () => {
    const productType = "laptop";
    const quantity = 15;
    const res = checkStockAvailability(productType, quantity);
    expect(res).toBe(false);
  });

  it("Deve retornar false quando o tipo de produto especificado for maior que o estoque", () => {
    const productType = "book";
    const quantity = 1;
    const res = checkStockAvailability(productType, quantity);
    expect(res).toBe(false);
  });

  it("Deve retornar false quando o tipo de produto especificado não estiver no estoque", () => {
    const productType = "nonexistentProduct";
    const quantity = 1;
    const res = checkStockAvailability(productType, quantity);
    expect(res).toBe(false);
  });

  it("Deve retornar true quando pedir quantidade exatamente igual ao estoque limite", () => {
    expect(checkStockAvailability("laptop", 10)).toBe(true);
  });

  it("Deve retornar true ao solicitar quantidade 0 de um produto existente com estoque 0", () => {
    expect(checkStockAvailability("book", 0)).toBe(true);
  });
});

describe("Calculate Total Price", () => {
  it("Deve retornar o preço total correto para um array de produtos", () => {
    const products = [
      { name: "Product 1", price: 10, quantity: 2 },
      { name: "Product 2", price: 15, quantity: 2 },
      { name: "Product 3", price: 20, quantity: 1 },
    ];
    const res = calculateTotalPrice(products);
    expect(res).toBe(70);
  });

  it("Deve retornar 0 quando o array de produtos estiver vazio", () => {
    const products = [];
    const res = calculateTotalPrice(products);
    expect(res).toBe(0);
  });

  it("deve retornar 0 quando o array de produtos contiver apenas produtos com quantidade 0", () => {
    const products = [
      { name: "Batata", price: 5, quantity: 0 },
      { name: "Cenoura", price: 3, quantity: 0 },
      { name: "Tomate", price: 2, quantity: 0 },
    ];
    const res = calculateTotalPrice(products);
    expect(res).toBe(0);
  });

  it("Deve retornar 0 quando o argumento fornecido não for um array", () => {
    expect(calculateTotalPrice(null)).toBe(0);
    expect(calculateTotalPrice(undefined)).toBe(0);
  });
});
