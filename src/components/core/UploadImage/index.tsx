import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
  CircularProgress,
  Grid2,
} from "@mui/material";
import {
  AddPhotoAlternate as AddPhotoIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";

interface UploadImageProps {
  label: string;
  onChange: (urls: string[]) => void;
  error?: boolean;
  helperText?: string;
  multiple?: boolean;
  reset?: boolean;
  initialImages?: string[];
  length?: number;
}

export const UploadImage: React.FC<UploadImageProps> = ({
  label,
  onChange,
  error = false,
  helperText,
  multiple = false,
  initialImages = [],
  reset = false,
  length = 1,
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
      <Typography variant="subtitle1" gutterBottom>
        {label}
      </Typography>
      <Box
        sx={{
          border: "2px dashed",
          borderColor: error ? "error.main" : "primary.main",
          borderRadius: 1,
          p: 2,
          textAlign: "center",
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: "none" }}
          multiple={multiple}
        />
        <Stack
          alignItems="center"
          spacing={1}
          justifyContent="center"
          height={104}
        >
          {isUploading && <CircularProgress />}
          {!isUploading && (
            <>
              <AddPhotoIcon color="primary" sx={{ fontSize: 48 }} />
              <Button
                variant="contained"
                component="span"
                onClick={handleButtonClick}
                disabled={isUploading}
              >
                {!multiple && images.length === 1 ? "Đổi ảnh" : "Thêm ảnh"}
              </Button>
            </>
          )}
        </Stack>
      </Box>
      {error && helperText && (
        <Typography color="error" variant="caption">
          {helperText}
        </Typography>
      )}
      {images.length > 0 && (
        <Grid2
          container
          spacing={1}
          marginTop={2}
          sx={{
            border: "2px dashed",
            borderColor: "primary.main",
            borderRadius: 1,
            p: 1,
          }}
        >
          {images.map((image, index) => (
            <Grid2
              size={!multiple ? 12 : 4}
              sx={{ position: "relative" }}
              key={index}
            >
              <img
                src={image}
                alt={image}
                style={{
                  display: "block",
                  width: "100%",
                  height: !multiple ? "auto" : 100,
                  objectFit: "cover",
                }}
              />
              <IconButton
                size="small"
                onClick={() => removeImage(index)}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bgcolor: "background.paper",
                  "&:hover": { bgcolor: "action.hover" },
                }}
                aria-label={`Remove image ${index + 1}`}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Grid2>
          ))}
        </Grid2>
      )}
    </Box>
  );
};
