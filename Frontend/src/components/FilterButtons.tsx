import { FilterType } from '../types';
import { ButtonGroup, Button } from 'react-bootstrap';

interface FilterButtonsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
  completedCount: number;
  totalCount: number;
}

function FilterButtons({
  currentFilter,
  onFilterChange,
  activeCount,
  completedCount,
  totalCount,
}: FilterButtonsProps) {
  return (
    <ButtonGroup className="mb-3">
      <Button
        variant={currentFilter === 'all' ? 'primary' : 'outline-primary'}
        onClick={() => onFilterChange('all')}
      >
        All ({totalCount})
      </Button>
      <Button
        variant={currentFilter === 'active' ? 'primary' : 'outline-primary'}
        onClick={() => onFilterChange('active')}
      >
        Active ({activeCount})
      </Button>
      <Button
        variant={currentFilter === 'completed' ? 'primary' : 'outline-primary'}
        onClick={() => onFilterChange('completed')}
      >
        Completed ({completedCount})
      </Button>
    </ButtonGroup>
  );
}

export default FilterButtons;
