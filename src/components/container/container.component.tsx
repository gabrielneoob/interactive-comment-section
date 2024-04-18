import { ReactNode } from "react";

const Contaier = ({ children }: { children: ReactNode }) => {
  return <div className="max-w-2xl w-full m-auto py-10">{children}</div>;
};

export default Contaier;
