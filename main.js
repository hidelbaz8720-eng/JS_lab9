console.log("--------partie_1------------");
console.log("--------Exercice_1.1------------");

// Impure: modifie une variable externe
let compteur = 0;
function incrementerImpur() { compteur++; }

// Pure: prend une valeur, retourne une nouvelle valeur
const incrementerPur = x => x + 1;

// Tests
incrementerImpur();
console.log("compteur (impur):", compteur);
console.log("incrementerPur(5):", incrementerPur(5));

console.log("--------Exercice_1.2------------");
const ajouter = (arr, x) => [...arr, x];
const retirerIndex = (arr, i) => [...arr.slice(0, i), ...arr.slice(i + 1)];

const a = [1,2,3];
const b = ajouter(a, 4); // [1,2,3,4]
const c = retirerIndex(b, 1); // [1,3,4]
console.log({ a, b, c }); // a reste inchangé

console.log("--------partie_2------------");
const nums = [1, 2, 3, 4, 5, 6];
console.log("--------Exercice_2.1------------");
const carres = nums.map(n => n * n);
const pairs = nums.filter(n => n % 2 === 0);
const somme = nums.reduce((acc, n) => acc + n, 0);
console.log({ carres, pairs, somme });
console.log("--------Exercice_2.2------------");
const premierPair = nums.find(n => n % 2 === 0);
const aSup5 = nums.some(n => n > 5);
const tousPositifs = nums.every(n => n > 0);
console.log({ premierPair, aSup5, tousPositifs });
console.log("--------Exercice_2.3------------");
const mots = ["zèbre", "Arbre", "avion", "Banane"];
const triCI = [...mots].sort((a, b) => a.localeCompare(b, "fr", { sensitivity: "base" }));
console.log({ mots, triCI }); // `mots` original reste intact
console.log("--------partie_3------------");
console.log("--------Exercice_3.1------------");
const assoc = (obj, key, val) => ({ ...obj, [key]: val });
const dissoc = (obj, key) => { const { [key]: _, ...rest } = obj; return rest; };

const user = { id: 1, nom: "Lina", ville: "Paris" };
const user2 = assoc(user, "ville", "Lyon");
const user3 = dissoc(user2, "ville");
console.log({ user, user2, user3 });
console.log("--------Exercice_3.2------------");
const isNonEmptyStr = s => typeof s === "string" && s.trim().length > 0;
const isPositive = n => typeof n === "number" && n > 0;
console.log(isNonEmptyStr("  ok "), isPositive(3));
console.log("--------partie_4------------");
console.log("--------Exercice_4.1------------");
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

const trim = s => s.trim();
const upper = s => s.toUpperCase();
const exclam = s => s + "!";

const nettoyer = pipe(trim, upper, exclam);
console.log(nettoyer("  hello  ")); // HELLO!
console.log("--------Exercice_4.2------------");
const add = a => b => a + b; // curry à 2 niveaux
const inc = add(1);
console.log(inc(41)); // 42

console.log("--------partie_5------------");
console.log("--------Exercice_5.1------------");
const multiplierPar = facteur => x => x * facteur;
const fois3 = multiplierPar(3);
console.log(fois3(10)); // 30
console.log("--------Exercice_5.2------------");
const curry2 = fn => a => b => fn(a, b);
const somme2 = curry2((a, b) => a + b);
console.log(somme2(2)(5)); // 7


console.log("--------partie_6------------");
const produits = [
  { id: 1, nom: "Stylo", cat: "Bureau", prix: 1.2, stock: 50 },
  { id: 2, nom: "Cahier", cat: "Bureau", prix: 2.5, stock: 0 },
  { id: 3, nom: "Clavier", cat: "Informatique", prix: 29.9, stock: 10 },
  { id: 4, nom: "Souris", cat: "Informatique", prix: 19.9, stock: 5 },
];
console.log("--------Exercice_6.1------------");
const dispoTries = produits
  .filter(p => p.stock > 0)
  .sort((a, b) => a.cat.localeCompare(b.cat) || a.nom.localeCompare(b.nom));
console.log(dispoTries);
console.log("--------Exercice_6.2------------");
const rechercher = (items, q) => {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return items.filter(p => p.nom.toLowerCase().includes(s) || p.cat.toLowerCase().includes(s));
};
console.log(rechercher(produits, "info"));
console.log("--------Exercice_6.3------------");
const valeurStock = produits.reduce((acc, p) => acc + p.prix * p.stock, 0);
const parCategorie = produits.reduce((acc, p) => ((acc[p.cat] ||= []).push(p), acc), {});
console.log({ valeurStock, parCategorie });


console.log("--------partie_7------------");
console.log("--------Exercice_7.1------------");
function majStockImperatif(list, id, delta) {
  const res = [];
  for (let i = 0; i < list.length; i++) {
    const p = list[i];
    if (p.id === id) res.push({ ...p, stock: p.stock + delta }); else res.push(p);
  }
  return res;
}
const majStockFP = (list, id, delta) => list.map(p => p.id === id ? { ...p, stock: p.stock + delta } : p);

// test version impérative
const res1 = majStockImperatif(produits, 2, 3);
console.log("Imperatif :", res1);

// test version FP
const res2 = majStockFP(produits, 2, 3);
console.log("Fonctionnel :", res2);

console.log("--------partie_8------------");
console.log("--------Exercice_8.1------------");
const get = (obj, path, def) => path.split('.').reduce((acc, k) => acc?.[k], obj) ?? def;
const cfg = { api: { host: "localhost", port: 3000 } };
console.log(get(cfg, "api.port", 80)); // 3000
console.log(get(cfg, "db.port", 5432)); // 5432 (défaut)

console.log("--------Exercice_8.2------------");

const normalizeNom = s => s.trim().replace(/\s+/g, ' ').toLowerCase();
console.log(normalizeNom("  Jean  Dupont "), normalizeNom("  Jean  Dupont ")); // même résultat à chaque appel
