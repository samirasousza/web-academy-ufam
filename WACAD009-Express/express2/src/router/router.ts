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
        message: message
    })
})

router.get("/hb2", (req, res) => {
    res.render("hb2", {
        poweredByNodejs: true,
        name: "Express",
        type: "Framework",
        layout: "main2"
    })
})

router.get('/hb3', (req, res) => {
 const profes = [
  { nome: 'David Fernandes', sala: 1238 },
  { nome: 'Horácio Fernandes', sala: 1233 },
  { nome: 'Edleno Moura', sala: 1236 },
  { nome: 'Elaine Harada', sala: 1231 }
 ];
 res.render('hb3', { profes });
});

router.get("/hb4", (req, res) => {
  const technologies = [
 { name: 'Express', type: 'Framework', poweredByNodejs: true },
  { name: 'React', type: 'Library', poweredByNodejs: false },
  { name: 'Angular', type: 'Framework', poweredByNodejs: false },
  { name: 'Vue', type: 'Framework', poweredByNodejs: false },
  { name: 'NestJS', type: 'Framework', poweredByNodejs: true }  
 ];
  res.render('hb4', { technologies });
})

export default router;
