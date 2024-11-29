import { Task } from '@/types';
import { Badge } from './ui/Badge';
import { formatDate } from '@/lib/formatters';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/Card';

interface TaskItemProps {
  title: string;
  status: string;
  dueDate: Date;
}

function TaskItem({ title, status, dueDate }: TaskItemProps) {
  console.log(dueDate);

  return (
    <li>
      <Card className="p-1">
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div>
            <div className="flex flex-row gap-2">
              <CardTitle className="text-xl md:text-2xl">{title}</CardTitle>
              <div className="h-auto flex items-center">
                <Badge>{status}</Badge>
              </div>
            </div>
            {dueDate ? (
              <CardDescription className="text-base md:text-md">
                {formatDate(dueDate)}
              </CardDescription>
            ) : (
              <p>No Due Date Defined.</p>
            )}
          </div>
        </CardHeader>
      </Card>
    </li>
  );
}

interface TaskListProps {
  projectTitle: string;
  tasks: Array<Task>;
}

export default function TaskList({ projectTitle, tasks }: TaskListProps) {
  return (
    <div className="p-4 flex flex-col gap-2 w-full">
      <h2 className="font-bold text-xl text-white">{projectTitle}</h2>
      <ul className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            title={task.title}
            status={task.status}
            dueDate={task.dueDate}
          />
        ))}
      </ul>
    </div>
  );
}
