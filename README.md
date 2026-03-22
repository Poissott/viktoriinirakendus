# Viktoriinirakendus

Reactil põhinev viktoriinirakendus, kus kasutaja saab vastata küsimustele ning näeb lõpus oma tulemust.

## Lingid

- Testitav rakendus (Vercel): https://viktoriinirakendus-lake.vercel.app/

## Funktsionaalsus

- Avaleht nupuga "Alusta viktoriiniga"
- Küsimuste vaade vastuse valimiseks
- Vastuse kontrollimine ja visuaalne tagasiside (õige/vale)
- Liikumine järgmise küsimuse juurde
- Lõppvaade skoori ja isikupärastatud sõnumiga

## Tehnoloogiad

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Playwright (E2E testid)

## Arendus (deployment) keskkonnas

Eeldused:

- Node.js (soovitatavalt LTS)
- npm

Paigaldus ja käivitamine:

```bash
npm install
npm run dev
```

Rakendus avaneb vaikimisi localhosti aadressil.

## Testimine

Kõik E2E testid:

```bash
npx playwright test
```

Üksik testfail (näide):

```bash
npx playwright test tests/05-final-result.spec.ts
```

## Build

Deployment buildi tegemine:

```bash
npm run build
```


