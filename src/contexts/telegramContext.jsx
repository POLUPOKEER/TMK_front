import React, { createContext, useContext } from 'react';
import { useTelegram } from '../hooks/useTelegram';

const TelegramContext = createContext();

export const TelegramProvider = ({ children }) => {
    const { tg, user, closeApp } = useTelegram();

    const tgData = {
        backgroundColor: tg?.themeParams?.bg_color || '#ffffff',
        textColor: tg?.themeParams?.text_color || '#000000',
        buttonColor: tg?.themeParams?.button_color || '#2481cc',
        buttonTextColor: tg?.themeParams?.button_text_color || '#ffffff',
        secondaryBgColor: tg?.themeParams?.secondary_bg_color || '#f8f8f8',
        hintColor: tg?.themeParams?.hint_color || '#666666',

        user: user,
        closeApp: closeApp
    };

    return (
        <TelegramContext.Provider value={tgData}>
            {children}
        </TelegramContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTelegramData = () => {
    const context = useContext(TelegramContext);
    if (!context) {
        console.log('useTheme must be used within ThemeProvider');
    }
    return context;
};