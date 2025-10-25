import { TaskItem } from '../types';
import { ListGroup, Button, Form } from 'react-bootstrap';

interface TaskListProps {
  tasks: TaskItem[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  return (
    <ListGroup>
      {tasks.map((task) => (
        <ListGroup.Item
          key={task.id}
          className="d-flex justify-content-between align-items-center"
        >
          <Form.Check
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => onToggle(task.id)}
            label={
              <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                {task.description}
              </span>
            }
          />
          <Button variant="danger" size="sm" onClick={() => onDelete(task.id)}>
            Delete
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default TaskList;
