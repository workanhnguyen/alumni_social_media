import {
  Avatar,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { logoLong } from "../assets";
import { Link } from "react-router-dom";

const roles = [
  {
    icon: "https://img.freepik.com/premium-vector/empty-face-icon-avatar-with-red-hair-vector-illustration_601298-13418.jpg?w=2000",
    name: "Giảng viên",
    url: "/login/lecturer",
  },
  {
    icon: "https://img.freepik.com/premium-vector/empty-face-icon-avatar-with-red-hair-vector-illustration_601298-13418.jpg?w=2000",
    name: "Cựu sinh viên",
    url: "/login/alumni",
  },
];

const ChooseRole = () => {
  return (
    <div className="w-full h-screen fixed bg-cover-bg bg-cover">
      <Container>
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <div className="w-full fixed top-8 max-sm:left-6 sm:left-20">
            <img src={logoLong} alt="Logo OU" className="max-sm:w-52 sm:w-80" />
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="max-sm:w-full max-md:w-3/4 md:w-3/4 lg:w-1/2 mt-6 flex flex-col justify-center gap-6">
              <Typography variant="h4" className="text-white">
                Bạn là ...?
              </Typography>
              {roles.map((role, index) => (
                <Link to={role.url}>
                  <Paper
                    variant="outlined"
                    elevation={2}
                    key={index}
                    fullWidth
                    className="w-full flex items-center px-6 py-2 cursor-pointer text-white bg-primary hover:bg-primaryHover hover:text-white hover:transition ease-linear duration-300"
                  >
                    <Avatar alt="Remy Sharp" src={role.icon} />
                    <p className="ml-3">{role.name}</p>
                  </Paper>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ChooseRole;
