import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../ui/AnimatedSection';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/db';
import type { Database } from '@/lib/database.types';

interface ProjectGridProps {
  limit?: number;
  showFilters?: boolean;
}

type Project = Database['public']['Tables']['projects']['Row'] & {
  project_category_mappings: {
    project_categories: {
      name: string;
    };
  }[];
  project_assets: {
    url: string;
    is_cover: boolean;
  }[];
};

const ProjectGrid: React.FC<ProjectGridProps> = ({ limit, showFilters = true }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select(`
            *,
            project_category_mappings (
              project_categories (
                name
              )
            ),
            project_assets (
              url,
              is_cover
            )
          `)
          .order('completion_date', { ascending: false })
          .limit(limit || 100);

        if (projectsError) throw projectsError;
        if (projectsData) {
          setProjects(projectsData);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [limit]);

  const getProjectCategories = (project: Project) => {
    return project.project_category_mappings.map(mapping => mapping.project_categories.name);
  };

  const getCoverImage = (project: Project) => {
    const coverAsset = project.project_assets.find(asset => asset.is_cover);
    return coverAsset?.url || project.project_assets[0]?.url || '';
  };

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => getProjectCategories(project).includes(activeFilter));

  const filters = [
    { name: 'all', label: 'All' },
    { name: 'Modern', label: 'Modern' },
    { name: 'Classic', label: 'Classic' },
    { name: 'Natural', label: 'Natural' },
    { name: 'Unique', label: 'Unique' },
    { name: 'Spa', label: 'Spa' }
  ];

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
    <>
      {showFilters && (
        <AnimatedSection className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap justify-center gap-2 bg-secondary-100 p-2">
            {filters.map(filter => (
              <button
                key={filter.name}
                className={`px-4 py-2 text-sm font-medium transition-all ${
                  activeFilter === filter.name
                    ? 'bg-white shadow-md text-secondary-900'
                    : 'text-secondary-700 hover:text-secondary-900'
                }`}
                onClick={() => setActiveFilter(filter.name)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </AnimatedSection>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full text-center py-10">
            <p className="text-lg text-secondary-600">No projects found matching these criteria.</p>
          </div>
        ) : (
          filteredProjects.map((project, index) => (
            <AnimatedSection key={project.id} delay={0.1 * index} className="group">
              <Link to={`/portfolio/${project.slug}`}>
                <div className="bg-white shadow-lg border border-black md:border-0 md:hover:border md:hover:border-primary-600 transition-all duration-300">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={getCoverImage(project)} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-sm tracking-[0.15em] text-secondary-900 mb-2 uppercase">
                      {project.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-secondary-600 mb-1">{project.type}</p>
                        <p className="text-secondary-500 text-sm font-light">{project.location}</p>
                      </div>
                      <span className="text-primary-600 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                        <ArrowRight size={20} />
                      </span>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {getProjectCategories(project).slice(0, 3).map((category, idx) => (
                        <span 
                          key={idx} 
                          className="inline-block px-3 py-1 text-xs bg-primary-100 text-primary-600"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))
        )}
      </div>
    </>
  );
};

export default ProjectGrid;