import apiClient from './config';

export interface Project {
  id: number;
  userId: number;
  name: string;
  slug: string;
  draftConfig?: string;
  draftUpdatedAt?: string;
  publishedConfig?: string;
  publishedAt?: string;
  liveUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRequest {
  name: string;
  description?: string;
}

export interface SaveDraftRequest {
  config: any;
}

export interface PublishSiteRequest {
  config: any;
}

// Create a new project
export const createProject = async (data: CreateProjectRequest): Promise<Project> => {
  const response = await apiClient.post<Project>('/projects', data);
  return response.data;
};

// Get all projects for the current user
export const getUserProjects = async (): Promise<Project[]> => {
  const response = await apiClient.get<Project[]>('/projects');
  return response.data;
};

// Get a single project by ID
export const getProject = async (projectId: number): Promise<Project> => {
  const response = await apiClient.get<Project>(`/projects/${projectId}`);
  return response.data;
};

// Save draft configuration (auto-save)
export const saveDraft = async (projectId: number, config: any): Promise<void> => {
  await apiClient.post(`/projects/${projectId}/draft`, config);
};

// Publish site
export const publishSite = async (projectId: number, config: any): Promise<{ message: string; liveUrl: string }> => {
  const response = await apiClient.post<{ message: string; liveUrl: string }>(`/projects/${projectId}/publish`, config);
  return response.data;
};

// Get draft configuration
export const getDraft = async (projectId: number): Promise<string> => {
  const response = await apiClient.get<string>(`/projects/${projectId}/draft`);
  return response.data;
};

// Get published configuration
export const getPublished = async (projectId: number): Promise<string> => {
  const response = await apiClient.get<string>(`/projects/${projectId}/published`);
  return response.data;
};
