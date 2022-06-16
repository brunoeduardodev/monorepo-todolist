import { VStack } from "@chakra-ui/react";
import { useCallback } from "react";
import { CreateUser } from "../components/CreateUser";
import { UserTaskList } from "../components/UserTaskList";
import {
  useListUsersWithTasksQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useCreateUserMutation,
  useRemoveUserMutation,
} from "../generated/graphql";

export default function Web() {
  const { data, refetch } = useListUsersWithTasksQuery({
    variables: {},
  });

  const [updateTask] = useUpdateTaskMutation();
  const [addTask] = useAddTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [createUser, { loading: createUserLoading }] = useCreateUserMutation();
  const [removeUser] = useRemoveUserMutation();

  const handleCheckTask = useCallback(
    async (id: string, done: boolean) => {
      const { data } = await updateTask({
        variables: {
          data: {
            done: {
              set: done,
            },
          },
          where: {
            id,
          },
        },
      });
      refetch();
    },

    [updateTask, refetch]
  );

  const handleAddTask = useCallback(
    async (userId: string, taskName: string) => {
      await addTask({
        variables: {
          data: {
            user: {
              connect: { id: userId },
            },
            name: taskName,
            done: false,
          },
        },
      });

      refetch();
    },
    [addTask, refetch]
  );

  const handleRemoveTask = useCallback(
    async (id: string) => {
      await deleteTask({
        variables: {
          where: {
            id,
          },
        },
      });

      refetch();
    },
    [deleteTask, refetch]
  );

  const handleCreateUser = useCallback(
    async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      await createUser({
        variables: {
          data: {
            email,
            name,
            password,
          },
        },
      });

      refetch();
    },
    [createUser, refetch]
  );

  const handleRemoveUser = useCallback(
    async (id: string) => {
      await removeUser({ variables: { where: { id } } });
      refetch();
    },
    [removeUser, refetch]
  );

  return (
    <VStack w="600px" bg="white" align="start" mx="auto" spacing={4}>
      {data?.users.map((user) => (
        <UserTaskList
          key={user.id}
          user={user}
          handleAddtask={handleAddTask}
          handleCheckTask={handleCheckTask}
          handleRemoveTask={handleRemoveTask}
          handleRemoveUser={handleRemoveUser}
        />
      ))}

      <CreateUser
        loading={createUserLoading}
        handleCreateUser={handleCreateUser}
      />
    </VStack>
  );
}
