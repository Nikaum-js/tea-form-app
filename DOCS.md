# TEA Form App

## Sobre o Projeto

**TEA Form App** é uma aplicação mobile desenvolvida com **React Native + Expo** para aplicação e registro do formulário **CARS (Childhood Autism Rating Scale)**, uma escala de avaliação utilizada por profissionais da saúde para identificar e classificar a severidade de sintomas relacionados ao Transtorno do Espectro Autista (TEA) em crianças. É o frontend do **tea-form-api**.

O objetivo principal é digitalizar e facilitar o processo de preenchimento do formulário CARS, tornando-o mais acessível, organizado e eficiente para profissionais que trabalham com diagnóstico e acompanhamento de crianças com TEA.

---

## O que é o CARS?

**CARS (Childhood Autism Rating Scale)** é uma ferramenta de triagem e avaliação padronizada, desenvolvida para auxiliar profissionais de saúde a identificar comportamentos característicos do autismo em crianças a partir de 2 anos de idade.

### Como funciona?

O CARS avalia **15 domínios comportamentais**, cada um pontuado de **1 a 4** (com incrementos de 0.5):

1. **Relações Pessoais** (Personal Relationships)
2. **Imitação** (Imitation)
3. **Resposta Emocional** (Emotional Response)
4. **Uso Corporal** (Body Use)
5. **Uso de Objetos** (Object Use)
6. **Resposta a Mudanças** (Response to Change)
7. **Resposta Visual** (Visual Response)
8. **Resposta Auditiva** (Auditory Response)
9. **Resposta e Uso do Paladar, Olfato e Tato** (Taste, Smell & Touch)
10. **Medo ou Nervosismo** (Fear or Nervousness)
11. **Comunicação Verbal** (Verbal Communication)
12. **Comunicação Não-Verbal** (Non-Verbal Communication)
13. **Nível de Atividade** (Activity Level)
14. **Nível e Consistência da Resposta Intelectual** (Intellectual Response)
15. **Impressões Gerais** (General Impressions)

### Pontuação

- **1**: Normal para a idade
- **1.5 a 2**: Levemente anormal
- **2.5 a 3**: Moderadamente anormal
- **3.5 a 4**: Gravemente anormal

### Interpretação da pontuação total

- **15 a 29.5 pontos**: Sem autismo
- **30 a 36.5 pontos**: Autismo leve a moderado
- **37 a 60 pontos**: Autismo grave

---

## Funcionalidades do App

- **Formulário digital completo do CARS** com 15 seções
- **Sistema de pontuação visual** com slider interativo (1 a 4, incrementos de 0.5)
- **Guias descritivos** para cada nível de pontuação
- **Campo de observações** opcional para cada seção
- **Validação de dados** com Zod e React Hook Form
- **Interface responsiva e acessível** com NativeWind (Tailwind CSS)
- **Exportação de dados** em formato JSON estruturado

---

## Formato de Dados (Saída JSON)

Ao submeter o formulário, os dados são estruturados da seguinte forma:

```json
{
  "personalRelationships": {
    "score": 2.5,
    "observations": "Criança evita contato visual frequentemente"
  },
  "imitation": {
    "score": 1,
    "observations": ""
  }
  // ... demais campos
}
```

### Tipos TypeScript

```typescript
interface ScoreField {
  score: number; // 1 to 4 (0.5 increments)
  observations?: string;
}

interface CARSFormData {
  personalRelationships: ScoreField;
  imitation: ScoreField;
  emotionalResponse: ScoreField;
  bodyUse: ScoreField;
  objectUse: ScoreField;
  responseToChange: ScoreField;
  visualResponse: ScoreField;
  auditoryResponse: ScoreField;
  tasteSmelLTouch: ScoreField;
  fearOrNervousness: ScoreField;
  verbalCommunication: ScoreField;
  nonVerbalCommunication: ScoreField;
  activityLevel: ScoreField;
  intellectualResponse: ScoreField;
  generalImpressions: ScoreField;
}
```

---

## Como Executar

Pré-requisitos: Node.js 18+ e **npm** (gerenciador do projeto — não usar yarn/bun/pnpm).

```bash
npm install

npm start          # dev server (Expo)
npm run android    # Android
npm run ios        # iOS
npm run web        # Web
```

---

## Uso Clínico

Este aplicativo é uma **ferramenta auxiliar** para profissionais de saúde capacitados (psicólogos, psiquiatras, terapeutas ocupacionais, fonoaudiólogos) que já utilizam o CARS em sua prática clínica.

**Importante**: A aplicação do CARS requer **treinamento específico** e deve ser realizada por profissionais qualificados. Este app não substitui a avaliação clínica completa.

---

## Referências

- Schopler, E., Reichler, R. J., & Renner, B. R. (1988). *The Childhood Autism Rating Scale (CARS)*. Western Psychological Services.
- American Psychiatric Association. (2013). *Diagnostic and Statistical Manual of Mental Disorders (5th ed.)*. Arlington, VA: American Psychiatric Publishing.
