import {
  DocumentNode,
  useQuery,
  MutationHookOptions,
  OperationVariables,
} from "@apollo/client";

export const useGQLQuery = <
  TData = any,
  TVariables extends OperationVariables = any
>(
  queryName: DocumentNode,
  options?: MutationHookOptions<TData, TVariables>
) => {
  const { data, error, loading } = useQuery<TData, TVariables>(queryName, {
    ...options,
  });

  return { data, error, loading };
};
