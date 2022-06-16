import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { FormEventHandler, useCallback, useState } from "react";

type Props = {
  handleCreateUser: (data: {
    name: string;
    email: string;
    password: string;
  }) => void;

  loading: boolean;
};

export const CreateUser: React.FC<Props> = ({ handleCreateUser, loading }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback<FormEventHandler>(
    (event) => {
      event.preventDefault();
      console.log("handle submit");
      handleCreateUser({ name, email, password });
      setName("");
      setEmail("");
      setPassword("");
    },
    [name, email, password, handleCreateUser]
  );

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit}
      align="start"
      py={4}
      spacing={4}
      w="full"
    >
      <Text fontSize="2xl" fontWeight={"bold"}>
        Add New User
      </Text>
      <FormControl>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          id="name"
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          id="email"
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          id="password"
        />
      </FormControl>

      <Button disabled={loading} type="submit">
        {loading ? <Spinner /> : "Add"}
      </Button>
    </VStack>
  );
};
