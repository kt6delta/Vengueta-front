interface CardWrapperProps {
    children: React.ReactNode;
    className?: string;
}

export const CardWrapper = ({children, className } : CardWrapperProps) => {
    
    return(
        <div className={`rounded-default shadow-card w-full ${className}`}>
            {children}
        </div>
    )
}