import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  useDisclosure,
  FormLabel,
  Input,
  Box,
  Button,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { v4 as uuidv4 } from "uuid";
import { addNewBook, updateBook, deleteBook } from "../redux/bookSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import DeleteBookModel from "./DeleteBookModel";

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const AddBook = () => {
  const modalAddButton = useDisclosure();
  const modalDeleteButton = useDisclosure();
  const modalErrorButton = useDisclosure();

  const cancelRefError = React.useRef<HTMLDivElement>(null);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string | undefined>("");
  const [author, setAuthor] = useState<string | undefined>("");
  const [ids, setId] = useState<string | undefined>("");
  const [selectedId, setSelectedId] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const isError = title === "";
  const isErrorAuthor = author === "";

  console.log(isError);
  
  const bookList = useAppSelector((state) => state.book.bookList);

  const handleOnSubmit = () => {
    if (ids) {
      modalAddButton.onClose();
      dispatch(updateBook({ author, title, id: ids }));
      clearInputs();
      return;
    } else {
      if (title && author) {
        const userData = {
          title,
          author,
          id: uuidv4(),
        };
        let oldData =
          JSON.parse(localStorage.getItem("userData") as string) || [];

        localStorage.setItem(
          "userData",
          JSON.stringify([...oldData, userData])
        );
        dispatch(addNewBook(userData));
        clearInputs();
        modalAddButton.onClose();
      } else {
        modalErrorButton.onOpen();
        setShowAlert(true);
      }
    }
  };

  const openDeleteAlert = (id: any) => {
    setSelectedId(id);
    modalDeleteButton.onOpen();
  };

  const something = (event: any) => {
    if (event.keyCode === 13) {
      handleOnSubmit();
    }
  };

  const editData = (book: any) => {
    modalAddButton.onOpen();
    setTitle(book.title);
    setAuthor(book.author);
    setId(book.id);
    return;
  };

  const handleDelete = (id: any) => {
    dispatch(deleteBook(id));
    modalDeleteButton.onClose();
    clearInputs();
  };

  const clearInputs = () => {
    setTitle("");
    setAuthor("");
    setId("");
  };

  const onCancel = () => {
    modalAddButton.onClose();
    clearInputs();
  };

  return (
    <Box>
      <Box>
        {showAlert && (
          <AlertDialog
            isOpen={modalErrorButton.isOpen}
            leastDestructiveRef={cancelRefError}
            onClose={modalErrorButton.onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Alert
                </AlertDialogHeader>

                <AlertDialogBody>Please Fill All Required Data</AlertDialogBody>

                <AlertDialogFooter>
                  <Button
                    colorScheme="red"
                    onClick={modalErrorButton.onClose}
                    ml={3}
                  >
                    Ok
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        )}
      </Box>
      <Box w="100%">
        <Box marginTop={"20px"} textAlign={"center"}>
          <Text
            fontSize={"25"}
            textDecoration={"underline"}
            textDecorationColor={"gray"}
            textDecorationThickness={"4px"}
            fontWeight="bold"
            marginBottom={"5"}
          >
            Book Details
          </Text>
        </Box>
        <Box margin="20px">
          <Box
            display={"flex"}
            flexDirection="column"
            justifyItems={"flex-start"}
            px="15px"
            py="15px"
            w="100%"
          >
            <Box textAlign={"end"} marginBottom={"5"}>
              <Button onClick={modalAddButton.onOpen} colorScheme="green">
                ADD
              </Button>
              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={modalAddButton.isOpen}
                onClose={modalAddButton.onClose}
                isCentered={true}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Enter Your Details</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl isRequired isInvalid={isError}>
                      <FormLabel>Title</FormLabel>
                      <Input
                        onKeyDown={(e) => something(e)}
                        ref={initialRef}
                        value={title}
                        placeholder="Enter Title"
                        onChange={(e) => setTitle(e.currentTarget.value)}
                      />
                    </FormControl>

                    <FormControl mt={4} isRequired isInvalid={isError}>
                      <FormLabel>Author</FormLabel>
                      <Input
                        onKeyDown={(e) => something(e)}
                        value={author}
                        placeholder="Enter Author"
                        blur={author}
                        onChange={(e) => setAuthor(e.currentTarget.value)}
                      />
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleOnSubmit}>
                      Save
                    </Button>
                    <Button onClick={onCancel}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
            <TableContainer
              w="100%"
              display="block"
              height="550px"
              overflowY="auto"
            >
              <Table
                borderBlock={"2px solid"}
                variant="striped"
                colorScheme="teal"
              >
                <Thead borderBlockEnd={"2px solid"}>
                  <Tr>
                    <Th textAlign={"center"} fontSize={"16"}>
                      Title
                    </Th>
                    <Th textAlign={"center"} fontSize={"16"}>
                      Author
                    </Th>
                    <Th textAlign={"end"} fontSize={"16"}>
                      ACTIONS
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {bookList?.map((book) => (
                    <Tr key={book.id}>
                      <Td textAlign={"center"} fontSize={"16"}>
                        {book.title}
                      </Td>
                      <Td textAlign={"center"} fontSize={"16"}>
                        {book.author}
                      </Td>
                      <Td textAlign={"end"} fontSize={"16"}>
                        <IconButton
                          color="#fff"
                          backgroundColor={"blackAlpha.600"}
                          aria-label=""
                          icon={<EditIcon />}
                          marginRight="1rem"
                          onClick={() => editData(book)}
                        />
                        <IconButton
                          color="#1a202c"
                          backgroundColor={"whitesmoke"}
                          border={"1px solid"}
                          aria-label=""
                          icon={<DeleteIcon />}
                          onClick={() => openDeleteAlert(book.id)}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <DeleteBookModel
              isOpen={modalDeleteButton.isOpen}
              onClose={modalDeleteButton.onClose}
              handleDelete={handleDelete}
              selectedId={selectedId}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddBook;
