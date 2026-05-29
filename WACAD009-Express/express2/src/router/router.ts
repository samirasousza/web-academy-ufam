import { Router } from "express";
import { loremIpsum } from "lorem-ipsum";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/about", (req, res) => {
  res.send(`Oi, sou eu`);
});

router.get("/lorem/:paragrafos", (req, res) => {
  res.send(loremIpsum({ count: Number(req.params.paragrafos), units: "sentences" }));
});

router.get("/hb1", (req, res) => {
    const message = "Olá, você está aprendendo Express + HBS!"
    res.render("hb1", {
        layout: false,
        message: message
    })
})

router.get("/hb2", (req, res) => {
    res.render("hb2", {
        layout: false,
        poweredByNodejs: true,
        name: "Express",
        type: "Framework"
    })
})

router.get('/hb3', (req, res) => {
 const profes = [
 { nome: 'David Fernandes', sala: 1238 },
 { nome: 'Horácio Fernandes', sala: 1233 },
 { nome: 'Edleno Moura', sala: 1236 },
 { nome: 'Elaine Harada', sala: 1231 }
 ];
 res.render('hb3', { profes, layout: false });
});

export default router;
