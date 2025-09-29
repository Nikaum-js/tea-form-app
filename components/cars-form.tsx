import { carsDescriptions } from '@/constants/cars-descriptions';
import { zodResolver } from '@hookform/resolvers/zod';
import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

const scoreSchema = z.object({
  score: z.number().min(1).max(4),
  observacoes: z.string().optional(),
});

const carsSchema = z.object({
  relacoesPessoais: scoreSchema,
  imitacao: scoreSchema,
  respostaEmocional: scoreSchema,
  usoCorporal: scoreSchema,
  usoObjetos: scoreSchema,
  respostaMudancas: scoreSchema,
  respostaVisual: scoreSchema,
  respostaAuditiva: scoreSchema,
  paladarOlfatoTato: scoreSchema,
  medoNervosismo: scoreSchema,
  comunicacaoVerbal: scoreSchema,
  comunicacaoNaoVerbal: scoreSchema,
  nivelAtividade: scoreSchema,
  respostaIntelectual: scoreSchema,
  impressoesGerais: scoreSchema,
});

type CARSFormData = z.infer<typeof carsSchema>;

interface FormSectionProps {
  title: string;
  fieldName: keyof CARSFormData;
  control: any;
  error?: any;
}

function FormSection({ title, fieldName, control, error }: FormSectionProps) {
  const [showDescription, setShowDescription] = useState(false);
  const descriptions = carsDescriptions[fieldName as keyof typeof carsDescriptions];

  return (
    <View className="mb-6 bg-white rounded-lg p-4 shadow-sm">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-semibold text-gray-800 flex-1">{title}</Text>
        <TouchableOpacity
          onPress={() => setShowDescription(!showDescription)}
          className="bg-teal-100 px-3 py-1 rounded-full"
        >
          <Text className="text-teal-700 text-xs font-semibold">
            {showDescription ? 'Ocultar guia' : 'Ver guia'}
          </Text>
        </TouchableOpacity>
      </View>

      {showDescription && (
        <View className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
          {[1, 2, 3, 4].map((score, index) => {
            const desc = descriptions.levels[score as keyof typeof descriptions.levels];
            if (!desc) return null;
            return (
              <View key={score} className={index < 3 ? 'mb-4 pb-4 border-b border-gray-100' : 'mb-0'}>
                <View className="flex-row items-start mb-2">
                  <View className="bg-teal-600 w-6 h-6 rounded items-center justify-center mr-3 mt-0.5">
                    <Text className="text-white text-sm font-bold">{score}</Text>
                  </View>
                  <Text className="text-sm text-gray-800 leading-5 flex-1">{desc}</Text>
                </View>
              </View>
            );
          })}
        </View>
      )}

      <Controller
        control={control}
        name={`${fieldName}.score`}
        render={({ field: { onChange, value } }) => (
          <View className="mb-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-sm font-medium text-gray-700">Pontuação:</Text>
              <Text className="text-xl font-bold text-teal-600">{value || 1}</Text>
            </View>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={1}
              maximumValue={4}
              step={0.5}
              value={value || 1}
              onValueChange={onChange}
              minimumTrackTintColor="#14B8A6"
              maximumTrackTintColor="#D1D5DB"
              thumbTintColor="#0D9488"
            />
            <View className="flex-row justify-between mt-1">
              <Text className="text-xs text-gray-500">1</Text>
              <Text className="text-xs text-gray-500">1.5</Text>
              <Text className="text-xs text-gray-500">2</Text>
              <Text className="text-xs text-gray-500">2.5</Text>
              <Text className="text-xs text-gray-500">3</Text>
              <Text className="text-xs text-gray-500">3.5</Text>
              <Text className="text-xs text-gray-500">4</Text>
            </View>
          </View>
        )}
      />
      {error?.score && (
        <Text className="text-red-500 text-sm mb-2">{error.score.message}</Text>
      )}

      <Text className="text-sm font-medium mb-2 text-gray-700">Observações:</Text>
      <Controller
        control={control}
        name={`${fieldName}.observacoes`}
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="border border-gray-300 rounded-lg p-3 min-h-[80px] text-base bg-gray-50"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            value={value}
            onChangeText={onChange}
            placeholder="Adicione observações (opcional)..."
          />
        )}
      />
    </View>
  );
}

