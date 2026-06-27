import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

const SUBJECTS = ["romance", "mystery", "science"];

async function fetchBooks(subject: string): Promise<any[]> {
  const res = await fetch(`https://openlibrary.org/subjects/${subject}.json?limit=5`);
  const data = await res.json() as { works: any[] };
  return data.works;
}

async function main() {
  for (const subject of SUBJECTS) {
    const works = await fetchBooks(subject);

    for (const work of works) {
      const autoresCriados = await Promise.all(
        (work.authors ?? []).map((a: { key: string; name: string }) =>
          prisma.autor.upsert({
            where: { id: parseInt(a.key.replace("/authors/", "")) || 0 },
            update: {},
            create: {
              nome: a.name,
              data_nascimento: new Date("1900-01-01"),
              pais_nascimento: "Desconhecido",
              nota_biografica: `Autor de ${work.title}`,
            },
          })
        )
      );

      const codigo = work.key.replace("/works/", "");
      const livro = await prisma.livro.upsert({
        where: { codigo },
        update: {},
        create: {
          codigo,
          nome: work.title,
          idioma: "Inglês",
          ano: new Date(`${work.first_publish_year ?? 2000}-01-01`),
          autores: { connect: autoresCriados.map((a) => ({ id: a.id })) },
        },
      });

      await prisma.edicao.upsert({
        where: { isbn: `ISBN-${codigo}` },
        update: {},
        create: {
          isbn: `ISBN-${codigo}`,
          preco: 29.9,
          ano: work.first_publish_year ?? 2000,
          num_paginas: 200,
          qtd_estoque: 5,
          livro_codigo: livro.codigo,
        },
      });
    }
  }

  console.log("Seed concluído!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());