import { MutationHookOptions, useMutation } from "@apollo/client";
import { DocumentNode } from "graphql";

export const useGQLMutation = <TData = any, TVariables = any>(
  mutationName: DocumentNode,
  options?: MutationHookOptions<TData, TVariables>
) => {
  const [mutation, { data, error, loading }] = useMutation<TData, TVariables>(
    mutationName,
    { ...options }
  );

  const executeMutation = async (mutationOptions?: TVariables) => {
    try {
      await mutation({ variables: mutationOptions });
      if (data) console.log(console.log("Mutation Successful", data));
      if (error) console.error("Mutation Error", error);
    } catch (error) {
      console.error(error);
    }
  };

  return { executeMutation, data, error, loading };
};
