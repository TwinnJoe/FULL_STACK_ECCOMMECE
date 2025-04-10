import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import workoutVideosRouter from "./routes/workoutVideosRouter.js"
import articlesRouter from "./routes/articlesRouter.js"
import adminRouter from "./routes/adminRouter.js"
import orderItemsRouter from "./routes/orderItemsRouter.js"
import ordersRouter from "./routes/ordersRouter.js"
import locationsRouter from "./routes/locationsRouter.js"
import storeRouter from "./routes/storeRouter.js"
import usersRouter from "./routes/usersRouter.js"
import subscriptionRouter from "./routes/subscriptionRouter.js"
import bookingRouter from "./routes/bookingRouter.js"
import personalTrainersRouter from "./routes/PersonalTrainersRouter.js"

dotenv.config();

const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
// app.use(bcrypt());
// app.use(jwt());

app.use("/workoutVideos", workoutVideosRouter);
app.use("/articles", articlesRouter);
app.use("/admin", adminRouter);
app.use("/orderItems", orderItemsRouter);
app.use("/orders", ordersRouter);
app.use("/locations", locationsRouter);
app.use("/store", storeRouter);
app.use("/users", usersRouter);
app.use("/subscription", subscriptionRouter);
app.use("/bookings", bookingRouter);
app.use("/personalTrainers", personalTrainersRouter);

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
