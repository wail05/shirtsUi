import React, { useEffect } from "react";
import { CardComponentList } from "./components/CardComponentList";
import axios from "axios";

function App() {
  useEffect(() => { }, []);

  const handleSubmit = async (posts)=>{
    console.log("working ... ");
      axios.put("http://localhost:8080/component/updateShirtAvailability", posts)
        .then(response => this.setState({ updatedAt: response.data.updatedAt }))
  }

  return (
    <div>
      <CardComponentList handleSubmit={handleSubmit}/>
    </div>
  );
}

export default App;
