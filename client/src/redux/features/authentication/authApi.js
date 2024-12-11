import publicAxios from "../../../components/publicAxios";

export const login = async (email , password) => {

  
  try {
    const response = await publicAxios.post(`/user/signin`,{email,password});

    return response.data;
  } catch (error) {
    throw error;
  }
};
