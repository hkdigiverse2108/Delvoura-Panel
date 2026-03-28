import { useMutation, useQueryClient, type InvalidateQueryFilters, type QueryKey, type UseMutationOptions,} from "@tanstack/react-query";

export type AppMutationOptions<TResponse, TInput> = UseMutationOptions<TResponse, Error, TInput> & {
  invalidateQueryKeys?: QueryKey[];
};

export function useMutations<TInput, TResponse>( mutationKey: QueryKey, callback: (input: TInput) => Promise<TResponse>, options?: AppMutationOptions<TResponse, TInput>,) {
  const q = useQueryClient();

  return useMutation<TResponse, Error, TInput>({
    mutationKey,
    mutationFn: callback,
    retry: 0,
    ...options,
    onSuccess: (data, variables, context, mutationContext) => {
      const keysFromOptions = options?.invalidateQueryKeys ?? [];
      const keysFromMutation =
        Array.isArray(mutationKey) && mutationKey.length > 1 ? mutationKey.slice(1) : [];
      const invalidateKeys = [...keysFromOptions, ...keysFromMutation];

      for (const key of invalidateKeys) {
        q.invalidateQueries({ queryKey: key } as InvalidateQueryFilters);
      }

      options?.onSuccess?.(data, variables, context, mutationContext);
    },
  });
}
