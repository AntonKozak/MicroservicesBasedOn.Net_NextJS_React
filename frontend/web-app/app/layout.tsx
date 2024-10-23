import type { Metadata } from 'next';
import './globals.css';
import ToasterProvider from './providers/ToasterProvider';
import SignalRProvider from './providers/SignalRProvider';
import { getCurrentUser } from './actions/authActions';
import { Author } from 'next/dist/lib/metadata/types/metadata-types';
import Navbar from './nav/Navbar';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang='en'>
      <body>
        <ToasterProvider />
        <Navbar />
        <main className='container mx-auto px-5 pt-10'>
          <SignalRProvider user={user}>{children}</SignalRProvider>
        </main>
      </body>
    </html>
  );
}
