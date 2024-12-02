import { ReactNode } from 'react';
import Nav from '@/components/nav';

interface HeaderFooterLayoutProps {
  children: ReactNode;
}

export const HeaderFooterLayout = ({ children }: HeaderFooterLayoutProps) => {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  );
};
