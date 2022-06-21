import { App } from "./application";
import { routerTemplate } from "./src/routes/router.module";
require('dotenv').config();

const port: number = process.env.PORT ? +process.env.PORT : 3000;

function startApp() {
  const app = new App(
    port,
    [routerTemplate]
  );

  app.listen();
}

startApp();
