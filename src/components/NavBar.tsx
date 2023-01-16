import { Flex, Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Flex
      background="green.300"
      color="white"
      fontSize="20"
      textDecoration="underline"
      display="flex"
      flexDirection="row"
      p={4}
    >
      <Box marginRight="10">
        <Link to="/">
          <Text>Home</Text>
        </Link>
      </Box>
    </Flex>
  );
};

export default Navbar;
