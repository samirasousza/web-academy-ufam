export interface Techs {
    name: string,
    type: number,
    poweredByNodejs: boolean
}

function listTechs(profs: Techs[]) {
    const list = profs.map((p) => `<li>${p.name} - ${p.type}</li>`);

    console.log(list);
    return `<ul>${list.join("")}</ul>`;
}

export default { listTechs }