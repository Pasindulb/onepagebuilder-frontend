import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../api/project';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated: () => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ isOpen, onClose, onProjectCreated }) => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectName.trim()) {
      setError('Project name is required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const project = await createProject({
        name: projectName.trim(),
        description: description.trim(),
      });

      // Save project to localStorage for quick access
      localStorage.setItem('currentProject', JSON.stringify(project));
      
      // Close modal and redirect to editor
      onClose();
      onProjectCreated();
      navigate(`/editor?project=${project.id}`);
    } catch (err: any) {
      console.error('Error creating project:', err);
      setError(err.response?.data?.message || 'Failed to create project. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setProjectName('');
      setDescription('');
      setError('');
      onClose();
    }
  };

  if (!isOpen) return null;

  const styles = {
    overlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)',
    },
    modal: {
      backgroundColor: `hsl(var(--bg-primary))`,
      borderRadius: '12px',
      padding: '2rem',
      width: '90%',
      maxWidth: '500px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      border: `1px solid hsl(var(--border-light))`,
      transition: 'all 0.3s ease',
    },
    header: {
      marginBottom: '1.5rem',
    },
    title: {
      fontSize: '1.75rem',
      fontWeight: '700' as const,
      color: `hsl(var(--text-primary))`,
      marginBottom: '0.5rem',
    },
    subtitle: {
      fontSize: '0.95rem',
      color: `hsl(var(--text-secondary))`,
    },
    form: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1.25rem',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.5rem',
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: '600' as const,
      color: `hsl(var(--text-primary))`,
    },
    input: {
      padding: '0.75rem',
      fontSize: '1rem',
      backgroundColor: `hsl(var(--bg-secondary))`,
      color: `hsl(var(--text-primary))`,
      border: `1px solid hsl(var(--border-light))`,
      borderRadius: '8px',
      outline: 'none',
      transition: 'all 0.2s ease',
    },
    textarea: {
      padding: '0.75rem',
      fontSize: '1rem',
      backgroundColor: `hsl(var(--bg-secondary))`,
      color: `hsl(var(--text-primary))`,
      border: `1px solid hsl(var(--border-light))`,
      borderRadius: '8px',
      outline: 'none',
      minHeight: '100px',
      resize: 'vertical' as const,
      transition: 'all 0.2s ease',
      fontFamily: 'inherit',
    },
    error: {
      padding: '0.75rem',
      backgroundColor: 'rgba(220, 38, 38, 0.1)',
      color: '#dc2626',
      borderRadius: '8px',
      fontSize: '0.875rem',
      border: '1px solid rgba(220, 38, 38, 0.2)',
    },
    buttonGroup: {
      display: 'flex',
      gap: '1rem',
      marginTop: '0.5rem',
    },
    button: {
      flex: 1,
      padding: '0.875rem 1.5rem',
      fontSize: '1rem',
      fontWeight: '600' as const,
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      outline: 'none',
    },
    cancelButton: {
      backgroundColor: `hsl(var(--bg-secondary))`,
      color: `hsl(var(--text-primary))`,
      border: `1px solid hsl(var(--border-light))`,
    },
    submitButton: {
      backgroundColor: `hsl(var(--primary))`,
      color: 'white',
    },
  };

  return (
    <div style={styles.overlay} onClick={handleClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>Create New Project</h2>
          <p style={styles.subtitle}>Start building your landing page</p>
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="projectName">
              Project Name *
            </label>
            <input
              id="projectName"
              type="text"
              style={styles.input}
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="My Awesome Landing Page"
              disabled={isLoading}
              autoFocus
              onFocus={(e) => {
                e.target.style.borderColor = `hsl(var(--primary))`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = `hsl(var(--border-light))`;
              }}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="description">
              Description (Optional)
            </label>
            <textarea
              id="description"
              style={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of your project..."
              disabled={isLoading}
              onFocus={(e) => {
                e.target.style.borderColor = `hsl(var(--primary))`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = `hsl(var(--border-light))`;
              }}
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <div style={styles.buttonGroup}>
            <button
              type="button"
              style={{ ...styles.button, ...styles.cancelButton }}
              onClick={handleClose}
              disabled={isLoading}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `hsl(var(--border-light))`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `hsl(var(--bg-secondary))`;
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ ...styles.button, ...styles.submitButton }}
              disabled={isLoading}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.opacity = '0.9';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {isLoading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;
