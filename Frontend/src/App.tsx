import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { taskService } from './taskService';
import { TaskItem, FilterType } from './types';
import TaskList from './components/TaskList';
import TaskInput from './components/TaskInput';
import FilterButtons from './components/FilterButtons';

function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) setTasks(JSON.parse(savedTasks));
      const apiTasks = await taskService.getAllTasks();
      setTasks(apiTasks);
    } catch (err) {
      setError('Failed to load tasks from API. Using local storage.');
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) setTasks(JSON.parse(savedTasks));
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (description: string) => {
    try {
      const newTask = await taskService.createTask(description);
      setTasks([...tasks, newTask]);
      setError(null);
    } catch {
      const tempTask: TaskItem = {
        id: Date.now().toString(),
        description,
        isCompleted: false,
      };
      setTasks([...tasks, tempTask]);
      setError('Task added locally. API connection failed.');
    }
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    try {
      const updatedTask = await taskService.updateTask(id, {
        ...task,
        isCompleted: !task.isCompleted,
      });
      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
      setError(null);
    } catch {
      setTasks(
        tasks.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
      );
      setError('Task updated locally. API connection failed.');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
      setError(null);
    } catch {
      setTasks(tasks.filter((t) => t.id !== id));
      setError('Task deleted locally. API connection failed.');
    }
  };

  const getFilteredTasks = (): TaskItem[] => {
    switch (filter) {
      case 'active':
        return tasks.filter((t) => !t.isCompleted);
      case 'completed':
        return tasks.filter((t) => t.isCompleted);
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();
  const activeCount = tasks.filter((t) => !t.isCompleted).length;
  const completedCount = tasks.filter((t) => t.isCompleted).length;

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="mb-3 text-center">Task Manager</h1>
          <p className="text-center text-muted mb-4">Stay organized and productive</p>

          {error && <Alert variant="warning">{error}</Alert>}

          <Card className="p-4 mb-3">
            <TaskInput onAdd={addTask} />
            <FilterButtons
              currentFilter={filter}
              onFilterChange={setFilter}
              activeCount={activeCount}
              completedCount={completedCount}
              totalCount={tasks.length}
            />

            {loading ? (
              <div className="d-flex justify-content-center py-5">
                <Spinner animation="border" role="status" />
              </div>
            ) : filteredTasks.length > 0 ? (
              <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} />
            ) : (
              <p className="text-center text-muted py-4">
                {filter === 'all' ? 'Get started by creating a new task.' : `No ${filter} tasks found.`}
              </p>
            )}
          </Card>

          <p className="text-center text-muted">
            {activeCount} active • {completedCount} completed • {tasks.length} total
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
