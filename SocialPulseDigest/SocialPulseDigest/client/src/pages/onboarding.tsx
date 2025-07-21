import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const onboardingSchema = z.object({
  brandName: z.string().min(2, "Brand name must be at least 2 characters"),
  niche: z.string().min(1, "Please select a niche"),
  tone: z.string().min(1, "Please select a tone"),
  colorPreferences: z.array(z.string()).min(1, "Select at least one color preference"),
  audienceDescription: z.string().min(10, "Please provide a more detailed audience description")
});

type OnboardingForm = z.infer<typeof onboardingSchema>;

const colorOptions = [
  { id: "blue", label: "Blue", color: "bg-blue-500" },
  { id: "green", label: "Green", color: "bg-green-500" },
  { id: "purple", label: "Purple", color: "bg-purple-500" },
  { id: "red", label: "Red", color: "bg-red-500" },
  { id: "yellow", label: "Yellow", color: "bg-yellow-500" },
  { id: "pink", label: "Pink", color: "bg-pink-500" }
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  
  const form = useForm<OnboardingForm>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      brandName: "",
      niche: "",
      tone: "",
      colorPreferences: [],
      audienceDescription: ""
    }
  });

  const onSubmit = async (data: OnboardingForm) => {
    try {
      const response = await fetch("/api/brands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: 1, // Mock user ID
          name: data.brandName,
          niche: data.niche,
          tone: data.tone,
          colorPreferences: data.colorPreferences,
          audienceDescription: data.audienceDescription
        })
      });

      if (response.ok) {
        toast({
          title: "Brand Setup Complete! 🎉",
          description: "Your personalized digest is being generated..."
        });
        // Redirect to home or digest page
        window.location.href = "/";
      }
    } catch (error) {
      toast({
        title: "Setup Failed",
        description: "There was an error setting up your brand. Please try again.",
        variant: "destructive"
      });
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Welcome to Finclvr</CardTitle>
          <p className="text-muted-foreground">
            Let's set up your personalized financial content digest
          </p>
          <div className="flex justify-center space-x-2 mt-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i <= step ? "bg-blue-600" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="brandName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your brand name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="niche"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry/Niche</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your niche" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="fintech">Fintech</SelectItem>
                            <SelectItem value="banking">Banking</SelectItem>
                            <SelectItem value="investment">Investment</SelectItem>
                            <SelectItem value="cryptocurrency">Cryptocurrency</SelectItem>
                            <SelectItem value="personal-finance">Personal Finance</SelectItem>
                            <SelectItem value="insurance">Insurance</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="tone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand Tone</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your brand tone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="friendly">Friendly</SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="authoritative">Authoritative</SelectItem>
                            <SelectItem value="educational">Educational</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="colorPreferences"
                    render={() => (
                      <FormItem>
                        <FormLabel>Color Preferences</FormLabel>
                        <div className="grid grid-cols-3 gap-4">
                          {colorOptions.map((color) => (
                            <FormField
                              key={color.id}
                              control={form.control}
                              name="colorPreferences"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(color.id)}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          field.onChange([...field.value, color.id]);
                                        } else {
                                          field.onChange(
                                            field.value?.filter((value) => value !== color.id)
                                          );
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <div className={`w-4 h-4 rounded ${color.color}`} />
                                  <FormLabel className="text-sm">{color.label}</FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="audienceDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Audience Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your target audience (demographics, interests, financial goals, etc.)"
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}

              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={step === 1}
                  className={step === 1 ? "invisible" : ""}
                >
                  Previous
                </Button>
                
                {step < 3 ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit">
                    Complete Setup
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
