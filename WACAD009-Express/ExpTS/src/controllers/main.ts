import type { Request, Response } from 'express';

const index = (req: Request, res: Response) => {
    res.send("Welcome do Web Academy!")
}

const hb2 = (req: Request, res: Response) => {
    res.render("main/hb2", {
        nome: "Express",
        tipo: "Framework",
        poweredByNodejs: true,
        layout: false
    })
}

export default { index, hb2 }