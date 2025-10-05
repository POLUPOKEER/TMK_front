import { useEffect, useState } from 'react';

export const useTelegram = () => {
    const [tg, setTg] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const telegram = window.Telegram?.WebApp;
        if (telegram) {
            setTg(telegram);
            setUser(telegram.initDataUnsafe?.user);
        }
    }, []);

    const closeApp = () => {
        tg?.close();
    };

    const sendData = (data) => {
        tg?.sendData(JSON.stringify(data));
    };

    return {
        tg,
        user,
        closeApp,
        sendData
    };
};