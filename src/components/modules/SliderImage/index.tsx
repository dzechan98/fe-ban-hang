import { useState } from "react";
import { Box, Grid2, CardMedia, Stack } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface SlideImageProps {
  images: string[];
}

const styleIcon = {
  height: 40,
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  bgcolor: "rgba(0,0,0,0.3)",
  color: "white",
  position: "absolute",
  transform: "translateY(-50%)",
  top: "50%",
};

export const SlideImage = ({ images }: SlideImageProps) => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prevIndex) =>
      prevIndex >= images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setIndex((prevIndex) =>
      prevIndex <= 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <Box>
      <CardMedia
        sx={{ height: 450 }}
        image={images[index]}
        title={images[index]}
      />
      <Box
        sx={{ display: "flex", alignItems: "center", position: "relative" }}
        marginTop={2}
      >
        <Stack
          onClick={handlePrev}
          sx={{
            ...styleIcon,
            left: 1,
          }}
        >
          <ArrowForwardIosIcon sx={{ transform: "rotate(180deg)" }} />
        </Stack>
        <Grid2 container spacing={1} sx={{ flex: 1 }}>
          {images.map((image, i) => (
            <Grid2 size={12 / images.length} key={i}>
              <Box
                border={2}
                borderColor={i == index ? "primary.main" : "transparent"}
              >
                <CardMedia
                  sx={{ height: 70, cursor: "pointer" }}
                  image={image}
                  title={image}
                  onClick={() => setIndex(i)}
                />
              </Box>
            </Grid2>
          ))}
        </Grid2>
        <Stack
          onClick={handleNext}
          sx={{
            ...styleIcon,
            right: 1,
          }}
        >
          <ArrowForwardIosIcon />
        </Stack>
      </Box>
    </Box>
  );
};
