import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Input, message, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { getAllMovies } from "../apicalls/movie";

function Home() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllMovies();
      setMovies(response.data);
      setFilteredMovies(response.data);
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      message.error("Failed to fetch movies");
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Row className="justify-content-center w-100 mt-3">
        <Col xs={24} lg={12}>
          <Input
            placeholder="Search for Movies"
            type="text"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            suffix={<SearchOutlined />}
          />
          <br />
          <br />
        </Col>
      </Row>

      <Row
        className="justify-content-center"
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Col
              className="gutter-row mb-5"
              key={movie._id}
              xs={24}
              sm={24}
              md={12}
              lg={10}
            >
              <div className="text-center">
                <img
                  onClick={() =>
                    navigate(
                      `/movie/${movie._id}?date=${moment().format(
                        "YYYY-MM-DD"
                      )}`
                    )
                  }
                  className="cursor-pointer"
                  src={movie.poster}
                  alt="Movie Poster"
                  width={200}
                  height={300}
                  style={{ borderRadius: "8px" }}
                />
                <h3
                  onClick={() =>
                    navigate(
                      `/movie/${movie._id}?date=${moment().format(
                        "YYYY-MM-DD"
                      )}`
                    )
                  }
                  className="cursor-pointer"
                >
                  {movie.title}
                </h3>
              </div>
            </Col>
          ))
        ) : (
          <p className="text-center">No movies found</p>
        )}
      </Row>
    </>
  );
}

export default Home;
