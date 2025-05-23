const rsConfig = {
    _id: "vf-event-store-repl-set",
    members: [
      { _id: 0, host: "localhost:27017" }
    ]
  };
  
  try {
    const result = rs.initiate(rsConfig);
    printjson(result);
  } catch (e) {
    printjson(e);
  }
  