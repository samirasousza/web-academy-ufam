import type { Request, Response } from "express";
import { createUser, findUserByEmail } from "../user/user.service.js";
import { UserTypes } from "../userType/userType.constants.js";
import { authErrors } from "./auth.errors.js";
import type { LoginDto, SignUpDto } from "./auth.types.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { checkCredentials } from "./auth.service.js";


const signup = async (req: Request, res: Response) => {
    const data = req.body as SignUpDto;
    try {
        if (await findUserByEmail(data.email)) {
            return res.status(StatusCodes.CONFLICT).json({ msg: 'Usuário já cadastrado' });
        }
        const user = await createUser({ ...data, userTypeId: UserTypes.CLIENT })
        res.status(StatusCodes.CREATED).json(user)
    } catch (err) {
        authErrors(err, res);
    }
} 

const login = async (req: Request, res: Response) => {
    const data = req.body as LoginDto
    try {
        const user = await checkCredentials(data);
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Credenciais inválidas' });
        } else {
            req.session.userId = user.id;
            req.session.userTypeId = user.userTypeId;
            return res.status(StatusCodes.OK).json({ msg: 'Usuário autenticado' });
        }
    } catch (err) {
        authErrors(err, res);
    }
} 

const logout = async (req: Request, res: Response) => {
    req.session.destroy((err) => {
    if (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }

    return res
      .status(StatusCodes.OK)
      .json({ msg: 'Usuário deslogado' });
  });
} 

export default { signup, login, logout };