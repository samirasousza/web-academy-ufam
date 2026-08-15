import { Router } from "express";
import purchaseItemController from "./purchaseItem.controller.js";
import isAuth from "../../middlewares/isAuth.js";

const router = Router();

router.use(isAuth);

/**
 * @openapi
 * /cart:
 *   get:
 *     summary: Lista os itens do carrinho de compra (sessão do usuário logado)
 *     tags: [Cart]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Itens do carrinho
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartItem'
 *       401:
 *         description: Usuário não autenticado
 */
router.get("/", purchaseItemController.index);

/**
 * @openapi
 * /cart:
 *   post:
 *     summary: Adiciona um produto ao carrinho (soma a quantidade se já existir)
 *     tags: [Cart]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddCartItem'
 *     responses:
 *       201:
 *         description: Item adicionado, retorna o carrinho atualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartItem'
 *       400:
 *         description: Requisição inválida (productId ou quantity ausentes)
 *       401:
 *         description: Usuário não autenticado
 *       404:
 *         description: Produto não encontrado
 */
router.post("/", purchaseItemController.addPurchaseItem);

/**
 * @openapi
 * /cart/{productId}:
 *   put:
 *     summary: Atualiza a quantidade de um item do carrinho
 *     tags: [Cart]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCartItem'
 *     responses:
 *       200:
 *         description: Carrinho atualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartItem'
 *       400:
 *         description: Requisição inválida
 *       401:
 *         description: Usuário não autenticado
 *       404:
 *         description: Item não está no carrinho
 */
router.put("/:productId", purchaseItemController.update);

/**
 * @openapi
 * /cart/{productId}:
 *   delete:
 *     summary: Remove um item do carrinho
 *     tags: [Cart]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Carrinho atualizado (sem o item removido)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartItem'
 *       400:
 *         description: Requisição inválida
 *       401:
 *         description: Usuário não autenticado
 */
router.delete("/:productId", purchaseItemController.removePurchaseItem);

export default router;
