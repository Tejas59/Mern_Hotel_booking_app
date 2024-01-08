import express from 'express';
import cors from 'cors';
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/test', (req: Request, res: Response) => {
    res.json({ message: "Hello mf how are you!" });
  });
  

app.listen(8080, () => {
    console.log("listening on port 8080");
});