import React, { useEffect, useState } from "react";

export const SimpleData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BE_URL}/api/account`);
        const jsonData = await response.json();

        // console.log(jsonData);
        setData(jsonData.data);
        console.log(jsonData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  //   console.log(data);
  return (
    <div>
      <table>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
