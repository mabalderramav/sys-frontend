
import { useEffect } from 'react';
type NotificationType = 'success' | 'warning' | 'danger';

interface NotificationProps {
  message: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  type: NotificationType;
}

const Notification: React.FC<NotificationProps> = ({ message, show,setShow, type }) => {
    // Define el color de fondo basado en el tipo de notificación
    const backgroundColor = {
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      danger: 'bg-red-500',
    }[type];

    useEffect(()=>{
        if(show){
            setTimeout(()=>{
                setShow(false)
            }, 3000)
        }
    }, [show])
  
    return (
      <div
        className={`fixed top-4 right-4 ${backgroundColor} text-white px-4 py-2 rounded-md shadow-md transition-opacity duration-300 ${
          show ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {message}
      </div>
    );
  };

export default Notification;