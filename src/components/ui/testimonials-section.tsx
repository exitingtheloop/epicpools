import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { TestimonialCard, TestimonialAuthor } from "./testimonial-card";
import { supabase } from "@/lib/db";
import type { Database } from "@/lib/database.types";

type Testimonial = Database['public']['Tables']['testimonials']['Row'];

interface TestimonialsSectionProps {
  title: string;
  description: string;
  className?: string;
}

export function TestimonialsSection({ 
  title,
  description,
  className 
}: TestimonialsSectionProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('is_featured', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setTestimonials(data);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <section className={cn(
      "bg-secondary-50 text-foreground",
      "py-12 sm:py-24 md:py-32 px-0",
      className
    )}>
      <div className="mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
          <h2 className="section-title">
            {title}
          </h2>
          <p className="text-md max-w-[600px] font-medium text-secondary-600 sm:text-xl">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex overflow-hidden p-2 [--gap:2rem] [gap:var(--gap)] flex-row [--duration:30s]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {[...Array(3)].map((_, setIndex) => (
                testimonials.map((testimonial) => (
                  <TestimonialCard 
                    key={`${setIndex}-${testimonial.id}`}
                    author={{
                      name: testimonial.name,
                      handle: testimonial.location,
                      avatar: testimonial.avatar_url || ''
                    }}
                    text={testimonial.text}
                  />
                ))
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-secondary-50" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-secondary-50" />
        </div>
      </div>
    </section>
  );
}