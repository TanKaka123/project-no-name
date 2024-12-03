import { ReactNode } from 'react';

interface MinimalLayoutProps {
  children: ReactNode;
}

export const MinimalLayout = ({ children }: MinimalLayoutProps) => {
  return <main>{children}</main>;
};

export default MinimalLayout;
