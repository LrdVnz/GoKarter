import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const GoogleLogin = () => {
  // const { currentAuthor, authToken } = useParams();
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    let currentUser = searchParams.get("currentUser");
    const authToken = searchParams.get("authToken");

    currentUser = JSON.parse(currentUser)
    
    console.log(currentUser);
    console.log(authToken);

    localStorage.setItem("accessToken", authToken);
    localStorage.setItem("currentUser", currentUser);

    navigate("/");
  });

  return <p> Successfully logged in with google. </p>;
};

export default GoogleLogin;
