import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Handletoken = () => {
  const [accessToken, setAccessToken] = useState("");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("token");
    setAccessToken(accessToken);
    localStorage.setItem("accesstoken", accessToken);
  }, [location]);

  const styles = {
    container: {
      margin: "10px",
      fontSize: "16px",
      width: "70%",
    },
    "@media (max-width: 768px)": {
      container: {
        fontSize: "12px",
      },
    },
  };
  return <div style={styles.container}>{accessToken}</div>;
};

export default Handletoken;
