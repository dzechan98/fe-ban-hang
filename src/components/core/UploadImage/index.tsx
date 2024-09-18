import React, { useCallback, useState } from "react";
import { Box, Typography, Button, IconButton, Stack } from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useDropzone } from "react-dropzone";

interface UploadImageProps {
  label: string;
  onChange: (files: File[]) => void;
  error?: boolean;
  helperText?: string;
  multiple?: boolean;
}

export const UploadImage: React.FC<UploadImageProps> = ({
  label,
  onChange,
  error = false,
  helperText,
  multiple = false,
}) => {
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles);
      setPreviews(acceptedFiles.map((file) => URL.createObjectURL(file)));
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    multiple,
  });

  const removeImage = (index: number) => {
    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
    onChange(
      newPreviews.map((preview) => {
        const file = new File([], preview.split("/").pop() || "image");
        return file;
      })
    );
  };

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        {label}
      </Typography>
      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed",
          borderColor: error ? "error.main" : "primary.main",
          borderRadius: 1,
          p: 2,
          textAlign: "center",
          cursor: "pointer",
          "&:hover": {
            bgcolor: "action.hover",
          },
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography>Drop the files here ...</Typography>
        ) : (
          <Stack alignItems="center" spacing={1}>
            <CloudUploadIcon color="primary" sx={{ fontSize: 48 }} />
            <Typography>
              Drag 'n' drop some files here, or click to select files
            </Typography>
            <Button variant="contained" component="span">
              Select Files
            </Button>
          </Stack>
        )}
      </Box>
      {error && helperText && (
        <Typography color="error" variant="caption">
          {helperText}
        </Typography>
      )}
      {previews.length > 0 && (
        <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
          {previews.map((preview, index) => (
            <Box key={preview} sx={{ position: "relative" }}>
              <img
                src={preview}
                alt={`preview ${index + 1}`}
                style={{ width: 100, height: 100, objectFit: "cover" }}
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
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
