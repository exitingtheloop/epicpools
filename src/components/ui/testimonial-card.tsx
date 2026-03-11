import { cn } from "../../lib/utils";

export interface TestimonialAuthor {
  name: string;
  handle: string;
  avatar: string;
}

interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  href?: string;
}

export function TestimonialCard({ author, text, href }: TestimonialCardProps) {
  const Card = href ? 'a' : 'div';
  
  return (
    <Card
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex w-[320px] shrink-0 flex-col gap-4 rounded-xl bg-white p-6",
        "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] backdrop-blur-sm",
        "transition duration-300",
        href && "hover:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.15)] cursor-pointer"
      )}
    >
      <div className="flex items-center gap-4">
        <img
          src={author.avatar}
          alt={author.name}
          className="h-12 w-12 rounded-full object-cover ring-2 ring-primary-100"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-secondary-900">{author.name}</span>
          <span className="text-sm text-secondary-500">{author.handle}</span>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-secondary-600">{text}</p>
    </Card>
  );
}