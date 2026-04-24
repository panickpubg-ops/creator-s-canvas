import { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  CreditCard,
  Gift,
  User,
  CheckCircle2,
  Heart,
  Lock,
} from "lucide-react";
import { getCharityTypeById, charityTypes } from "@/data/charityTypes";

const fadeIn = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
};

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const typeId = searchParams.get("type") || "zakat";
  const amount = parseFloat(searchParams.get("amount") || "50");
  const charity = getCharityTypeById(typeId) || charityTypes[0];
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [giftAid, setGiftAid] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const giftAidAmount = giftAid ? amount * 0.25 : 0;
  const totalWithGiftAid = amount + giftAidAmount;

  const updateField = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const canProceedStep1 = amount > 0;
  const canSubmit =
    formData.firstName && formData.lastName && formData.email && formData.cardNumber;

  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="container max-w-3xl mx-auto px-4 sm:px-5 h-14 flex items-center justify-between">
          <Link to="/" className="font-serif text-lg font-bold text-foreground">Bakking</Link>
          <div className="flex items-center gap-1.5 font-sans text-[10px] text-muted-foreground">
            <Lock className="h-3 w-3" /> Secure Checkout
          </div>
        </div>
      </header>

      <div className="pt-14 container max-w-3xl mx-auto px-4 sm:px-5 py-8 sm:py-12">
        {/* STEP INDICATOR */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 mb-8 sm:mb-12">
          {[
            { num: 1, label: "Amount & Gift Aid", icon: Gift },
            { num: 2, label: "Details & Payment", icon: CreditCard },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center gap-2 sm:gap-3">
              {i > 0 && (
                <div className={cn(
                  "hidden sm:block w-12 md:w-20 h-px",
                  step >= s.num ? "bg-primary" : "bg-border"
                )} />
              )}
              <button
                onClick={() => s.num < step && setStep(s.num)}
                className={cn(
                  "flex items-center gap-2 transition-all",
                  s.num < step && "cursor-pointer",
                  s.num > step && "cursor-default"
                )}
              >
                <div
                  className={cn(
                    "h-10 w-10 sm:h-12 sm:w-12 rounded-xl flex items-center justify-center font-sans text-sm sm:text-base font-bold transition-all",
                    step === s.num
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : step > s.num
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary text-muted-foreground"
                  )}
                >
                  {step > s.num ? <CheckCircle2 className="h-5 w-5" /> : s.num}
                </div>
                <span className={cn(
                  "font-sans text-xs sm:text-sm font-medium hidden sm:inline",
                  step === s.num ? "text-foreground" : "text-muted-foreground"
                )}>
                  {s.label}
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* CONTENT */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeIn}
            >
              {/* Amount summary */}
              <div className="rounded-2xl bg-card border border-border p-5 sm:p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{charity.emoji}</span>
                  <div>
                    <h2 className="font-serif text-lg sm:text-xl font-bold text-foreground">{charity.label}</h2>
                    <p className="font-sans text-xs text-muted-foreground">{charity.heroSubtitle}</p>
                  </div>
                </div>
                <Separator className="mb-4" />
                <div className="flex items-center justify-between">
                  <span className="font-sans text-sm text-muted-foreground">Donation amount</span>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-foreground">£{amount.toFixed(2)}</span>
                </div>
              </div>

              {/* Gift Aid */}
              <div className="rounded-2xl bg-secondary/30 border border-border p-5 sm:p-7 mb-6">
                <div className="text-center mb-6">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground italic mb-2">
                    Gift Aid it
                  </h2>
                  <p className="font-sans text-sm text-muted-foreground max-w-md mx-auto">
                    If you are a UK taxpayer, the value of your gift can increase by 25% at no extra cost to you!
                  </p>
                </div>

                {/* Amount visualization */}
                <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6">
                  <span className={cn(
                    "font-serif text-2xl sm:text-4xl font-bold transition-colors",
                    giftAid ? "text-muted-foreground line-through" : "text-primary"
                  )}>
                    £{amount.toFixed(2)}
                  </span>
                  {giftAid && (
                    <>
                      <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="font-serif text-2xl sm:text-4xl font-bold text-primary"
                      >
                        £{totalWithGiftAid.toFixed(2)}
                      </motion.span>
                    </>
                  )}
                </div>

                {/* Checkbox */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border">
                  <Checkbox
                    id="giftaid"
                    checked={giftAid}
                    onCheckedChange={(checked) => setGiftAid(checked === true)}
                    className="mt-0.5"
                  />
                  <Label htmlFor="giftaid" className="font-sans text-sm text-foreground leading-relaxed cursor-pointer">
                    I am a UK taxpayer, donating as an individual and would like to claim Gift Aid on my donation*
                  </Label>
                </div>
              </div>

              {/* Disclaimer */}
              <p className="font-sans text-[10px] sm:text-xs text-muted-foreground leading-relaxed mb-8">
                * I understand that if I pay less Income Tax and/or Capital Gains Tax than the amount of Gift Aid claimed
                on all my donations in that tax year it is my responsibility to pay any difference. Please remember to
                notify us if you want to cancel this declaration, change your name or home address or no longer pay
                sufficient tax on your income and/or capital gains.
              </p>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="rounded-full font-sans gap-2"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button
                  onClick={() => setStep(2)}
                  disabled={!canProceedStep1}
                  className="rounded-full bg-primary text-primary-foreground font-sans font-semibold px-6 sm:px-8 gap-2 shadow-lg shadow-primary/25 disabled:opacity-50"
                >
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeIn}
            >
              {/* Summary banner */}
              <div className="rounded-2xl bg-primary/5 border border-primary/20 p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{charity.emoji}</span>
                  <div>
                    <p className="font-sans text-sm font-semibold text-foreground">{charity.label}</p>
                    <p className="font-sans text-[10px] text-muted-foreground">
                      {giftAid ? `£${amount.toFixed(2)} + £${giftAidAmount.toFixed(2)} Gift Aid` : "One-off donation"}
                    </p>
                  </div>
                </div>
                <span className="font-serif text-xl sm:text-2xl font-bold text-primary">
                  £{(giftAid ? totalWithGiftAid : amount).toFixed(2)}
                </span>
              </div>

              {/* Personal details */}
              <div className="rounded-2xl bg-card border border-border p-5 sm:p-6 mb-6">
                <div className="flex items-center gap-2 mb-5">
                  <User className="h-4 w-4 text-primary" />
                  <h3 className="font-serif text-lg font-bold text-foreground">Your Details</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label className="font-sans text-xs text-muted-foreground mb-1.5 block">First name *</Label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      className="rounded-lg font-sans"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <Label className="font-sans text-xs text-muted-foreground mb-1.5 block">Last name *</Label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      className="rounded-lg font-sans"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <Label className="font-sans text-xs text-muted-foreground mb-1.5 block">Email *</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="rounded-lg font-sans"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <Label className="font-sans text-xs text-muted-foreground mb-1.5 block">Phone (optional)</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="rounded-lg font-sans"
                    placeholder="+44 7700 900000"
                  />
                </div>
              </div>

              {/* Payment */}
              <div className="rounded-2xl bg-card border border-border p-5 sm:p-6 mb-6">
                <div className="flex items-center gap-2 mb-5">
                  <CreditCard className="h-4 w-4 text-primary" />
                  <h3 className="font-serif text-lg font-bold text-foreground">Payment</h3>
                </div>
                <div className="mb-4">
                  <Label className="font-sans text-xs text-muted-foreground mb-1.5 block">Card number *</Label>
                  <Input
                    value={formData.cardNumber}
                    onChange={(e) => updateField("cardNumber", e.target.value)}
                    className="rounded-lg font-sans"
                    placeholder="4242 4242 4242 4242"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-sans text-xs text-muted-foreground mb-1.5 block">Expiry *</Label>
                    <Input
                      value={formData.expiry}
                      onChange={(e) => updateField("expiry", e.target.value)}
                      className="rounded-lg font-sans"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <Label className="font-sans text-xs text-muted-foreground mb-1.5 block">CVC *</Label>
                    <Input
                      value={formData.cvc}
                      onChange={(e) => updateField("cvc", e.target.value)}
                      className="rounded-lg font-sans"
                      placeholder="123"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 font-sans text-[10px] text-muted-foreground">
                  <Shield className="h-3 w-3" />
                  <span>Your payment details are encrypted and secure</span>
                </div>

                {/* Stripe fee notice */}
                <div className="mt-4 rounded-lg bg-secondary/40 border border-border p-3 flex items-start gap-2">
                  <CreditCard className="h-3.5 w-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="font-sans text-[11px] text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">Bakking takes 0% on charity donations.</span>{" "}
                    A small payment processing fee is charged by Stripe (typically 1.5% + 20p for UK cards) to securely process your card —
                    this goes to Stripe, not to Bakking.
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="rounded-full font-sans gap-2"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    disabled={!canSubmit}
                    className="rounded-full bg-primary text-primary-foreground font-sans font-semibold px-6 sm:px-8 gap-2 shadow-lg shadow-primary/25 disabled:opacity-50"
                  >
                    <Heart className="h-4 w-4" />
                    Complete Donation — £{(giftAid ? totalWithGiftAid : amount).toFixed(2)}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-border py-6 mt-12">
        <div className="container max-w-3xl mx-auto px-4 sm:px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 font-sans text-[10px] text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Registered Charity</span>
            <Separator orientation="vertical" className="h-3" />
            <span>Visa</span>
            <span>Mastercard</span>
          </div>
          <div className="flex items-center gap-4 font-sans text-[10px] text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Other ways to donate</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Checkout;
