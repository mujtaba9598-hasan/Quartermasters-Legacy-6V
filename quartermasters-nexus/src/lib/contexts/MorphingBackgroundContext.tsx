'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ServiceTheme } from '@/hooks/useConversationContext';

interface MorphingBackgroundContextType {
    activeTheme: ServiceTheme;
    setActiveTheme: (theme: ServiceTheme) => void;
}

const MorphingBackgroundContext = createContext<MorphingBackgroundContextType | undefined>(undefined);

export function MorphingBackgroundProvider({ children }: { children: ReactNode }) {
    const [activeTheme, setActiveTheme] = useState<ServiceTheme>('idle');

    return (
        <MorphingBackgroundContext.Provider value={{ activeTheme, setActiveTheme }}>
            {children}
        </MorphingBackgroundContext.Provider>
    );
}

export function useMorphingBackground() {
    const context = useContext(MorphingBackgroundContext);
    if (!context) {
        throw new Error('useMorphingBackground must be used within a MorphingBackgroundProvider');
    }
    return context;
}
