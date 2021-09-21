import { AnimatePresence } from "framer-motion";

const NotificationContainer = ({ children, position }) => {
    return (
      <div className="container">
        <ul className={position}>
          <AnimatePresence
            initial={false}
          >
            {children}
          </AnimatePresence>
        </ul>
      </div>
    );
};

export default NotificationContainer;