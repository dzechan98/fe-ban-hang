/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Stack,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { AddPhotoAlternate as AddPhotoIcon } from "@mui/icons-material";
import { toast } from "react-toastify";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

interface UploadImageProps {
  label?: string;
  onChange?: (url: string) => void;
  onRemove?: (index?: number) => void;
  error?: boolean;
  helperText?: string;
  reset?: boolean;
  initialImage?: string;
  index?: number;
}

export const UploadImage: React.FC<UploadImageProps> = ({
  label,
  onChange,
  onRemove,
  error = false,
  helperText,
  initialImage = "",
  reset = false,
  index,
}) => {
  const [image, setImage] = useState<string>(initialImage);
  const [hovered, setHovered] = useState(false);
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
    const file = event.target.files?.[0];

    if (!file || !file.type.startsWith("image/")) {
      toast.error("Vui lòng chỉ chọn một tập tin hình ảnh");
      return;
    }

    setIsUploading(true);

    try {
      const url = await uploadImage(file);
      setImage(url);
      onChange?.(url);
    } catch (_) {
      toast.error("Không thể tải lên hình ảnh. Vui lòng thử lại.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onRemove?.(index);
    setImage("");
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    setImage(initialImage);
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
          borderRadius: 1,
          borderWidth: "1px",
          borderColor: error ? "error.main" : "grey.400",
          borderStyle: image ? "solid" : "dashed",
          p: 1,
          width: "100%",
          aspectRatio: "1.5",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={handleButtonClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{
            display: "none",
          }}
        />
        <Stack alignItems="center" spacing={1} justifyContent="center">
          {isUploading && <CircularProgress />}
          {!image && !isUploading && (
            <Stack alignItems="center">
              <AddPhotoIcon
                color={error ? "error" : "primary"}
                sx={{ fontSize: 48 }}
              />
              <Typography variant="body2" color={error ? "error" : "text"}>
                Tải ảnh
              </Typography>
            </Stack>
          )}
        </Stack>
        {image && !isUploading && (
          <>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              position="relative"
              bgcolor={hovered ? "rgba(0,0,0,0.8)" : "transparent"}
              sx={{
                backgroundImage: `url(${image})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                width: "100%",
                aspectRatio: "1.5",
                borderRadius: 1,
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {hovered && (
                <>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: "rgba(0,0,0,0.4)",
                      borderRadius: 4,
                    }}
                  ></div>
                  <IconButton
                    sx={{ color: "white" }}
                    onClick={handleRemoveImage}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                </>
              )}
            </Stack>
          </>
        )}
      </Stack>
      {label && error && helperText && (
        <Typography color="error" variant="caption">
          {helperText}
        </Typography>
      )}
    </Box>
  );
};
