import type { Metadata } from 'next';
import type { Author } from 'next/dist/lib/metadata/types/metadata-types';
import Navbar from './nav/Navbar';
import './globals.css';

export const appAuthors: Author[] = [
  {
    name: 'Anton Kozak',
    url: 'antonkozak3533@gmail.com',
  },
];

export const metadata: Metadata = {
  title: 'AntonKozak',
  applicationName: 'AntonKozak',
  authors: appAuthors,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <Navbar />
        <main className='container mx-auto px-5 pt-10'>{children}</main>
      </body>
    </html>
  );
}
