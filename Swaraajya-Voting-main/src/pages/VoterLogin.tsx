
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useVoting } from "@/context/VotingContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";

const voterLoginSchema = z.object({
  aadhaarNumber: z
    .string()
    .min(12, { message: "Aadhaar number must be 12 digits" })
    .max(12, { message: "Aadhaar number must be 12 digits" })
    .regex(/^\d+$/, { message: "Aadhaar number must contain only digits" }),
});

const VoterLogin = () => {
  const { voters, refreshData } = useVoting();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const form = useForm<z.infer<typeof voterLoginSchema>>({
    resolver: zodResolver(voterLoginSchema),
    defaultValues: {
      aadhaarNumber: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof voterLoginSchema>) => {
    setLoading(true);
    
    try {
      // First try to get the voter from Supabase or local storage
      const { data: voterData, error } = await supabase
        .from('users')
        .select('*')
        .eq('aadhaar_number', values.aadhaarNumber)
        .single();
      
      if (error && !error.message.includes('Supabase not configured')) {
        console.error('Error fetching voter:', error);
        toast.error("Error verifying voter");
        setLoading(false);
        return;
      }
      
      if (voterData) {
        // Refresh data to make sure we have the latest state
        await refreshData();
        
        toast.success(t("login_success"));
        // Store voter ID in localStorage for persistence
        localStorage.setItem('currentVoterId', voterData.id);
        navigate("/voter-dashboard");
      } else {
        // If not found in database, check the context (which might be from localStorage)
        const voter = voters.find(v => v.aadhaarNumber === values.aadhaarNumber);
        
        if (voter) {
          toast.success(t("login_success"));
          localStorage.setItem('currentVoterId', voter.id);
          navigate("/voter-dashboard");
        } else {
          toast.error("Invalid Aadhaar number or voter not registered");
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-secondary/30">
      <Header />
      
      <div className="container mx-auto mt-8 px-4 flex justify-end">
        <LanguageSelector />
      </div>
      
      <div className="container max-w-md mx-auto px-4 py-12">
        <Card className="shadow-lg bg-amber-50/70 border-amber-200">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-serif text-amber-900">{t("voter_login")}</CardTitle>
            <CardDescription className="text-center text-amber-700">
              {t("enter_aadhaar")}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="aadhaarNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-amber-800">{t("aadhaar_number")}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={t("enter_aadhaar")}
                          {...field} 
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={12}
                          className="border-amber-200 bg-amber-50/50 text-amber-900"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-amber-600 hover:bg-amber-700" 
                  disabled={loading}
                >
                  {loading ? "Verifying..." : t("login")}
                </Button>
              </form>
            </Form>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-2 items-center">
            <p className="text-sm text-amber-700">
              Your Aadhaar number must be registered by an admin to login
            </p>
            <div className="text-xs bg-amber-100/50 border border-amber-200 p-2 rounded w-full">
              <p className="font-semibold">{t("testing_note")}</p>
              <p>1. Go to Admin Dashboard → Manage Voters</p>
              <p>2. Add a voter with Aadhaar number</p>
              <p>3. Use that number to login here</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default VoterLogin;
