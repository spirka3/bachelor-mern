import React from "react";
import Table from "react-bootstrap/Table";
import PageRow from "./PageRow";

const PageTable = ({ pages }) => {
  const columns = [
    {
      field: "title",
      text: "Title",
    },
    {
      field: "path",
      text: "Path",
    },
    {
      field: "description",
      text: "Description",
    },
    {
      field: "published",
      text: "Published",
    },
    {
      field: "content",
      text: "Content",
    },
    {
      field: "created_by",
      text: "Author",
    },
    {
      field: "commits",
      text: "Commits",
    },
  ];

  const Header = () => (
    <thead>
      <tr>
        {columns.map((col, index) => (
          <th key={index}>{col.text}</th>
        ))}
      </tr>
    </thead>
  );

  const Body = () => (
    <tbody>
      {pages.map((page) => (
        <PageRow page={page} pages={pages} columns={columns} />
      ))}
    </tbody>
  );

  return (
    <Table responsive>
      <Header />
      <Body />
    </Table>
  );
};

export default PageTable;
