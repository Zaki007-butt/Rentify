export const updateProfile = async (userData) => {
  const formData = new FormData();
  
  if (userData.name) formData.append('name', userData.name);
  if (userData.email) formData.append('email', userData.email);
  if (userData.avatar) formData.append('avatar', userData.avatar);

  const response = await api.patch('/users/profile/update/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}; 