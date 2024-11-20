import {useCallback, useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SendMsgForm from './components/SendMsgForm/SendMsgForm';
import {subscribeNotifications} from './firebase/subscribeNotifications';
import Background from './components/Background/Background';
import './App.css';

const {REACT_APP_WEB_SOCKET_URL} = process.env;
const socket = io(REACT_APP_WEB_SOCKET_URL);

const showMsg = payload => {
  const {title, body} = payload?.notification ?? {};
  toast.info(
    <div>
      <b>{title}</b>
      <div>{body}</div>
    </div>,
  );
};

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const onUnmount = async () => {
      const [fcmToken, unsubscribe] = await subscribeNotifications(showMsg);
      if (!fcmToken) {
        toast.error("Fcm token wasn't created");
        return;
      }
      setToken(fcmToken);
      toast.info('App is ready');
      return unsubscribe;
    };
    return () => onUnmount();
  }, []);

  const sendMsgByWs = useCallback(
    msg => {
      if (!token) {
        console.log('FCM token was not generated');
        return;
      }

      socket.emit('sendMessage', {payload: msg, token});
    },
    [token],
  );

  return (
    <Background>
      <div className="main-container">
        <div className="send-msg_container">
          <h1>Message echo app</h1>
          <p>Type your message...</p>
          <SendMsgForm onFormSubmit={sendMsgByWs} isReady={Boolean(token)} />
          <ToastContainer autoClose={4000} />
        </div>
      </div>
    </Background>
  );
};

export default App;
