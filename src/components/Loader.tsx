import { FC, useEffect, useState } from "react";
import { Box, CircularProgress } from "@chakra-ui/react";

type Props = {
  showLoading?: boolean;
};

const Loader: FC<Props> = ({ showLoading = false }: Props) => {
  const [showLoader, setShowLoader] = useState(showLoading);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 1000 * 2);
  }, [showLoader]);
  return (
    <>
      {showLoader && (
        <Box
          backgroundColor={"black"}
          opacity={"0.85"}
          position={"fixed"}
          top={"0"}
          left={"0"}
          bottom={"0"}
          width={"100%"}
          zIndex="50"
          overflow={"hidden"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
        >
          <CircularProgress
            isIndeterminate
            color="red"
            size="100px"
            thickness="6px"
          />
        </Box>
      )}
    </>
  );
};

export { Loader };
