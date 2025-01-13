import axios from "../configs/axios";

export const editProfile = async (formData) => {
  const rs = await axios.patch(`/user/editProfile`, formData, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("user-storage"))?.state?.token
      }`,
    },
  });
  return rs;
};

export const getUserItems = () =>
  axios.get(`/user/getItems`, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("user-storage"))?.state?.token
      }`,
    },
  });

export const deleteItem = (id) =>
  axios.delete(`/user/deleteItem/${id}`, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("user-storage"))?.state?.token
      }`,
    },
  });

export const editItem = async (itemId, formData) => {
  const rs = await axios.patch(`/user/editItem/${itemId}`, formData, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("user-storage"))?.state?.token
      }`,
    },
  });
  console.log("api response ===", rs);
  return rs;
};

export const addItem = async (formData) => {
  const rs = await axios.post(`/user/createItem`, formData, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("user-storage"))?.state?.token
      }`,
    },
  });
  return rs;
};

export const addComment = async (itemId, formData) => {
  const rs = await axios.post(`/user/createComment/${itemId}`, formData, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("user-storage"))?.state?.token
      }`,
    },
  });
  return rs;
};

export const likeItemToggle = async (itemId) => {
  const rs = await axios.post(`user/likes/toggle/${itemId}`, null, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("user-storage"))?.state?.token
      }`,
    },
  });
};

export const verifyPassword = async (oldPassword) => {
  const rs = await axios.post(
    `/user/verifyPassword`,
    { oldPassword },
    {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user-storage"))?.state?.token
        }`,
      },
    }
  );
  return rs;
};

export const resetPassword = async (formData) => {
  const rs = await axios.patch(
    `/user/resetPassword`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user-storage"))?.state?.token
        }`,
      },
    }
  );
  return rs;
};
