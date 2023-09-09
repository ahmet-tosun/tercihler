import React from 'react';
import { Table } from 'antd';

import data from '../../mocks/data.json';

const columns = [
  {
    title: 'Program Kodu',
    dataIndex: 'Program Kodu',

    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Üniversite Adı',
    dataIndex: 'Üniversite Adı',
    filters: [
      data.map((item) => item['Üniversite Adı']),
      {
        text: data
          .map((item) => item['Üniversite Adı'])
          .filter((value, index, array) => {
            return array.indexOf(value) === index;
          }),
        value: data
          .map((item) => item['Üniversite Adı'])
          .filter((value, index, array) => {
            return array.indexOf(value) === index;
          }),
      },
    ],

    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
const FilteredTable = () => {
  return <Table columns={columns} dataSource={data} onChange={onChange} />;
};
export default FilteredTable;
