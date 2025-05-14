import app from "./app";
import { syncDataBase } from "./config/database";

// import models
import "./models";

const PORT = process.env.SERVER_PORT || 4200;

const startServer = async () => {
  try {
    await syncDataBase();
    app.listen(PORT, () => {
      console.log(`Server starting on port:${PORT}`);
    });
  } catch (error) {
    console.log(`Error starting server!`, error);
  }
};

startServer();
