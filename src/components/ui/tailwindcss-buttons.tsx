import { cn } from "@/lib/utils";

interface ButtonsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ButtonsCard = ({
  className,
  children,
  ...props
}: ButtonsCardProps) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-none border bg-transparent p-8 transition-all duration-200 hover:bg-secondary-50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};