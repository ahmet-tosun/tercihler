import { SearchOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table } from 'antd';

import data from '../../mocks/data.json';

const SearchComponentTable = () => {
  const [searchAlani, setSearchAlani] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchAlani(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchAlani('');
  };

  const textDropdown =
    (dataIndex) =>
    ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) =>
      (
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
          <Space>
            <Button
              type='primary'
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size='small'
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size='small'
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
            <Button
              type='link'
              size='small'
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchAlani(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type='link'
              size='small'
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      );

  const numberDropdown =
    (dataIndex) =>
    ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) =>
      (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
        </div>
      );

  const greaterThanFilter = (value, record, dataIndex) =>
    parseFloat(record[dataIndex]) > parseFloat(value);
  const lessThanFilter = (value, record, dataIndex) =>
    parseFloat(record[dataIndex]) < parseFloat(value);
  const roundedValueEqual = (value, record, dataIndex) =>
    parseInt(record[dataIndex]) === parseInt(value);
  const includesFilter = (value, record, dataIndex) =>
    record[dataIndex].toString().toLowerCase().includes(value.toLowerCase());

  const genericFilter = (dataIndex, filterFunc, dropdownFunc) => ({
    filterDropdown: dropdownFunc(dataIndex),
    onFilter: (value, record) => filterFunc(value, record, dataIndex),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchAlani]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Üniversite Adı',
      dataIndex: 'Üniversite Adı',
      key: 'Üniversite Adı',
      width: '30%',
      ...genericFilter('Üniversite Adı', includesFilter, textDropdown),
    },
    {
      title: 'Program Adı',
      dataIndex: 'Program Adı',
      key: 'Program Adı',
      width: '30%',
      ...genericFilter('Program Adı', includesFilter, textDropdown),
    },
    {
      title: 'En Küçük Puanı',
      dataIndex: 'En Küçük Puan',
      key: 'En Küçük Puan',
      width: '30%',
      ...genericFilter('En Küçük Puan', greaterThanFilter, numberDropdown),
    },
  ];

  console.log('table', columns);

  return <Table columns={columns} dataSource={data} />;
};

export default SearchComponentTable;
