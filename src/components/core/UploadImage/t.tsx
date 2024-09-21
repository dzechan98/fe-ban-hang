import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Box, Typography, Stack, CircularProgress } from "@mui/material";
import {
  AddPhotoAlternate as AddPhotoIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";

interface UploadImageProps {
  label?: string;
  onChange: (urls: string[]) => void;
  error?: boolean;
  helperText?: string;
  multiple?: boolean;
  reset?: boolean;
  initialImages?: string[];
  type?: "circle" | "rectangle";
}

export const UploadImage: React.FC<UploadImageProps> = ({
  label,
  onChange,
  error = false,
  helperText,
  multiple = false,
  initialImages = [],
  reset = false,
  type = "rectangle",
}) => {
  const [images, setImages] = useState<string[]>(initialImages);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        import.meta.env.VITE_IMAGE_URL,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Image upload failed");
      }

      return response.data.data.display_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length === 0) {
      toast.error("Vui lòng chỉ chọn các tập tin hình ảnh");
      return;
    }

    setIsUploading(true);

    try {
      const uploadedImages: string[] = [];

      for (const file of imageFiles) {
        const url = await uploadImage(file);
        uploadedImages.push(url);
      }

      const result = multiple ? [...images, ...uploadedImages] : uploadedImages;

      setImages(result);
      onChange(result);
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error(
        "Không thể tải lên một hoặc nhiều hình ảnh. Vui lòng thử lại."
      );
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => index != i);
    setImages(newImages);
    onChange(newImages);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    setImages(initialImages);
  }, [reset]);

  return (
    <Box>
      {label && (
        <Typography
          variant="subtitle1"
          gutterBottom
          color={error ? "error" : "text"}
        >
          {label}
        </Typography>
      )}
      <Stack
        sx={{
          borderRadius: type === "circle" ? "50%" : 1,
          borderWidth: "2px",
          borderStyle: images.length === 0 ? "dashed" : "solid",
          borderColor: error
            ? "error.main"
            : images.length > 0
            ? "primary.main"
            : "text.main",
          p: 1,
          width: 200,
          height: 200,
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            borderColor: "primary.main",
          },
        }}
        onClick={handleButtonClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{
            display: "none  ",
          }}
          multiple={multiple}
        />
        <Stack alignItems="center" spacing={1} justifyContent="center">
          {isUploading && <CircularProgress />}
          {images.length === 0 && !isUploading && (
            <Stack alignItems="center">
              <AddPhotoIcon
                color={error ? "error" : "primary"}
                sx={{ fontSize: 48 }}
              />
              <Typography fontSize="14px" color={error ? "error" : "text"}>
                Tải ảnh
              </Typography>
            </Stack>
          )}
        </Stack>
        {images.length > 0 &&
          images.map((image) => (
            <img
              src={image}
              alt={image}
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: type === "circle" ? "50%" : 2,
              }}
            />
          ))}
      </Stack>
      {label && error && helperText && (
        <Typography color="error" variant="caption">
          {helperText}
        </Typography>
      )}
    </Box>
  );
};
