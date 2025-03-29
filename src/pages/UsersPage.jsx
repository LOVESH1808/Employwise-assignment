import { Avatar, Box, Button, Card, Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../components/User";

const UsersPage = () => {
  const [data, setData] = useState([]);
  const history = useNavigate();
  const Toast = useToast();
  const [currPage, setCurrPage] = useState();
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      history("/");
    }
  }, [history]);

  const token = JSON.parse(localStorage.getItem("token"));

  const handleUpdateUser = (updatedUser) => {
    setData((prevData) =>
      prevData.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const handleDeleteUser = (id) => {
    setData((prevData) => prevData.filter((user) => user.id !== id));
  };
  const getUsers = async (page) => {
    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response.data.data);
      setCurrPage(response.data.page);
      setTotalPages(response.data.total_pages);

    } catch (err) {
      Toast({
        title: "Error Occurred!",
        description: err.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    getUsers(currPage);
  }, [currPage]);

  const handleClickLogout = () => {
    localStorage.removeItem("token");
    history("/");
    
    Toast({
      title: "Logout Successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  }

  return (
    <>
      <Box>
        <Button onClick={handleClickLogout}>
          Logout
        </Button>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="light-cyan"
        w="100%"
        p="5px 10px"
        borderWidth="5px"
        flexWrap="wrap"
        gap="20px"
      >
        
        <Box
          display="flex"
          justifyContent="space-around"
          flexWrap="wrap"
          gap="20px"
        >
          {data?.length > 0 ? (
            data.map((user) => (
              <User
                key={user.id}
                user={user}
                onDelete={handleDeleteUser}
                onUpdate={handleUpdateUser}
              />
            ))
          ) : (
            <Box>No users found</Box>
          )}
        </Box>
        <Box mt="20px" display="flex" gap="10px" alignItems="center">
          <Button
            onClick={() => setCurrPage((prev) => Math.max(prev - 1, 1))}
            isDisabled={currPage === 1}
          >
            Previous
          </Button>
          <Box fontWeight="bold" p="2">
            Page {currPage} of {totalPages}
          </Box>
          <Button
            onClick={() => setCurrPage((prev) => Math.min(prev + 1, totalPages))}
            isDisabled={currPage === totalPages}
          >
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default UsersPage;
