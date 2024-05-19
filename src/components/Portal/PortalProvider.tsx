import React, { createContext, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Portal, PortalContextProps, PortalProviderProps } from './PortalTypes';

const PortalContext = createContext<PortalContextProps | undefined>(undefined);

export const PortalProvider: React.FC<PortalProviderProps> = ({ children }) => {
  const [portals, setPortals] = useState<Portal[]>([]);

  const addPortal = (portal: Portal) => {
    setPortals(prevPortals => [...prevPortals, portal]);
  };

  const removePortal = (key: string) => {
    setPortals(prevPortals => prevPortals.filter(portal => portal.key !== key));
  };

  return (
    <PortalContext.Provider value={{ addPortal, removePortal }}>
      {children}
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {portals.map(portal => (
          <React.Fragment key={portal.key}>{portal.component}</React.Fragment>
        ))}
      </View>
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
