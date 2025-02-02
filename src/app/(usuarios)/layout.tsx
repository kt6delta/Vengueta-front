import { Loading } from '@/components/reusable/Loading';

export default function UserLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <>
    <div className="mx-auto page-container">
      <Loading>
        {children}
      </Loading>
      </div>
    </>
  );
}
