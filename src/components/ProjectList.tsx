import { Project } from '@/types';

interface ProjectListItemProps {
  title: string;
  taskCount: number;
}

function ProjectListItem({ title, taskCount }: ProjectListItemProps) {
  return (
    <li>
      <div className="flex flex-row gap-2 items-center text-gray-200">
        <span className="text-xl font-semibold">{title}</span>
        <span className="text-sm font-thin">{taskCount}</span>
      </div>
    </li>
  );
}

interface ProjectListProps {
  projects: Array<Project>;
}

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="p-4 flex flex-col gap-2 w-full">
      <h2 className="font-bold text-xl text-white">Projects</h2>
      <ul className="flex flex-col gap-3">
        {projects.map((project) => (
          <ProjectListItem
            key={project._id}
            title={project.title}
            taskCount={project.tasks.length}
          />
        ))}
      </ul>
    </div>
  );
}
