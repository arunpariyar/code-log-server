import app from './app';
import { config } from 'dotenv';

config();

const port: string = process.env.PORT || '8001';

app.listen(port, () => {
  console.log(`🌻 Server running on port ${port}`);
});
