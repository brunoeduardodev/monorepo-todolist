import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { FormEventHandler, useCallback, useState } from "react";
import { ListUsersWithTasksQuery } from "../generated/graphql";

import { DeleteIcon } from "@chakra-ui/icons";

type Props = {
  user: ListUsersWithTasksQuery["users"][0];
  handleCheckTask: (id: string, done: boolean) => void;
  handleAddtask: (userId: string, name: string) => void;
  handleRemoveTask: (id: string) => void;
  handleRemoveUser: (id: string) => void;
};

export const UserTaskList: React.FC<Props> = ({
  user,
  handleCheckTask,
  handleAddtask,
  handleRemoveTask,
  handleRemoveUser,
}) => {
  const [taskName, setTaskName] = useState("");

  const handleSubmitTask: FormEventHandler = useCallback(
    (event) => {
      event.preventDefault();

      handleAddtask(user.id, taskName);
      setTaskName("");
    },
    [handleAddtask, taskName, user.id]
  );

  return (
    <Box
      w="full"
      key={user.id}
      borderBottom="2px"
      borderColor={"black"}
      mt="20"
    >
      <Flex w="full" justify="space-between" align="center">
        <Text fontSize="24px" fontWeight={"bold"} mb="2">
          {user.name}
        </Text>

        <IconButton
          onClick={() => handleRemoveUser(user.id)}
          aria-label="Remove"
          size="sm"
          color="red"
          icon={<DeleteIcon />}
          variant="ghost"
        />
      </Flex>
      <Text fontSize="16px" fontWeight={"semibold"} mb="2">
        {user.email}
      </Text>
      <Text fontSize={"xs"} mb={"4"}>
        {user.id}
      </Text>

      <VStack align="start">
        {user.tasks.map((task) => (
          <HStack spacing={4} key={task.id}>
            <Checkbox
              isChecked={task.done}
              onChange={(event) =>
                handleCheckTask(task.id, event.target.checked)
              }
            >
              {task.name}
            </Checkbox>

            <IconButton
              onClick={() => handleRemoveTask(task.id)}
              aria-label="Remove"
              size="sm"
              color="red"
              icon={<DeleteIcon />}
              variant="ghost"
            />
          </HStack>
        ))}
      </VStack>

      <Flex as="form" onSubmit={handleSubmitTask} my={4}>
        <Input
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          maxW="200px"
          mr={2}
          placeholder="TASK"
          type="text"
        />
        <Button type="submit">Add</Button>
      </Flex>
    </Box>
  );
};
