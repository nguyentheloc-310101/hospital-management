'use client';
import { ReactNode, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import AntdStyledRegistry from '@/utils/theme/antd-styled-registry';
import themeConfig from '@/utils/theme/theme-config';
import * as NProgress from 'nprogress';
import { usePathname, useSearchParams } from 'next/navigation';

type Props = {
  children: ReactNode;
};

export default function LayoutProvider({ children }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  return (
    <ConfigProvider theme={themeConfig}>
      <AntdStyledRegistry>{children}</AntdStyledRegistry>
    </ConfigProvider>
  );
}
