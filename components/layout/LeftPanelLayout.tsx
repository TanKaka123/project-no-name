import { ReactNode } from 'react';

interface LeftPanelLayoutProps {
  children: ReactNode;
}

export const LeftPanelLayout = ({ children }: LeftPanelLayoutProps) => {
  return (
    <div style={{ display: 'flex' }}>
        {/* <LeftPanel /> */}
      <main style={{ marginLeft: '250px' }}>{children}</main>
    </div>
  );
};

export default LeftPanelLayout;
