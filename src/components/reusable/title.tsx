interface TitleProps {
    className?: string;
    mesage: string;
}

export const Title = ({className,mesage}:TitleProps) => {
    return (
        <>
            <h1 className={` text-secondary text-base md:text-xl xl:text-3xl font-bold ${className}`}>{mesage}</h1>
        </>
    )
}