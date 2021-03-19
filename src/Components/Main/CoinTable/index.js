import React, { useEffect, useState } from "react";
import { Button, Input, Table } from "antd";
import axios from "axios";
import moment from "moment";
import {
  CaretUpOutlined,
  CaretDownOutlined
} from '@ant-design/icons';

const CoinTable = (props) => {
    const [coinData, setCoinData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [sortBy, setSortBy] = useState('abv_name');
    const [ascend, setAscend] = useState(true);

  useEffect(() => {
    getCoinList(searchText, sortBy, ascend);
  }, []);

  const getCoinList = (sText, sBy, sAscend) => {
    setLoading(true);
    axios
      .get(`/api/getCoins?searchText=${sText}&sortBy=${sBy}&ascend=${sAscend}`)
      .then((resp) => {
        setLoading(false);
        setCoinData(resp.data);
      })
      .catch((err) => {
        setLoading(false);
        console.error(`Error getting tags: ${JSON.stringify(err)}`);
      });
  };

  const sortButtons = [
    {name: "Abv Name", value: 'abv_name'},
    {name: "SQL ID", value: "id"},
    {name: "Full Name", value: "name"},
    {name: "Public Date", value: "public_date"}
  ]

  const tableHeaders = [
    {
      title: "SQL ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Abv Name",
      dataIndex: "abv_name",
      key: "abv_name",
    },
    {
      title: "Full Name",
      key: "name",
      dataIndex: "name"
    },
    {
        title: "Date Went Public",
        key: "public_date",
        dataIndex: "public_date",
        render: (t) => {
            if(t) {
                return moment(new Date(t)).format('MMMM DD, YYYY')
            } return null;
        }
    }
  ];

  const sortHandler = (val) => {
    if(sortBy === val) {
      getCoinList(searchText, val, !ascend);
      setAscend(!ascend);
      setSortBy(val);
    } else {
      setSortBy(val);
      getCoinList(searchText, val, ascend);
    }

  }



  return (
    <div
      style={{
        margin: "15px",
        maxHeight: "100%",
        overflowY: 'scroll'
      }}
    >
        <div>
            <span
              style={{
                  marginTop: "15px",
                  marginBottom: "15px",
              }}
              >
              A list of coins...
            </span>
        </div>
        <div style={{
          marginTop: '15px',
          marginBottom: '15px'
        }}>
          {sortButtons.map((btn, ind) => {
            return (
              <Button key={btn.value} onClick={() => sortHandler(btn.value)} type={sortBy === btn.value ? "primary" : "default"}>
                {btn.name} {
                  sortBy === btn.value ? 
                    ascend ? <CaretUpOutlined /> : <CaretDownOutlined />
                : null}
              </Button>
            )
          })}
        </div>
        <Input.Search
            style={{
                width: '50%',
                minWidth: '100px',
                marginTop: '15px',
                marginBottom: '15px'
            }}
            value={searchText}
            size="large"
            onChange={e => setSearchText(e.target.value)}
            onSearch={() => getCoinList(searchText, sortBy, ascend)}
        />
          <Table
            loading={loading}
            dataSource={coinData}
            columns={tableHeaders}
            pagination={false}
          />
    </div>
  );
};
export default CoinTable;
