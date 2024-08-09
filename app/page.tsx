import * as React from "react";
import Login from "./Login";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Login />
    </main>
  );
}
