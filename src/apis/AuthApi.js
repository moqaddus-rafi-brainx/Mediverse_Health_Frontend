import axios from 'axios';

const AuthUrl = import.meta.env.VITE_AUTH_URL;

export const loginApi = async (email, password) => {
    try {
        console.log(AuthUrl);
        return axios.post(`${AuthUrl}/login`, { email, password });
    } catch (error) {
        throw error;
    }
};

export const forgetPasswordApi = async (email, setIsLoading) => {
    setIsLoading(true);
    console.log(AuthUrl);
    return axios.post(`${AuthUrl}/forgot-password`, { email });
};

export const resetPasswordApi = async (token, newPass) => {
    return axios.patch(`${AuthUrl}/reset-password?token=${token}`, { newPass });
};

