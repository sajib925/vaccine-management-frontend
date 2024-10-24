// Cloudinary Upload Utility
export const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_upload_preset"); // replace with your Cloudinary upload preset
    // formData.append("cloud_name", "your_cloud_name"); // replace with your Cloudinary cloud name

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`,
        {
            method: "POST",
            body: formData,
        }
    );

    const data = await response.json();
    return data.secure_url; // This will be the URL of the uploaded image
};