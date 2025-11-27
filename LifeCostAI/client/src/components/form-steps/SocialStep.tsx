import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { FormData } from "../LifestyleForm";
import { Users, Home, Coffee, Mountain, PartyPopper } from "lucide-react";

interface SocialStepProps {
  data: FormData;
  onChange: (data: FormData) => void;
}

export default function SocialStep({ data, onChange }: SocialStepProps) {
  const social = data.social || {
    socializingStyle: "",
    hostingFrequency: "",
    hostingStyle: "",
    casualFrequency: "",
    casualType: "",
    activeFrequency: "",
    activeType: "",
    nightlifeFrequency: "",
    nightlifeStyle: "",
    buyingRounds: "",
  };

  const socializingStyles = [
    { value: "At-home", label: "At-home", desc: "Hosting or hanging at home", icon: Home },
    { value: "Casual outings", label: "Casual outings", desc: "Coffee, brunch, movies", icon: Coffee },
    { value: "Active plans", label: "Active plans", desc: "Sports, hiking, activities", icon: Mountain },
    { value: "Going-out/nightlife", label: "Going-out / Nightlife", desc: "Bars, clubs, events", icon: PartyPopper },
  ];

  const hostingFrequencies = [
    { value: "Weekly", label: "Weekly" },
    { value: "Few times a month", label: "Few times a month" },
    { value: "Monthly", label: "Monthly" },
    { value: "Few times a year", label: "Few times a year" },
  ];

  const hostingStyles = [
    { value: "Snacks and drinks", label: "Snacks & drinks", desc: "Keep it simple" },
    { value: "Order food delivery", label: "Order food delivery", desc: "Let someone else cook" },
    { value: "Cook a full meal", label: "Cook a full meal", desc: "Go all out in the kitchen" },
    { value: "Potluck style", label: "Potluck style", desc: "Everyone brings something" },
  ];

  const casualFrequencies = [
    { value: "Multiple times a week", label: "Multiple times a week" },
    { value: "Weekly", label: "Weekly" },
    { value: "Bi-weekly", label: "Bi-weekly" },
    { value: "Monthly", label: "Monthly" },
  ];

  const casualTypes = [
    { value: "Coffee or cafe", label: "Coffee or cafe", desc: "Quick catch-ups" },
    { value: "Brunch or lunch", label: "Brunch or lunch", desc: "A proper sit-down" },
    { value: "Movies or entertainment", label: "Movies or entertainment", desc: "Shared experiences" },
    { value: "Shopping with friends", label: "Shopping with friends", desc: "Browse and bond" },
  ];

  const activeFrequencies = [
    { value: "Multiple times a week", label: "Multiple times a week" },
    { value: "Weekly", label: "Weekly" },
    { value: "Bi-weekly", label: "Bi-weekly" },
    { value: "Monthly", label: "Monthly" },
  ];

  const activeTypes = [
    { value: "Hiking or outdoor sports", label: "Hiking or outdoor sports", desc: "Nature adventures" },
    { value: "Group fitness classes", label: "Group fitness classes", desc: "Sweat together" },
    { value: "Sports leagues or pickup games", label: "Sports leagues", desc: "Team competition" },
    { value: "Adventure activities", label: "Adventure activities", desc: "Climbing, kayaking, etc." },
  ];

  const nightlifeFrequencies = [
    { value: "Multiple times a week", label: "Multiple times a week" },
    { value: "Weekly", label: "Weekly" },
    { value: "Bi-weekly", label: "Bi-weekly" },
    { value: "Monthly or less", label: "Monthly or less" },
  ];

  const nightlifeStyles = [
    { value: "Couple drinks at a bar", label: "Couple drinks at a bar", desc: "Low-key evening" },
    { value: "Dinner and drinks", label: "Dinner and drinks", desc: "Full evening out" },
    { value: "Full night out with clubs", label: "Full night out", desc: "Dancing until late" },
    { value: "VIP or bottle service", label: "VIP / Bottle service", desc: "Go all out" },
  ];

  const roundsBuyingHabits = [
    { value: "Often", label: "Often", desc: "I like treating friends" },
    { value: "Sometimes", label: "Sometimes", desc: "Take turns fairly" },
    { value: "Rarely", label: "Rarely", desc: "Usually split the bill" },
    { value: "Never", label: "Never", desc: "Everyone pays their own" },
  ];

  const updateSocial = (field: string, value: string) => {
    const resetFields: Record<string, Partial<FormData["social"]>> = {
      socializingStyle: {
        hostingFrequency: "",
        hostingStyle: "",
        casualFrequency: "",
        casualType: "",
        activeFrequency: "",
        activeType: "",
        nightlifeFrequency: "",
        nightlifeStyle: "",
        buyingRounds: "",
      },
    };

    onChange({
      ...data,
      social: {
        ...social,
        ...(resetFields[field] || {}),
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
            <Users className="w-4 h-4 text-orange-600" />
          </div>
          <Label className="text-base sm:text-lg font-semibold">What style of socializing best describes you?</Label>
        </div>
        <p className="text-sm text-muted-foreground ml-11">How do you typically spend time with friends and family?</p>
        <RadioGroup
          value={social.socializingStyle}
          onValueChange={(value) => updateSocial("socializingStyle", value)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {socializingStyles.map((style) => {
            const Icon = style.icon;
            return (
              <div key={style.value} className="relative">
                <RadioGroupItem value={style.value} id={`social-style-${style.value}`} className="peer sr-only" />
                <Label 
                  htmlFor={`social-style-${style.value}`} 
                  className="flex items-start gap-3 p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all
                    hover:border-primary/50 hover:bg-primary/5
                    peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10
                    peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm sm:text-base font-semibold block">{style.label}</span>
                    <span className="text-xs text-muted-foreground">{style.desc}</span>
                  </div>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>

      {social.socializingStyle === "At-home" && (
        <>
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <Home className="w-4 h-4 text-amber-600" />
              </div>
              <Label className="text-base sm:text-lg font-semibold">How often do you host friends or family?</Label>
            </div>
            <RadioGroup
              value={social.hostingFrequency}
              onValueChange={(value) => onChange({
                ...data,
                social: { ...social, hostingFrequency: value }
              })}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {hostingFrequencies.map((freq) => (
                <div key={freq.value} className="relative">
                  <RadioGroupItem value={freq.value} id={`hosting-freq-${freq.value}`} className="peer sr-only" />
                  <Label 
                    htmlFor={`hosting-freq-${freq.value}`} 
                    className="flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all
                      hover:border-primary/50 hover:bg-primary/5
                      peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary
                      peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                  >
                    <span className="text-sm sm:text-base font-medium text-center">{freq.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {social.hostingFrequency && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <Label className="text-base sm:text-lg font-semibold block">When you host, what do you typically provide?</Label>
              <RadioGroup
                value={social.hostingStyle}
                onValueChange={(value) => onChange({
                  ...data,
                  social: { ...social, hostingStyle: value }
                })}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {hostingStyles.map((style) => (
                  <div key={style.value} className="relative">
                    <RadioGroupItem value={style.value} id={`hosting-style-${style.value}`} className="peer sr-only" />
                    <Label 
                      htmlFor={`hosting-style-${style.value}`} 
                      className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all min-h-[80px]
                        hover:border-primary/50 hover:bg-primary/5
                        peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10
                        peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                    >
                      <span className="text-sm sm:text-base font-semibold">{style.label}</span>
                      <span className="text-xs text-muted-foreground mt-1">{style.desc}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        </>
      )}

      {social.socializingStyle === "Casual outings" && (
        <>
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                <Coffee className="w-4 h-4 text-teal-600" />
              </div>
              <Label className="text-base sm:text-lg font-semibold">How often do you go out for casual hangouts?</Label>
            </div>
            <RadioGroup
              value={social.casualFrequency}
              onValueChange={(value) => onChange({
                ...data,
                social: { ...social, casualFrequency: value }
              })}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {casualFrequencies.map((freq) => (
                <div key={freq.value} className="relative">
                  <RadioGroupItem value={freq.value} id={`casual-freq-${freq.value}`} className="peer sr-only" />
                  <Label 
                    htmlFor={`casual-freq-${freq.value}`} 
                    className="flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all
                      hover:border-primary/50 hover:bg-primary/5
                      peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary
                      peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                  >
                    <span className="text-sm sm:text-base font-medium text-center">{freq.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {social.casualFrequency && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <Label className="text-base sm:text-lg font-semibold block">What's your typical casual outing?</Label>
              <RadioGroup
                value={social.casualType}
                onValueChange={(value) => onChange({
                  ...data,
                  social: { ...social, casualType: value }
                })}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {casualTypes.map((type) => (
                  <div key={type.value} className="relative">
                    <RadioGroupItem value={type.value} id={`casual-type-${type.value}`} className="peer sr-only" />
                    <Label 
                      htmlFor={`casual-type-${type.value}`} 
                      className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all min-h-[80px]
                        hover:border-primary/50 hover:bg-primary/5
                        peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10
                        peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                    >
                      <span className="text-sm sm:text-base font-semibold">{type.label}</span>
                      <span className="text-xs text-muted-foreground mt-1">{type.desc}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        </>
      )}

      {social.socializingStyle === "Active plans" && (
        <>
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                <Mountain className="w-4 h-4 text-green-600" />
              </div>
              <Label className="text-base sm:text-lg font-semibold">How often do you do active social activities?</Label>
            </div>
            <RadioGroup
              value={social.activeFrequency}
              onValueChange={(value) => onChange({
                ...data,
                social: { ...social, activeFrequency: value }
              })}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {activeFrequencies.map((freq) => (
                <div key={freq.value} className="relative">
                  <RadioGroupItem value={freq.value} id={`active-freq-${freq.value}`} className="peer sr-only" />
                  <Label 
                    htmlFor={`active-freq-${freq.value}`} 
                    className="flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all
                      hover:border-primary/50 hover:bg-primary/5
                      peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary
                      peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                  >
                    <span className="text-sm sm:text-base font-medium text-center">{freq.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {social.activeFrequency && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <Label className="text-base sm:text-lg font-semibold block">What kind of activities do you typically do?</Label>
              <RadioGroup
                value={social.activeType}
                onValueChange={(value) => onChange({
                  ...data,
                  social: { ...social, activeType: value }
                })}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {activeTypes.map((type) => (
                  <div key={type.value} className="relative">
                    <RadioGroupItem value={type.value} id={`active-type-${type.value}`} className="peer sr-only" />
                    <Label 
                      htmlFor={`active-type-${type.value}`} 
                      className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all min-h-[80px]
                        hover:border-primary/50 hover:bg-primary/5
                        peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10
                        peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                    >
                      <span className="text-sm sm:text-base font-semibold">{type.label}</span>
                      <span className="text-xs text-muted-foreground mt-1">{type.desc}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        </>
      )}

      {social.socializingStyle === "Going-out/nightlife" && (
        <>
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                <PartyPopper className="w-4 h-4 text-purple-600" />
              </div>
              <Label className="text-base sm:text-lg font-semibold">How often do you go out for nightlife?</Label>
            </div>
            <RadioGroup
              value={social.nightlifeFrequency}
              onValueChange={(value) => onChange({
                ...data,
                social: { ...social, nightlifeFrequency: value }
              })}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {nightlifeFrequencies.map((freq) => (
                <div key={freq.value} className="relative">
                  <RadioGroupItem value={freq.value} id={`nightlife-freq-${freq.value}`} className="peer sr-only" />
                  <Label 
                    htmlFor={`nightlife-freq-${freq.value}`} 
                    className="flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all
                      hover:border-primary/50 hover:bg-primary/5
                      peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary
                      peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                  >
                    <span className="text-sm sm:text-base font-medium text-center">{freq.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {social.nightlifeFrequency && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <Label className="text-base sm:text-lg font-semibold block">What's your typical night out like?</Label>
              <RadioGroup
                value={social.nightlifeStyle}
                onValueChange={(value) => onChange({
                  ...data,
                  social: { ...social, nightlifeStyle: value }
                })}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {nightlifeStyles.map((style) => (
                  <div key={style.value} className="relative">
                    <RadioGroupItem value={style.value} id={`nightlife-style-${style.value}`} className="peer sr-only" />
                    <Label 
                      htmlFor={`nightlife-style-${style.value}`} 
                      className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all min-h-[80px]
                        hover:border-primary/50 hover:bg-primary/5
                        peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10
                        peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                    >
                      <span className="text-sm sm:text-base font-semibold">{style.label}</span>
                      <span className="text-xs text-muted-foreground mt-1">{style.desc}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {social.nightlifeStyle && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <Label className="text-base sm:text-lg font-semibold block">When you're out, do you typically buy rounds for friends?</Label>
              <RadioGroup
                value={social.buyingRounds}
                onValueChange={(value) => onChange({
                  ...data,
                  social: { ...social, buyingRounds: value }
                })}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3"
              >
                {roundsBuyingHabits.map((habit) => (
                  <div key={habit.value} className="relative">
                    <RadioGroupItem value={habit.value} id={`rounds-${habit.value}`} className="peer sr-only" />
                    <Label 
                      htmlFor={`rounds-${habit.value}`} 
                      className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all min-h-[80px]
                        hover:border-primary/50 hover:bg-primary/5
                        peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10
                        peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                    >
                      <span className="text-sm sm:text-base font-semibold">{habit.label}</span>
                      <span className="text-xs text-muted-foreground mt-1">{habit.desc}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        </>
      )}
    </div>
  );
}
