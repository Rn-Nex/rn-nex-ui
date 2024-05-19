import React, { useEffect } from 'react';
import { Modal } from 'react-native';
import { ModalContainer } from './ModalContainer';
import { usePortal } from './PortalProvider';
import { PortalProps } from './PortalTypes';

const Portal: React.FC<PortalProps> = ({ children, key, visible, modalContainerProps, ...modalProps }) => {
  const { addPortal, removePortal } = usePortal();

  useEffect(() => {
    if (visible) {
      addPortal({
        key,
        component: (
          <Modal transparent animationType="slide" visible={visible} {...modalProps}>
            <ModalContainer {...modalContainerProps}>{children}</ModalContainer>
          </Modal>
        ),
      });
    } else {
      removePortal(key);
    }

    return () => {
      removePortal(key);
    };
  }, [key, children, visible, ...Object.values(modalProps)]);

  return null;
};

export default Portal;
