import { Router } from "express";
import purchaseController from "./purchase.controller.js";
import isAuth from "../../middlewares/isAuth.js";

const router = Router();

router.use(isAuth);

/**
 * @openapi
 * /purchases:
 *   post:
 *     summary: Finaliza a compra (checkout), salvando os itens do carrinho no banco
 *     description: Lê os itens da sessão, valida estoque, cria a Purchase com seus PurchaseItems em uma transação, decrementa o estoque dos produtos e limpa o carrinho.
 *     tags: [Purchases]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       201:
 *         description: Compra concluída
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Purchase'
 *       400:
 *         description: Carrinho vazio
 *       401:
 *         description: Usuário não autenticado
 *       404:
 *         description: Algum produto do carrinho não foi encontrado
 *       409:
 *         description: Estoque insuficiente para algum produto
 */
router.post("/", purchaseController.create);

/**
 * @openapi
 * /purchases:
 *   get:
 *     summary: Lista o histórico de compras do usuário logado
 *     tags: [Purchases]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de compras
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Purchase'
 *       401:
 *         description: Usuário não autenticado
 */
router.get("/", purchaseController.index);

/**
 * @openapi
 * /purchases/{id}:
 *   get:
 *     summary: Busca uma compra pelo id
 *     tags: [Purchases]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Compra encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Purchase'
 *       400:
 *         description: Id inválido
 *       401:
 *         description: Usuário não autenticado
 *       404:
 *         description: Compra não encontrada
 */
router.get("/:id", purchaseController.read);

export default router;
