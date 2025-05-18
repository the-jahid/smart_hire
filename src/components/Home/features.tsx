import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export function FeaturesSection() {
    const features = [
        {
          title: "Personalized University Search",
          description:
            "Get tailored university recommendations based on your academic profile and interests.",
          icon: <IconTerminal2 />,
        },
        {
          title: "Step-by-step Application Guidance",
          description:
            "Navigate the application process seamlessly with our guided chatbot assistant.",
          icon: <IconHelp />,
        },
        {
          title: "Real-time Chat Assistance",
          description:
            "Receive instant support and answers to all of your university queries.",
          icon: <IconEaseInOut />,
        },
        {
          title: "Secure Document Upload",
          description:
            "Easily submit and verify your academic documents to streamline your application.",
          icon: <IconCloud />,
        },
        {
          title: "Smart Notifications",
          description:
            "Stay updated on deadlines and application status changes with real-time alerts.",
          icon: <IconRouteAltLeft />,
        },
        {
          title: "24/7 Student Support",
          description:
            "Our dedicated team is available around the clock to help you every step of the way.",
          icon: <IconAdjustmentsBolt />,
        },
        {
          title: "Flexible Payment Options",
          description:
            "Choose from a variety of payment methods for application fees with ease.",
          icon: <IconCurrencyDollar />,
        },
        {
          title: "Data-driven Insights",
          description:
            "Make informed decisions with tailored analytics and insights about universities.",
          icon: <IconHeart />,
        },
      ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-full xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
