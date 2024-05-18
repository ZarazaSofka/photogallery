import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "./auth";
import AppRouter from "./AppRouter";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </QueryClientProvider>
  );
}
