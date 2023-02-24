import { App } from "@tinyhttp/app";
import { cursorHandler } from "./handlers/cursor-handler";
import { offsetHandler } from "./handlers/offset-handler";

const app = new App();

app.get("/offset", offsetHandler).get("/cursor", cursorHandler).listen(3000);
