import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactNode } from 'react';
import { Providers } from '@/store/providers';


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
