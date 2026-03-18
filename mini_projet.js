const users = [
  { id: 1, prenom: "Lina", nom: "Durand", actif: true, age: 22 },
  { id: 2, prenom: "Amar", nom: "Kaci", actif: false, age: 19 },
  { id: 3, prenom: "Zoé", nom: "Martin", actif: true, age: 27 },
  { id: 4, prenom: "Ali", nom: "Ben", actif: true, age: 17 },
];


const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const byNomPrenom = (a, b) =>
  a.nom.localeCompare(b.nom) || a.prenom.localeCompare(b.prenom);

const isActifAdulte = u => u.actif && u.age >= 18;

const formatUser = u => `${u.nom} ${u.prenom} (${u.age})`;

const moyenne = arr =>
  arr.reduce((acc, u) => acc + u.age, 0) / arr.length || 0;

const tranche = age =>
  age < 20 ? "<20" : age < 25 ? "20-24" : "25+";

const groupBy = (arr, keyFn) =>
  arr.reduce((acc, x) => {
    const key = keyFn(x);
    if (!acc[key]) acc[key] = [];
    acc[key].push(x);
    return acc;
  }, {});


const actifsAdultes = pipe(
  arr => arr.filter(isActifAdulte),
  arr => [...arr].sort(byNomPrenom)
)(users);

const etiquettes = actifsAdultes.map(formatUser);
const ageMoyen = moyenne(actifsAdultes);
const groupes = groupBy(actifsAdultes, u => tranche(u.age));

console.log("Actifs adultes :", actifsAdultes);
console.log("Étiquettes :", etiquettes);
console.log("Âge moyen :", ageMoyen);
console.log("Groupes :", groupes);
