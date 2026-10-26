
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useLanguage } from '@/context/LanguageContext';

// Define form schema
const phoneFormSchema = z.object({
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
});

export type PhoneFormData = z.infer<typeof phoneFormSchema>;

interface PhoneFormProps {
  onSubmit: (data: PhoneFormData) => void;
}

const PhoneForm: React.FC<PhoneFormProps> = ({ onSubmit }) => {
  const { t } = useLanguage();
  
  // Phone number form
  const form = useForm<PhoneFormData>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: {
      phone: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-amber-800">{t("phone_number")}</FormLabel>
              <FormControl>
                <div className="flex relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600" />
                  <Input 
                    {...field} 
                    placeholder={t("enter_phone")}
                    className="pl-10 border-amber-200 bg-amber-50/50 text-amber-900"
                    type="tel"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
          {t("send_otp")}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
};

export default PhoneForm;
