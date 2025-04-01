import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import {
  AtSign,
  Lock,
  Phone,
  ChevronRight,
  Mail,
  Facebook,
  Instagram,
} from "lucide-react-native";

interface LoginFormProps {
  onLogin?: (method: string, data: any) => void;
  isLoading?: boolean;
}

const LoginForm = ({
  onLogin = () => {},
  isLoading = false,
}: LoginFormProps) => {
  const [activeTab, setActiveTab] = useState<"email" | "phone" | "social">(
    "email",
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationInput, setShowVerificationInput] = useState(false);

  const handleEmailLogin = () => {
    onLogin("email", { email, password });
  };

  const handlePhoneLogin = () => {
    if (!showVerificationInput) {
      // Request verification code
      setShowVerificationInput(true);
      return;
    }
    onLogin("phone", { phone, verificationCode });
  };

  const handleSocialLogin = (provider: string) => {
    onLogin("social", { provider });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="w-full bg-white rounded-xl p-4 max-w-[300px]"
    >
      {/* Login Tabs */}
      <View className="flex-row mb-6 border-b border-gray-200">
        <TouchableOpacity
          className={`flex-1 py-3 ${activeTab === "email" ? "border-b-2 border-blue-500" : ""}`}
          onPress={() => setActiveTab("email")}
        >
          <Text
            className={`text-center font-medium ${activeTab === "email" ? "text-blue-500" : "text-gray-500"}`}
          >
            Email
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 py-3 ${activeTab === "phone" ? "border-b-2 border-blue-500" : ""}`}
          onPress={() => setActiveTab("phone")}
        >
          <Text
            className={`text-center font-medium ${activeTab === "phone" ? "text-blue-500" : "text-gray-500"}`}
          >
            Phone
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 py-3 ${activeTab === "social" ? "border-b-2 border-blue-500" : ""}`}
          onPress={() => setActiveTab("social")}
        >
          <Text
            className={`text-center font-medium ${activeTab === "social" ? "text-blue-500" : "text-gray-500"}`}
          >
            Social
          </Text>
        </TouchableOpacity>
      </View>

      {/* Email Login Form */}
      {activeTab === "email" && (
        <View className="space-y-4">
          <View className="relative">
            <View className="absolute left-3 top-3 z-10">
              <AtSign size={20} color="#6b7280" />
            </View>
            <TextInput
              className="bg-gray-100 rounded-lg px-10 py-3 text-gray-800"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="relative">
            <View className="absolute left-3 top-3 z-10">
              <Lock size={20} color="#6b7280" />
            </View>
            <TextInput
              className="bg-gray-100 rounded-lg px-10 py-3 text-gray-800"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity className="self-end">
            <Text className="text-blue-500 text-sm">Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-blue-500 rounded-lg py-3 flex-row justify-center items-center"
            onPress={handleEmailLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Text className="text-white font-medium mr-2">Login</Text>
                <ChevronRight size={20} color="white" />
              </>
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* Phone Login Form */}
      {activeTab === "phone" && (
        <View className="space-y-4">
          {!showVerificationInput ? (
            <>
              <View className="relative">
                <View className="absolute left-3 top-3 z-10">
                  <Phone size={20} color="#6b7280" />
                </View>
                <TextInput
                  className="bg-gray-100 rounded-lg px-10 py-3 text-gray-800"
                  placeholder="Phone Number"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>

              <TouchableOpacity
                className="bg-blue-500 rounded-lg py-3 flex-row justify-center items-center"
                onPress={handlePhoneLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <>
                    <Text className="text-white font-medium mr-2">
                      Send Verification Code
                    </Text>
                    <ChevronRight size={20} color="white" />
                  </>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View className="relative">
                <TextInput
                  className="bg-gray-100 rounded-lg px-4 py-3 text-gray-800 text-center text-lg tracking-widest"
                  placeholder="Enter verification code"
                  value={verificationCode}
                  onChangeText={setVerificationCode}
                  keyboardType="number-pad"
                  maxLength={6}
                />
              </View>

              <TouchableOpacity
                className="bg-blue-500 rounded-lg py-3 flex-row justify-center items-center"
                onPress={handlePhoneLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <>
                    <Text className="text-white font-medium mr-2">
                      Verify & Login
                    </Text>
                    <ChevronRight size={20} color="white" />
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setShowVerificationInput(false)}>
                <Text className="text-blue-500 text-center">
                  Change phone number
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}

      {/* Social Login Options */}
      {activeTab === "social" && (
        <View className="space-y-4">
          <TouchableOpacity
            className="bg-[#4267B2] rounded-lg py-3 flex-row justify-center items-center"
            onPress={() => handleSocialLogin("facebook")}
          >
            <Facebook size={20} color="white" />
            <Text className="text-white font-medium ml-2">
              Continue with Facebook
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-[#DB4437] rounded-lg py-3 flex-row justify-center items-center"
            onPress={() => handleSocialLogin("google")}
          >
            <Mail size={20} color="white" />
            <Text className="text-white font-medium ml-2">
              Continue with Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] rounded-lg py-3 flex-row justify-center items-center"
            onPress={() => handleSocialLogin("instagram")}
          >
            <Instagram size={20} color="white" />
            <Text className="text-white font-medium ml-2">
              Continue with Instagram
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Sign Up Link */}
      <View className="mt-6 flex-row justify-center">
        <Text className="text-gray-600">Don't have an account? </Text>
        <TouchableOpacity>
          <Text className="text-blue-500 font-medium">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginForm;
