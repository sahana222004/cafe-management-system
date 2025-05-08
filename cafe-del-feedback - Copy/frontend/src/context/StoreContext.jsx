import { createContext, useState, useEffect } from "react";
import { food_list } from "../assets/assets";  // Static food list import

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");

    // Adding item to cart
    const addToCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
    };

    // Removing item from cart
    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            if (prev[itemId] > 1) {
                return { ...prev, [itemId]: prev[itemId] - 1 };
            } else {
                const newCart = { ...prev };
                delete newCart[itemId];
                return newCart;
            }
        });
    };

    // Getting total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const itemInfo = food_list.find((product) => product._id === itemId);
            if (itemInfo) {
                totalAmount += itemInfo.price * cartItems[itemId];
            }
        }
        return totalAmount;
    };

    // Fetching token and cart items from localStorage on component mount
    useEffect(() => {
        // Check if there's a token stored in localStorage
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);  // Set the token state if found
        }

        // Check if there are cart items stored in localStorage
        const storedCartItems = localStorage.getItem("cartItems");
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));  // Parse and set cart items state
        }
    }, []); // Empty dependency array makes it run only once on mount

    // Persist cart items and token in localStorage whenever they change
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        }
    }, [token]);

    useEffect(() => {
        if (Object.keys(cartItems).length > 0) {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));  // Store cart items in localStorage
        }
    }, [cartItems]);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}  {/* Render child components */}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
