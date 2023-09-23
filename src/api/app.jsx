const apiUrl = "https://proyecto-backend-sgbienestar.onrender.com/";

function Get({ endpoint, children }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiUrl + endpoint);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }

    fetchData();
  }, [endpoint]);

  return (
    React.createElement(
      React.Fragment,
      null,
      children(data)
    )
  );
}

function Post({ endpoint, data, children }) {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    async function postData() {
      try {
        const response = await fetch(apiUrl + endpoint, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const jsonData = await response.json();
        setResponseData(jsonData);
      } catch (error) {
        console.error("Error al enviar datos:", error);
      }
    }

    postData();
  }, [endpoint, data]);

  return (
    React.createElement(
      React.Fragment,
      null,
      children(responseData)
    )
  );
}

// Uso de los componentes Get y Post
function MyComponent() {
  return (
    React.createElement(
      "div",
      null,
      React.createElement("h1", null, "Obtener datos:"),
      React.createElement(
        Get,
        { endpoint: "endpoint" },
        (data) => (
          React.createElement(
            "pre",
            null,
            JSON.stringify(data, null, 2)
          )
        )
      ),

      React.createElement("h1", null, "Enviar datos:"),
      React.createElement(
        Post,
        { endpoint: "endpoint", data: { /* datos a enviar */ } },
        (responseData) => (
          React.createElement(
            "pre",
            null,
            JSON.stringify(responseData, null, 2)
          )
        )
      )
    )
  );
}

export default MyComponent;