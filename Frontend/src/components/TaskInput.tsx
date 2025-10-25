import { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

interface TaskInputProps {
  onAdd: (description: string) => void;
}

function TaskInput({ onAdd }: TaskInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input.trim());
      setInput('');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" variant="primary">
          Add
        </Button>
      </InputGroup>
    </Form>
  );
}

export default TaskInput;
