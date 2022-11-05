import * as React from "react";

export function Home() {
  const [message, setMessage] = React.useState("");
  React.useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return <div>{message}</div>;
}
