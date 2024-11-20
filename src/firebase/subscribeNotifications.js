import {messaging} from './config';
import {getToken, onMessage} from 'firebase/messaging';

const {REACT_APP_PUSH_CERTIFICATE_KEY} = process.env;

const subscribeNotifications = async (onMsgEvent = () => {}) => {
  try {
    const permission = await Notification.requestPermission().catch(err => {
      throw new Error('Error requesting permission:', err);
    });

    if (permission !== 'granted') {
      console.warn('Notification permission not granted.');
      return [null, () => {}];
    }
    const token = await getToken(messaging, {
      vapidKey: REACT_APP_PUSH_CERTIFICATE_KEY,
    }).catch(err => {
      throw new Error('Error getting token:', err);
    });

    if (!token) {
      console.warn(
        'No registration token available. Request permission to generate one.',
      );
      return [null, () => {}];
    }

    console.log('Token received');
    const unsubscribe = onMessage(messaging, payload => {
      onMsgEvent(payload);
    });

    return [token, unsubscribe];
  } catch (error) {
    console.error('Error in subscribeNotifications:', error);
    return [null, () => {}];
  }
};

export {subscribeNotifications};
