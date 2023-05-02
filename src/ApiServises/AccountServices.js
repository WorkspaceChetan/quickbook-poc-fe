import axios from "axios";

class AccountServices {
  static getAll = async () => {
    const url = `${process.env.REACT_APP_BE_URL}/api/account`;
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    return await axios.get(url, undefined, config);
  };

  static add = async (data) => {
    const url = `${process.env.REACT_APP_BE_URL}/api/account`;
    // console.log("addAccount", data);
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    return await axios.post(url, data, config);
  };

  static update = async (data) => {
    const url = `${process.env.REACT_APP_BE_URL}/api/account/` + data.id;
    // console.log("UpdateAccount", data);
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    if (data.id) delete data.id;
    return await axios.put(url, data, config);
  };

  static getById = async (id) => {
    const url = `${process.env.REACT_APP_BE_URL}/api/account/${id}`;
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    return await axios.get(url, config);
  };

  static delete = async (id) => {
    const url = `${process.env.REACT_APP_BE_URL}/api/account/` + id;
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    return await axios.delete(url, undefined, config);
  };
}

export default AccountServices;
