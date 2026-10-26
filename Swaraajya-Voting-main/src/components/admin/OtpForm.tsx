
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useLanguage } from '@/context/LanguageContext';

// Define form schema
const otpFormSchema = z.object({
  otp: z.string().min(6, { message: "OTP must be 6 digits" }),
});

export type OtpFormData = z.infer<typeof otpFormSchema>;

interface OtpFormProps {
  onSubmit: (data: OtpFormData) => void;
  onBackToPhone: () => void;
  phoneNumber: string;
}

const OtpForm: React.FC<OtpFormProps> = ({ onSubmit, onBackToPhone, phoneNumber }) => {
  const { t } = useLanguage();
  
  // OTP form
  const form = useForm<OtpFormData>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      otp: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-amber-800">{t("verification_code")}</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field} className="bg-amber-50 border-amber-200">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="border-amber-200 bg-amber-50/50" />
                    <InputOTPSlot index={1} className="border-amber-200 bg-amber-50/50" />
                    <InputOTPSlot index={2} className="border-amber-200 bg-amber-50/50" />
                    <InputOTPSlot index={3} className="border-amber-200 bg-amber-50/50" />
                    <InputOTPSlot index={4} className="border-amber-200 bg-amber-50/50" />
                    <InputOTPSlot index={5} className="border-amber-200 bg-amber-50/50" />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-2">
          <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
            {t("verify_login")}
            <Key className="ml-2 h-4 w-4" />
          </Button>
          
          <Button
            type="button"
            variant="outline"
            className="w-full border-amber-300 text-amber-700 hover:bg-amber-100/50"
            onClick={onBackToPhone}
          >
            {t("back_to_phone")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OtpForm;
