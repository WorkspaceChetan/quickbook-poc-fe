import axios from "axios";

class TokenServices {
  static RefreshToken = async (tokenid) => {
    const url = `${process.env.REACT_APP_BE_URL}/qb/refresh_token?tokenid=${tokenid}`;
    const config = {};
    return await axios.get(url, undefined, config);
  };

  static sync = async (tblname, id, tokenid) => {
    const url = `${process.env.REACT_APP_BE_URL}/qb/sync?tbl=${tblname}&id=${id}`;
    const config = {
      headers: {
        authorization: tokenid,
      },
    };
    return await axios.get(url, config);
  };
}

export default TokenServices;
