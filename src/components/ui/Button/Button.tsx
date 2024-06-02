import { VariantProps, cva } from "class-variance-authority";
import { ReactNode } from "react";
import cls from "./Button.module.scss";
import { NavLink } from "react-router-dom";

const buttonVariants = cva(cls.Button, {
    variants: {
        variant: {
            regular: cls.regular,
            outline: cls.outline,
            secondary: cls.secondary,
        },
        size: {
            md: cls.md,
            lg: cls.lg,
        },
    },
    defaultVariants: {
        variant: "regular",
        size: "md",
    },
});

interface ButtonProps extends VariantProps<typeof buttonVariants> {
    children: ReactNode;
    href?: string;
    onClick?: () => void;
}

export const Button = ({ children, size, variant, href, onClick }: ButtonProps) => {
    if (href) {
        return (
            <NavLink to={href}>
                <button className={buttonVariants({ size, variant })}>{children}</button>
            </NavLink>
        );
    }

    return (
        <button onClick={onClick} className={buttonVariants({ size, variant })}>
            {children}
        </button>
    );
};
