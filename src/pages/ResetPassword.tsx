
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      // This would connect to your password reset service
      console.log("Password reset request for:", data.email);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (error) {
      console.error("Reset password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-tab-blue">Reset Password</h1>
            <p className="text-gray-500 mt-2">
              We'll send you instructions to reset your password
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center space-y-6">
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-green-800">
                  If an account exists with the email you provided, you'll receive password reset instructions shortly.
                </p>
              </div>
              <Link to="/login">
                <Button className="bg-tab-blue hover:bg-tab-blue/90">
                  Return to Login
                </Button>
              </Link>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your.email@example.com" 
                          type="email" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-tab-blue hover:bg-tab-blue/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending Instructions..." : "Send Reset Instructions"}
                </Button>
              </form>
            </Form>
          )}

          <div className="mt-8 text-center">
            <p className="text-gray-500">
              Remember your password?{" "}
              <Link to="/login" className="text-tab-blue hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPassword;
