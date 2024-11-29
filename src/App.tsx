import { useEffect, useState } from 'react';
import { Project, Task } from './types';
import ProjectList from './components/ProjectList';
import TaskList from './components/TaskList';

async function fetchTaskById(id: string) {
  const res = await fetch(`http://localhost:3000/api/task/${id}`);
  const data = await res.json();

  // ideally, we should add some error handling here.
  // Let's follow the happy path for now.

  return {
    _id: data._id,
    title: data.title,
    description: data.description,
    status: data.status,
    startDate: new Date(data.startDate),
    dueDate: new Date(data.dueDate),
    doneDate: new Date(data.doneDate),
  } satisfies Task;
}

async function fetchRelatedTasks(taskIds: Array<string>) {
  if (taskIds.length === 0) {
    return [];
  }

  const tasks = await Promise.all(
    taskIds.map((taskId) => fetchTaskById(taskId))
  );

  return tasks;
}

async function fetchProjects() {
  try {
    const res = await fetch(`http://localhost:3000/api/project`);
    const data = await res.json();

    if (data.count === 0) {
      return [];
    }

    return data.projects.map((project: Project) => ({
      id: project._id,
      title: project.title,
      description: project.description,
      tasks: project.tasks,
      startDate: new Date(project.startDate),
      dueDate: new Date(project.dueDate),
    })) satisfies Array<Project>;
  } catch (error) {
    console.log(error);
  }
}

export default function App() {
  const [projects, setProjects] = useState<Array<Project>>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentTasks, setCurrentTasks] = useState<Array<Task>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const projectList = await fetchProjects();
      setProjects(projectList);

      if (projectList) {
        const project = projectList[0];
        setCurrentProject(project);

        const tasks = await fetchRelatedTasks(project.tasks);
        setCurrentTasks(tasks);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-500">
      <div className="flex flex-row justify-between">
        <ProjectList projects={projects} />
        {currentProject !== null && (
          <TaskList projectTitle={currentProject.title} tasks={currentTasks} />
        )}
        {currentProject === null && <p>No Project Selected.</p>}
      </div>
    </div>
  );
}
