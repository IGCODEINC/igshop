import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  Send,
} from "lucide-react-native";

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

export default function SupportHelpScreen() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      question: "Como rastrear meu pedido?",
      answer:
        "Você pode rastrear seu pedido na seção 'Pedidos' do aplicativo. Lá você encontrará informações em tempo real sobre o status da entrega.",
      isOpen: false,
    },
    {
      question: "Como cancelar um pedido?",
      answer:
        "Para cancelar um pedido, vá até a seção 'Pedidos', selecione o pedido que deseja cancelar e toque no botão 'Cancelar pedido'. Note que pedidos já em rota de entrega podem não ser elegíveis para cancelamento.",
      isOpen: false,
    },
    {
      question: "Como adicionar um novo método de pagamento?",
      answer:
        "Vá até seu perfil, selecione 'Métodos de pagamento' e toque em 'Adicionar novo'. Você poderá adicionar cartões de crédito, débito ou outras formas de pagamento suportadas.",
      isOpen: false,
    },
    {
      question: "O que fazer se meu pedido estiver incompleto?",
      answer:
        "Se seu pedido chegou incompleto, entre em contato conosco imediatamente através do chat de suporte ou pelo telefone. Tenha em mãos o número do pedido para agilizar o atendimento.",
      isOpen: false,
    },
    {
      question: "Como solicitar reembolso?",
      answer:
        "Para solicitar um reembolso, acesse a seção 'Pedidos', selecione o pedido em questão e toque em 'Solicitar reembolso'. Explique o motivo da solicitação e nossa equipe analisará seu caso em até 48 horas.",
      isOpen: false,
    },
  ]);

  const handleBack = () => {
    router.back();
  };

  const toggleFAQ = (index: number) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index].isOpen = !updatedFaqs[index].isOpen;
    setFaqs(updatedFaqs);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setSuccessMessage(
        "Mensagem enviada com sucesso! Responderemos em breve.",
      );
      setMessage("");

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    }, 1500);
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-white p-6 pt-12 flex-row items-center border-b border-gray-200">
        <TouchableOpacity
          onPress={handleBack}
          className="p-2 rounded-full bg-gray-100"
        >
          <ArrowLeft size={20} color="#4B5563" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800 ml-4">
          Ajuda e Suporte
        </Text>
      </View>

      <ScrollView className="flex-1 p-6">
        {/* Contact Options */}
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <View className="flex-row items-center mb-6">
            <View className="bg-blue-100 p-3 rounded-full">
              <HelpCircle size={24} color="#2563EB" />
            </View>
            <Text className="ml-4 text-lg font-semibold text-gray-800">
              Como podemos ajudar?
            </Text>
          </View>

          <View className="flex-row flex-wrap justify-between mb-4">
            <TouchableOpacity className="bg-blue-50 rounded-xl p-4 w-[48%] mb-4 items-center">
              <MessageCircle size={24} color="#2563EB" />
              <Text className="mt-2 text-blue-700 font-medium">
                Chat ao vivo
              </Text>
              <Text className="text-xs text-gray-500 text-center mt-1">
                Disponível 24/7
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-blue-50 rounded-xl p-4 w-[48%] mb-4 items-center">
              <Phone size={24} color="#2563EB" />
              <Text className="mt-2 text-blue-700 font-medium">Telefone</Text>
              <Text className="text-xs text-gray-500 text-center mt-1">
                8h às 20h
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-blue-50 rounded-xl p-4 w-full items-center">
              <Mail size={24} color="#2563EB" />
              <Text className="mt-2 text-blue-700 font-medium">Email</Text>
              <Text className="text-xs text-gray-500 text-center mt-1">
                Resposta em até 24h
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQs */}
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Perguntas Frequentes
          </Text>

          {faqs.map((faq, index) => (
            <View
              key={index}
              className={`border-b border-gray-100 ${index === faqs.length - 1 ? "border-b-0" : ""}`}
            >
              <TouchableOpacity
                onPress={() => toggleFAQ(index)}
                className="flex-row justify-between items-center py-4"
              >
                <Text className="text-gray-800 font-medium flex-1 mr-2">
                  {faq.question}
                </Text>
                {faq.isOpen ? (
                  <ChevronUp size={20} color="#4B5563" />
                ) : (
                  <ChevronDown size={20} color="#4B5563" />
                )}
              </TouchableOpacity>
              {faq.isOpen && (
                <View className="pb-4">
                  <Text className="text-gray-600">{faq.answer}</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Contact Form */}
        <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Envie uma mensagem
          </Text>

          <View className="mb-4">
            <Text className="text-gray-700 mb-2">Sua mensagem</Text>
            <TextInput
              className="bg-gray-100 rounded-lg px-4 py-3 text-gray-800 min-h-[100px]"
              value={message}
              onChangeText={setMessage}
              placeholder="Descreva seu problema ou dúvida..."
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
            />
          </View>

          {successMessage ? (
            <View className="mb-4 p-3 bg-green-50 rounded-lg">
              <Text className="text-green-600">{successMessage}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            onPress={handleSendMessage}
            disabled={isSending || !message.trim()}
            className={`rounded-lg py-3 px-6 flex-row justify-center items-center ${isSending || !message.trim() ? "bg-blue-300" : "bg-blue-600"}`}
          >
            {isSending ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <>
                <Send size={18} color="white" />
                <Text className="text-white font-medium ml-2">Enviar</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
