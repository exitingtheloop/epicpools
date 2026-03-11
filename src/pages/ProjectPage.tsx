import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, MapPin, X, ChevronRight } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { supabase } from '@/lib/db';
import type { Database } from '@/lib/database.types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type Project = Database['public']['Tables']['projects']['Row'] & {
  categories: string[];
  images: Array<{
    url: string;
    type: string;
  }>;
};

const ITEMS_PER_PAGE = 8;

const ProjectPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<{url: string; type: string} | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [mediaLoading, setMediaLoading] = useState(true);
  const mediaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let isMounted = true;

    const fetchProject = async () => {
      if (!projectId) {
        if (isMounted) {
          setError('No project ID provided');
          setLoading(false);
          setInitialLoading(false);
        }
        return;
      }

      try {
        const { data: projectData, error: projectError } = await supabase
          .from('projects')
          .select(`
            *,
            project_category_mappings!inner (
              project_categories (
                name
              )
            ),
            project_assets (
              url,
              type,
              order
            )
          `)
          .eq('slug', projectId)
          .single();

        if (projectError) throw projectError;
        if (!projectData) throw new Error('Project not found');

        if (!projectData.project_category_mappings) {
          throw new Error('Project categories not found');
        }

        if (!projectData.project_assets || projectData.project_assets.length === 0) {
          throw new Error('Project assets not found');
        }

        const formattedProject = {
          ...projectData,
          categories: projectData.project_category_mappings.map(
            mapping => mapping.project_categories.name
          ),
          images: projectData.project_assets
            .sort((a, b) => a.order - b.order)
            .map(asset => ({
              url: asset.url,
              type: asset.type
            }))
        };

        if (isMounted) {
          setProject(formattedProject);
          setError(null);
          setMediaLoading(true);
          
          // Start loading all images
          const imageUrls = formattedProject.images
            .filter(img => img.type === 'image')
            .map(img => img.url);
          
          const loadImage = (url: string) => {
            return new Promise((resolve) => {
              const img = new Image();
              img.onload = () => {
                if (isMounted) {
                  setImagesLoaded(prev => prev + 1);
                }
                resolve(null);
              };
              img.onerror = () => resolve(null);
              img.src = url;
            });
          };

          await Promise.all(imageUrls.map(loadImage));
          
          if (isMounted) {
            setLoading(false);
            setMediaLoading(false);
            // Add a small delay before removing the loading screen
            setTimeout(() => {
              if (isMounted) {
                setInitialLoading(false);
              }
            }, 500);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error in fetchProject:', err);
          setError(err instanceof Error ? err.message : 'Failed to load project');
          setLoading(false);
          setInitialLoading(false);
          setMediaLoading(false);
        }
      }
    };

    setLoading(true);
    setInitialLoading(true);
    setMediaLoading(true);
    fetchProject();

    return () => {
      isMounted = false;
    };
  }, [projectId]);

  useEffect(() => {
    if (selectedMedia) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedMedia]);

  const getPaginatedMedia = () => {
    if (!project) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return project.images.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    mediaRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const totalPages = project ? Math.ceil((project.images.length - 1) / ITEMS_PER_PAGE) : 0;

  if (loading || initialLoading) {
    return <LoadingScreen isLoading={true} />;
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-3xl font-bold text-secondary-900 mb-4">Project Not Found</h1>
        <p className="text-lg text-secondary-600 mb-8">{error || 'The project you\'re looking for doesn\'t exist or has been moved.'}</p>
        <Link to="/portfolio" className="btn-primary">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  const projectDetails = [
    {
      title: "Description",
      content: project.description
    },
    {
      title: "Completion Date",
      content: new Date(project.completion_date).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      })
    },
    {
      title: "Categories",
      content: (
        <ul className="list-disc list-inside uppercase text-secondary-600 space-y-1">
          {project.categories.map((category, index) => (
            <li key={index}>{category}</li>
          ))}
        </ul>
      )
    }
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <LoadingScreen isLoading={initialLoading} />
      
      {/* Hero Image */}
      <div className="relative h-[70vh] bg-secondary-900">
        <div 
          className="absolute inset-0 cursor-pointer"
          onClick={() => setSelectedMedia(project.images[0])}
        >
          {project.images[0].type === 'video' ? (
            <div className="absolute inset-0 border border-black">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={project.images[0].url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.images[0].url})` }}
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 to-transparent"></div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="container-custom pb-12">
            <AnimatedSection>
              <Link to="/portfolio" className="inline-flex items-center text-white mb-4 hover:text-primary-400 transition-colors">
                <ChevronLeft size={20} className="mr-2" />
                Back to Portfolio
              </Link>
              <h1 className="text-2xl md:text-5xl tracking-wider font-normal text-white mb-4 font-montserrat">
                {project.title}
              </h1>
              <div className="flex items-center text-white/80 mb-6">
                <MapPin size={18} className="mr-2" />
                {project.location}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {[project.type, ...project.categories].map((tag, index) => (
                  <span 
                    key={index} 
                    className="inline-block px-3 py-1 text-sm bg-white/10 text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
      
      {/* Project Details */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Project Information */}
            <AnimatedSection className="lg:col-span-1">
              <h2 className="text-1xl uppercase font-medium text-secondary-900 mb-4 font-montserrat">
                Project Details
              </h2>
              
              <Accordion type="single" collapsible className="w-full">
                {projectDetails.map((detail, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-1xl uppercase tracking-wider font-normal text-secondary-800">
                      {detail.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-secondary-600">
                      {detail.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              <div className="mt-8">
                <Link to="/get-quote" className="btn-primary w-full uppercase justify-center">
                  Get a Similar Design
                </Link>
              </div>
            </AnimatedSection>
            
            {/* Project Gallery */}
            <AnimatedSection className="lg:col-span-2" delay={0.2}>
              <div ref={mediaRef}>
                {mediaLoading ? (
                  <div className="flex justify-center items-center h-96">
                    <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {getPaginatedMedia().map((image, index) => (
                      <div 
                        key={index} 
                        className={`w-full h-[600px] overflow-hidden shadow-lg cursor-pointer ${image.type === 'video' ? 'border-2 border-black' : ''}`}
                        onClick={() => setSelectedMedia(image)}
                      >
                        {image.type === 'video' ? (
                          <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                          >
                            <source src={image.url} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <img 
                            src={image.url} 
                            alt={`${project.title} image ${index + 2}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    ))}

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-4 mt-12">
                        <button
                          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                          disabled={currentPage === 1}
                          className="btn-outline p-2 disabled:opacity-50"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        
                        <span className="text-secondary-600">
                          Page {currentPage} of {totalPages}
                        </span>
                        
                        <button
                          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="btn-outline p-2 disabled:opacity-50"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setSelectedMedia(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-primary-400 transition-colors"
              onClick={() => setSelectedMedia(null)}
            >
              <X size={32} />
            </button>
            
            <div className="w-full h-full flex items-center justify-center p-4">
              {selectedMedia.type === 'video' ? (
                <video
                  autoPlay
                  controls
                  className="max-w-full max-h-full border border-black"
                  onClick={(e) => e.stopPropagation()}
                >
                  <source src={selectedMedia.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={selectedMedia.url}
                  alt="Full screen view"
                  className="max-w-full max-h-full object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectPage;