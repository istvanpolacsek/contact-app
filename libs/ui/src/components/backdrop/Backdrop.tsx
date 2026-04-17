import { type FC, type PropsWithChildren } from 'react';
import { BackdropStyled } from './Backdrop.styles';
import { AnimatePresence } from 'motion/react';
interface BackdropProps {
  isVisible: boolean;
}

const Backdrop: FC<PropsWithChildren<BackdropProps>> = ({
  isVisible,
  children,
}) => (
  <AnimatePresence>
    {isVisible ? (
      <BackdropStyled
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </BackdropStyled>
    ) : null}
  </AnimatePresence>
);

export default Backdrop;
