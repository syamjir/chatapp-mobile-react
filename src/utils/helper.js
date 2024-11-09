export const validatePhoto = (file) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  const maxSize = 2 * 1024 * 1024; // 2MB

  if (!allowedTypes.includes(file.type)) {
    alert("Only .jpg, .jpeg, and .png files are allowed");
    return false;
  }

  if (file.size > maxSize) {
    alert("File size must be less than 2MB");
    return false;
  }

  return true;
};
