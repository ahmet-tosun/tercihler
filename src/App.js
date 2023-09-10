import { Table } from 'antd';
import FilteredTable from './components/FilteredTable/FilteredTable';
import SearchComponent from './components/SearchComponent/SearchComponent';
import SearchComponentTable from './components/SearchComponentTable/SearchComponentTable';

import data from './mocks/data.json';

function App() {
  return (
    <div>
      <SearchComponentTable />
    </div>
  );
}

export default App;
