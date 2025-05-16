import { Tabs } from "antd";
import TheaterTable from "./TheaterTable";
import MovieList from "./MovieList";

const Admin = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Movies",
      children: <MovieList />,
    },
    {
      key: "2",
      label: "Theatre Requests",
      children: <TheaterTable />,
    },
  ];

  return (
    <>
      <h1>Welcome to Admin panel!</h1>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  );
};

export default Admin;
