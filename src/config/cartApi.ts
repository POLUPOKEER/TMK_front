import { API_CONFIG } from "./api";

export const updateCartItem = async (itemId: string, quantity: number) => {
    const response = await fetch(`${API_CONFIG.baseUrl}/api/cart/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, quantity }),
    });

    if (!response.ok) {
        throw new Error(`Ошибка обновления: ${response.status}`);
    }

    return await response.json();
};

export const removeCartItem = async (itemId: string) => {
    const response = await fetch(`${API_CONFIG.baseUrl}/api/cart/remove/${itemId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Ошибка удаления: ${response.status}`);
    }

    return await response.json();
};