export function CARSForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CARSFormData>({
    resolver: zodResolver(carsSchema),
    defaultValues: {
      relacoesPessoais: { score: 1, observacoes: '' },
      imitacao: { score: 1, observacoes: '' },
      respostaEmocional: { score: 1, observacoes: '' },
      usoCorporal: { score: 1, observacoes: '' },
      usoObjetos: { score: 1, observacoes: '' },
      respostaMudancas: { score: 1, observacoes: '' },
      respostaVisual: { score: 1, observacoes: '' },
      respostaAuditiva: { score: 1, observacoes: '' },
      paladarOlfatoTato: { score: 1, observacoes: '' },
      medoNervosismo: { score: 1, observacoes: '' },
      comunicacaoVerbal: { score: 1, observacoes: '' },
      comunicacaoNaoVerbal: { score: 1, observacoes: '' },
      nivelAtividade: { score: 1, observacoes: '' },
      respostaIntelectual: { score: 1, observacoes: '' },
      impressoesGerais: { score: 1, observacoes: '' },
    },
  });

  function onSubmit(data: CARSFormData) {
    console.log('Dados do formulário CARS:', data);
  }

  return (
    <SafeAreaView className="flex-1 bg-teal-50" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ backgroundColor: '#f1f5f9' }}
        style={{ backgroundColor: '#f0fdfa' }}
      >
        <View className="bg-teal-50 px-6 py-8 mb-6">
          <Text className="text-3xl font-bold text-gray-900 mb-1">
            CARS
          </Text>
          <Text className="text-sm text-gray-600">
            Childhood Autism Rating Scale
          </Text>
        </View>

        <View className="px-4 bg-slate-100">

        <FormSection
          title="I. Relações Pessoais"
          fieldName="relacoesPessoais"
          control={control}
          error={errors.relacoesPessoais?.message}
        />

        <FormSection
          title="II. Imitação"
          fieldName="imitacao"
          control={control}
          error={errors.imitacao?.message}
        />

        <FormSection
          title="III. Resposta Emocional"
          fieldName="respostaEmocional"
          control={control}
          error={errors.respostaEmocional?.message}
        />

        <FormSection
          title="IV. Uso Corporal"
          fieldName="usoCorporal"
          control={control}
          error={errors.usoCorporal?.message}
        />

        <FormSection
          title="V. Uso de Objetos"
          fieldName="usoObjetos"
          control={control}
          error={errors.usoObjetos?.message}
        />

        <FormSection
          title="VI. Resposta a Mudanças"
          fieldName="respostaMudancas"
          control={control}
          error={errors.respostaMudancas?.message}
        />

        <FormSection
          title="VII. Resposta Visual"
          fieldName="respostaVisual"
          control={control}
          error={errors.respostaVisual?.message}
        />

        <FormSection
          title="VIII. Resposta Auditiva"
          fieldName="respostaAuditiva"
          control={control}
          error={errors.respostaAuditiva?.message}
        />

        <FormSection
          title="IX. Resposta e Uso do Paladar, Olfato e Tato"
          fieldName="paladarOlfatoTato"
          control={control}
          error={errors.paladarOlfatoTato?.message}
        />

        <FormSection
          title="X. Medo ou Nervosismo"
          fieldName="medoNervosismo"
          control={control}
          error={errors.medoNervosismo?.message}
        />

        <FormSection
          title="XI. Comunicação Verbal"
          fieldName="comunicacaoVerbal"
          control={control}
          error={errors.comunicacaoVerbal?.message}
        />

        <FormSection
          title="XII. Comunicação Não-Verbal"
          fieldName="comunicacaoNaoVerbal"
          control={control}
          error={errors.comunicacaoNaoVerbal?.message}
        />

        <FormSection
          title="XIII. Nível de Atividade"
          fieldName="nivelAtividade"
          control={control}
          error={errors.nivelAtividade?.message}
        />

        <FormSection
          title="XIV. Nível e Consistência da Resposta Intelectual"
          fieldName="respostaIntelectual"
          control={control}
          error={errors.respostaIntelectual?.message}
        />

        <FormSection
          title="XV. Impressões Gerais"
          fieldName="impressoesGerais"
          control={control}
          error={errors.impressoesGerais?.message}
        />

          <TouchableOpacity
            className="bg-teal-600 mb-20 py-4 px-6 rounded-lg mb-8"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Enviar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}