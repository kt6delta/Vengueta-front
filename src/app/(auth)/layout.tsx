import { CardWrapper } from '@/components/reusable/CardWrapper';

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

    return (
        <>
            <div className='relative'>
                <div className="absolute left-0 top-0 bg-gradient-to-b from-secondary to-primary w-full h-[50vh] z-[-1]"></div>
                <div className="mx-auto page-container">
                    <div className="flex flex-col items-center justify-center min-h-screen">
                            <CardWrapper className='p-0 bg-white'>
                                {children}
                            </CardWrapper>
                    </div>
                </div>
            </div>
        </>
    );
}
