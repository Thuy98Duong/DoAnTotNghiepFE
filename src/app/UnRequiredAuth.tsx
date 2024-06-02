import { Main } from "@/layout/Main";

export const UnRequireAuth = ({ children }: { children: React.ReactNode }) => {
  return (
    <Main>
      <div className="flex flex-col items-center justify-center">
        {children}
      </div>
    </Main>
  );
};
