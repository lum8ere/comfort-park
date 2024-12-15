import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectCard.scss';
import { Project } from 'store/slices/projects/projectsSlice';

export const ProjectCard: React.FC<Project> = memo((project: Project) => {
    const navigate = useNavigate();
    return (
        <div className="service-card-page" style={{ backgroundImage: `url(${project?.ProjectPhoto[0]?.url || ""})`}}>
            <div className="service-card-page_header">
                <h2 className="service-card-page_title">{project.name}</h2>
            </div>
            <button className="service-card-page_button" onClick={() => navigate(`/services/${project.id}`)}>Подробнее</button>
        </div>
    );
});
