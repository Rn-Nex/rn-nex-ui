import React, { useEffect } from 'react';
import { Modal } from 'react-native';
import { ModalContainer } from './ModalContainer';
import { usePortal } from './PortalProvider';
import { PortalProps } from './Portal.types';

export const Portal: React.FC<PortalProps> = ({ children, portalKey: key, visible, modalContainerProps, onClose, ...props }) => {
  const { addPortal, removePortal } = usePortal();

  useEffect(() => {
    if (visible) {
      addPortal({
        key,
        component: (
          <Modal transparent animationType="slide" visible={visible} {...props}>
            <ModalContainer
              onClose={() => {
                removePortal(key);
                if (onClose) {
                  onClose();
                }
              }}
              {...modalContainerProps}>
              {children}
            </ModalContainer>
          </Modal>
        ),
      });
    } else {
      removePortal(key);
    }

    return () => {
      removePortal(key);
    };
  }, [key, children, visible]);

  return null;
};
