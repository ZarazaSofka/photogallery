import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "./auth";
import AppRouter from "./AppRouter";
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </QueryClientProvider>
  );
}
