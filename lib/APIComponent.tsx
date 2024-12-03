import { useEffect } from "react";
import axios from "axios";
import { Button } from "@sanity/ui";
import { addData } from "@/utils/firebase/firestore";
import { logout } from "@/utils/firebase/authentication";

const RestAPI = () => {
  const apiUrl = "http://164.68.103.85:9969";
  const clientId = "2EsjB1zbN7hj61BMpwU6zptsSH87wxWKpfRPH3jx";
  const clientSecret = "ElQOBZ1w5hvsSaVUlUMP9LZgOKszpJ0yBm1ykrSE";

  const authenticate = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/authentication/oauth2/token`,
        { client_id: clientId, client_secret: clientSecret },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": apiUrl,
            "Access-Control-Request-Headers": "Content-Type, Authorization",
            // Add any additional headers here
          },
        }
      );

      const accessToken = response.data.access_token;
      return accessToken;
    } catch (error) {
      console.error("Authentication error:", error);
      throw error;
    }
  };

  const execute = async (
    endpoint: string,
    type: string = "GET",
    data: any = {}
  ) => {
    try {
      const accessToken = await authenticate();
      const headers = { Authorization: `Bearer ${accessToken}` };
      const fullUrl = `${apiUrl}${endpoint}`;

      let response;
      if (type === "POST") {
        response = await axios.post(fullUrl, data, { headers });
      } else if (type === "PUT") {
        response = await axios.put(fullUrl, data, { headers });
      } else if (type === "DELETE") {
        response = await axios.delete(fullUrl, { headers, data });
      } else {
        response = await axios.get(fullUrl, { headers, params: data });
      }

      return response.data;
    } catch (error) {
      console.error("API request error:", error);
      throw error;
    }
  };

  useEffect(() => {
    // Test API
    const testApi = async () => {
      try {
        const result1 = await execute("/api/v1");
        console.log("API /api/v1:", result1);

        const result2 = await execute("/api/v1/user");
        console.log("API /api/v1/user:", result2);

        // Continue with other API requests...
      } catch (error) {
        console.error("Error testing API:", error);
      }
    };

    testApi();

    // Sample query
    const searchData = {
      model: "res.partner",
      domain: JSON.stringify([["parent_id.name", "=", "Azure Interior"]]),
      fields: JSON.stringify(["name", "image_small"]),
    };

    execute("/api/v1/search_read", "GET", searchData)
      .then((result) => {
        const modifiedResult = result.map((entry: any) => ({
          ...entry,
          image_small: (entry.image_small || "").slice(0, 5) + "...",
        }));
        console.log("Search read result:", modifiedResult);
      })
      .catch((error) => console.error("Error in search read:", error));
  }, []);

  return (
    <button
      onClick={async () => {
        logout();
      }}
    >
      Test
    </button>
  );
};

export default RestAPI;

// const RestAPI = () => {
//   const apiUrl = "http://164.68.103.85:9969";
//   const clientId = "2EsjB1zbN7hj61BMpwU6zptsSH87wxWKpfRPH3jx";
//   const clientSecret = "ElQOBZ1w5hvsSaVUlUMP9LZgOKszpJ0yBm1ykrSE";

//   const authenticate = async () => {
//     try {
//       const response = await axios.post(
//         ${apiUrl}/api/v1/authentication/oauth2/token,
//         { client_id: clientId, client_secret: clientSecret },
//         { withCredentials: true }
//       );

//       const accessToken = response.data.access_token;
//       return accessToken;
//     } catch (error) {
//       console.error("Authentication error:", error);
//       throw error;
//     }
//   };

//   const execute = async (endpoint, type = "GET", data = {}) => {
//     try {
//       const accessToken = await authenticate();
//       const headers = { Authorization: Bearer ${accessToken} };
//       const fullUrl = ${apiUrl}${endpoint};

//       let response;
//       if (type === "POST") {
//         response = await axios.post(fullUrl, data, { headers });
//       } else if (type === "PUT") {
//         response = await axios.put(fullUrl, data, { headers });
//       } else if (type === "DELETE") {
//         response = await axios.delete(fullUrl, { headers, data });
//       } else {
//         response = await axios.get(fullUrl, { headers, params: data });
//       }

//       return response.data;
//     } catch (error) {
//       console.error("API request error:", error);
//       throw error;
//     }
//   };

//   useEffect(() => {
//     // Test API
//     const testApi = async () => {
//       try {
//         const result1 = await execute("/api/v1");
//         console.log("API /api/v1:", result1);

//         const result2 = await execute("/api/v1/user");
//         console.log("API /api/v1/user:", result2);

//         // Continue with other API requests...
//       } catch (error) {
//         console.error("Error testing API:", error);
//       }
//     };

//     testApi();

//     // Sample query
//     const searchData = {
//       model: "res.partner",
//       domain: JSON.stringify([["parent_id.name", "=", "Azure Interior"]]),
//       fields: JSON.stringify(["name", "image_small"]),
//     };

//     execute("/api/v1/search_read", "GET", searchData)
//       .then((result) => {
//         const modifiedResult = result.map((entry) => ({
//           ...entry,
//           image_small: (entry.image_small || "").slice(0, 5) + "...",
//         }));
//         console.log("Search read result:", modifiedResult);
//       })
//       .catch((error) => console.error("Error in search read:", error));
//   }, []);

//   return <div>React Component</div>;
// };

// export default RestAPI;
