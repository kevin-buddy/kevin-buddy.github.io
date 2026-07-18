import PortfolioClient from '@/components/PortfolioClient'; 
import type { Project } from '@/components/PortfolioClient'; 

export default async function PortfolioPage() {
  const apiUrl = process.env.API_URL as string;
  const token = process.env.AUTH_TOKEN as string;
  let projects: Project[] = [];

  if (token) {
    const response = await fetch(`${apiUrl}/portfolio`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (response.status === 200) {
      const result = await response.json();
      if (result.data) {
        projects = result.data;
      }
    }
  }
  return <PortfolioClient projects={projects} />;
}