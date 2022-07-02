import React, { useContext, useEffect, useState } from "react";
import api from "./services/api";

export interface Presentation {
  id: number;
  presentation: string;
}

interface PresentationsContextData {
  presentations: Presentation[];
  presentationsChanged: () => void;
}

const PresentationsContext = React.createContext<PresentationsContextData>({} as PresentationsContextData);

export function PresentationsProvider({ children }: {children: JSX.Element}) {
  const [presentations, setPresentations] = useState<Presentation[]>([]);

  function loadPresentations() {
    api.get('/presentations').then(response => {
      setPresentations(response.data);
    });
  };

  useEffect(() => {
    loadPresentations();
  }, []);


  return (
    <PresentationsContext.Provider value={{ presentations, presentationsChanged: loadPresentations }}>
      {children}
    </PresentationsContext.Provider>
  )
}

export function usePresentations(): PresentationsContextData {
  const context = useContext(PresentationsContext);

  if (!context) {
    throw Error('usePresentations must be used within a PresentationsProvider');
  }

  return context;
}