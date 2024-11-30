import React, { createContext, useCallback, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Portal, PortalContextProps, PortalProviderProps } from './Portal.types';

const PortalContext = createContext<PortalContextProps | undefined>(undefined);

export const PortalProvider: React.FC<PortalProviderProps> = ({ children }) => {
  const [portals, setPortals] = useState<Portal[]>([]);

  const addPortal = (portal: Portal) => {
    const isAlreadyRegistered = portals.find(item => item.key === portal.key);
    if (isAlreadyRegistered) return;
    setPortals(prevPortals => [...prevPortals, portal]);
  };

  const removePortal = (key: string) => {
    if (portals.length === 0) return;
    setPortals(prevPortals => prevPortals.filter(portal => portal.key !== key));
  };

  const renderPortalComponent = useCallback(() => {
    if (portals.length === 0) return null;
    return (
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {portals.map(portal => (
          <React.Fragment key={portal.key}>{portal.component}</React.Fragment>
        ))}
      </View>
    );
  }, [portals.length]);

  return (
    <PortalContext.Provider value={{ addPortal, removePortal }}>
      {children}
      {renderPortalComponent()}
    </PortalContext.Provider>
  );
};

export const usePortal = (): PortalContextProps => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};
