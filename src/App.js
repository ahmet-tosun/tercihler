import { Table } from 'antd';
import FilteredTable from './components/FilteredTable/FilteredTable';
import SearchComponent from './components/SearchComponent/SearchComponent';
import SearchComponentTable from './components/SearchComponentTable/SearchComponentTable';

import data from './mocks/data.json';

function App() {
  console.log(
    'component array',
    new Array(
      (
        <SearchComponent
          title='test'
          dataIndex='Üniversite Adı'
          key='Üniversite Adı'
          width='25%'
        />
      ).props
    )
  );
  return (
    <div>
      <SearchComponentTable />
      <Table
        columns={
          new Array(
            (
              <SearchComponent
                title='test'
                dataIndex='Üniversite Adı'
                key='Üniversite Adı'
                width='25%'
              />
            )
          ).props
        }
        dataSource={data}
      />

      <FilteredTable />
    </div>
  );
}

export default App;
