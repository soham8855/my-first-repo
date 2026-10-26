
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import PhoneForm, { PhoneFormData } from './PhoneForm';
import OtpForm, { OtpFormData } from './OtpForm';
import { showToast } from '@/utils/toastUtils';
import { useLanguage } from '@/context/LanguageContext';

const AdminLoginCard: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { t } = useLanguage();

  const handlePhoneSubmit = (data: PhoneFormData) => {
    // In a real app, this would call an API to send the OTP
    console.log('Sending OTP to:', data.phone);
    setPhoneNumber(data.phone);
    showToast.success(
      "OTP Sent",
      `${t("otp_sent")} ${data.phone}`
    );
    setStep('otp');
  };

  const handleOtpSubmit = (data: OtpFormData) => {
    // In a real app, this would verify the OTP with an API
    console.log('Verifying OTP:', data.otp);
    
    // Simulating validation - in a real app this would check against a server
    // For testing purposes, the valid OTP is 123456
    if (data.otp === '123456') {
      showToast.success(
        "Success",
        t("login_success")
      );
      
      // Add a delay before redirecting to allow the toast to be seen
      setTimeout(() => {
        navigate('/admin-dashboard');
      }, 1500);
    } else {
      showToast.error(
        "Invalid OTP",
        t("invalid_otp")
      );
    }
  };

  const handleBackToPhone = () => {
    setStep('phone');
  };

  return (
    <Card className="w-full bg-amber-50/70 border-amber-200 shadow-md">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-4">
          <div className="p-2 rounded-full bg-amber-200">
            <Shield className="h-10 w-10 text-amber-800" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center text-amber-900 font-serif">{t("admin_login")}</CardTitle>
        <CardDescription className="text-center text-amber-700">
          {step === 'phone' 
            ? t("enter_phone") 
            : t("verification_code")}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {step === 'phone' ? (
          <PhoneForm onSubmit={handlePhoneSubmit} />
        ) : (
          <OtpForm 
            onSubmit={handleOtpSubmit} 
            onBackToPhone={handleBackToPhone}
            phoneNumber={phoneNumber}
          />
        )}
      </CardContent>
      
      <CardFooter className="flex justify-center">
        <p className="text-sm text-amber-700">
          {step === 'phone' 
            ? t("send_otp")
            : `${t("otp_sent")} ${phoneNumber}`}
        </p>
      </CardFooter>
    </Card>
  );
};

export default AdminLoginCard;
