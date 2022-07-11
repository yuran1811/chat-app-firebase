import App from '@/App';
import '@styles/index.css';
import 'emoji-mart/css/emoji-mart.css';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
