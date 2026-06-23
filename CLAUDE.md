# CLAUDE.md — tea-form-app

## O que é

App mobile (React Native + Expo) para aplicação e registro do formulário **CARS
(Childhood Autism Rating Scale)**, escala usada por profissionais de saúde na avaliação
de TEA em crianças. É o **frontend do `tea-form-api`**. Detalhes do domínio (escala CARS,
pontuação, formato JSON de saída) em `DOCS.md`.

## Stack e gerenciador

- **Expo ~54** + **React Native 0.81** + **TypeScript 5.9** (strict)
- **expo-router ~6** — navegação file-based na pasta `app/`
- **NativeWind 4** (Tailwind via `className`) — `global.css` + `tailwind.config.js`
- **react-hook-form + zod** (`@hookform/resolvers`) — formulários e validação
- Gerenciador: **npm** (`package-lock.json`) — **NUNCA** usar bun/yarn/pnpm
- Não há script de test nem type-check dedicado; lint via `expo lint`

## Comandos

```bash
npm start          # expo start (dev server)
npm run ios        # simulador iOS
npm run android    # emulador Android
npm run lint       # expo lint (eslint-config-expo)
eas build --profile <development|preview|production>
```

## Convenções deste repo

- `app/` — rotas do expo-router: `app/_layout.tsx` (raiz), `app/(tabs)/` (abas).
  Rotas usam `export default` (exigência do expo-router).
- `components/` — componentes reutilizáveis (ex.: `cars-form.tsx`), com
  **named exports** e **function declarations** (sem `React.FC`, sem default export).
- `constants/` — dados estáticos (ex.: `cars-descriptions.ts`).
- Arquivos em **kebab-case**; componentes em PascalCase; alias de import `@/*` → raiz.
- Estilização sempre via NativeWind (`className`), não `StyleSheet.create`.

## Cuidados

- **API local**: o app consome o `tea-form-api` rodando localmente. Em device físico,
  `localhost` não funciona — usar o IP da máquina na rede. A integração HTTP ainda não
  está no código (hoje o submit gera JSON estruturado); verificar antes de assumir.
- **EAS** configurado (`eas.json`): `appVersionSource: remote`, perfis
  development/preview (APK)/production (autoIncrement). Builds mexem em versão remota —
  não rodar `eas build`/`eas submit` sem o usuário pedir.
- Pastas `/ios` e `/android` são geradas (prebuild) e ignoradas — não editar nativo à mão.
- Nunca commitar `.env` nem `.claude/settings.local.json`.
- Não rodar `npm run reset-project` (apaga o código de `app/`).
