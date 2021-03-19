import React, { useEffect, useState } from "react";
import { Button, Descriptions, Input, Popconfirm, Table } from "antd";
import axios from "axios";

const Tags = (props) => {
  const [tagData, setTagData] = useState([]);
  const [tagName, setTagName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTagList();
  }, []);

  const getTagList = () => {
    setLoading(true);
    axios
      .get("/api/getTags")
      .then((resp) => {
        setLoading(false);
        setTagData(resp.data);
      })
      .catch((err) => {
        setLoading(false);
        console.error(`Error getting tags: ${JSON.stringify(err)}`);
      });
  };

  const saveTag = () => {
    setLoading(true);
    if (tagName.length > 0) {
      axios
        .post(`/api/createTag?name=${tagName}`)
        .then(() => {
          setLoading(false);
          setTagName("");
          getTagList();
        })
        .catch((err) => {
          setLoading(false);
          console.error(`Error saving tag! ${JSON.stringify(err)}`);
        });
    } else {
      /// don't
    }
  };

  const deleteTag = (id) => {
    setLoading(true);
    axios
      .delete(`/api/deleteTag?id=${id}`)
      .then(getTagList)
      .catch((err) => {
        setLoading(false);
        console.error(`Error deleting tag! ${JSON.stringify(err)}`);
      });
  };

  const tableHeaders = [
    {
      title: "SQL ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tag Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Delete",
      key: "delete",
      render: (t, o) => {
        return (
          <Popconfirm key={o.id} title="Delete tag?" onConfirm={() => deleteTag(o.id)}>
            <Button danger>DELETE</Button>
          </Popconfirm>
        );
      },
    },
  ];


  return (
    <div
      style={{
        margin: "15px",
      }}
    >
      <span
        style={{
          marginTop: "15px",
          marginBottom: "15px",
        }}
      >
        A list of tags...
      </span>
          <Table
            loading={loading}
            dataSource={tagData}
            columns={tableHeaders}
            pagination={false}
          />
          <div>
            <Descriptions style={{ marginTop: "50px" }} title="Create New Tag:">
              <Descriptions.Item>
                <Input
                  style={{
                    marginRight: "15px",
                    width: "50%",
                    minWidth: "100px",
                  }}
                  placeholder="Enter Tag Name"
                  onChange={(e) => setTagName(e.target.value)}
                  value={tagName}
                />
                <Button loading={loading} onClick={saveTag} type="primary">
                  SAVE
                </Button>
              </Descriptions.Item>
            </Descriptions>
          </div>
    </div>
  );
};
export default Tags;
