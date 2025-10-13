import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProjects, Project } from '../api/project';
import CreateProjectModal from '../components/CreateProjectModal';

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      setError('');
      const userProjects = await getUserProjects();
      setProjects(userProjects);

      // If user has no projects, open create modal automatically
      if (userProjects.length === 0) {
        setIsModalOpen(true);
      }
    } catch (err: any) {
      console.error('Error loading projects:', err);
      setError('Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleProjectClick = (projectId: number) => {
    navigate(`/editor?project=${projectId}`);
  };

  const handleProjectCreated = () => {
    loadProjects();
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: `hsl(var(--bg-secondary))`,
      padding: '2rem',
      transition: 'background-color 0.3s ease',
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    header: {
      marginBottom: '2rem',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '700' as const,
      color: `hsl(var(--text-primary))`,
      marginBottom: '0.5rem',
    },
    subtitle: {
      fontSize: '1.1rem',
      color: `hsl(var(--text-secondary))`,
    },
    createButton: {
      padding: '1rem 2rem',
      backgroundColor: `hsl(var(--primary))`,
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600' as const,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginTop: '1rem',
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px',
    },
    loadingText: {
      fontSize: '1.2rem',
      color: `hsl(var(--text-secondary))`,
    },
    errorContainer: {
      padding: '2rem',
      backgroundColor: 'rgba(220, 38, 38, 0.1)',
      color: '#dc2626',
      borderRadius: '12px',
      border: '1px solid rgba(220, 38, 38, 0.2)',
    },
    projectsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '1.5rem',
      marginTop: '2rem',
    },
    projectCard: {
      backgroundColor: `hsl(var(--bg-primary))`,
      border: `1px solid hsl(var(--border-light))`,
      borderRadius: '12px',
      padding: '1.5rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    projectName: {
      fontSize: '1.25rem',
      fontWeight: '600' as const,
      color: `hsl(var(--text-primary))`,
      marginBottom: '0.5rem',
    },
    projectSlug: {
      fontSize: '0.875rem',
      color: `hsl(var(--text-secondary))`,
      marginBottom: '1rem',
    },
    projectDate: {
      fontSize: '0.875rem',
      color: `hsl(var(--text-secondary))`,
    },
    emptyState: {
      textAlign: 'center' as const,
      padding: '4rem 2rem',
      backgroundColor: `hsl(var(--bg-primary))`,
      border: `2px dashed hsl(var(--border-light))`,
      borderRadius: '12px',
    },
    emptyTitle: {
      fontSize: '1.5rem',
      fontWeight: '600' as const,
      color: `hsl(var(--text-primary))`,
      marginBottom: '0.5rem',
    },
    emptyText: {
      fontSize: '1rem',
      color: `hsl(var(--text-secondary))`,
      marginBottom: '1.5rem',
    },
  };

  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <p style={styles.loadingText}>Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>My Projects</h1>
          <p style={styles.subtitle}>Manage and edit your landing pages</p>
          {projects.length > 0 && (
            <button
              style={styles.createButton}
              onClick={() => setIsModalOpen(true)}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              + Create New Project
            </button>
          )}
        </div>

        {error && (
          <div style={styles.errorContainer}>
            <p>{error}</p>
          </div>
        )}

        {projects.length === 0 ? (
          <div style={styles.emptyState}>
            <h2 style={styles.emptyTitle}>No projects yet</h2>
            <p style={styles.emptyText}>Create your first landing page to get started</p>
          </div>
        ) : (
          <div style={styles.projectsGrid}>
            {projects.map((project) => (
              <div
                key={project.id}
                style={styles.projectCard}
                onClick={() => handleProjectClick(project.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h3 style={styles.projectName}>{project.name}</h3>
                <p style={styles.projectSlug}>/{project.slug}</p>
                <p style={styles.projectDate}>
                  Created: {new Date(project.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProjectCreated={handleProjectCreated}
      />
    </div>
  );
};

export default ProjectsPage;
