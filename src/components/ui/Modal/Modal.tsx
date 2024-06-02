import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import classes from "./Modal.module.scss";
import { Portal } from "../Portal";
import { Overlay } from "../Overlay";
import { Mods, cn } from "@/shared/helpers/classNames/classNames";

interface ModalProps {
    className?: string;
    children?: React.ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 150;

export const Modal = (props: ModalProps) => {
    const { children, className, isOpen, onClose, lazy } = props;

    const [isClosing, setIsClosing] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    const mods: Mods = {
        [classes.opened]: isOpen,
        [classes.isClosing]: isClosing,
    };

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    const closeHandler = useCallback(() => {
        setIsClosing(true);
        if (onClose) {
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    // тут важно писать обычный KeyboardEvent, а не Реакт
    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeHandler();
            }
        },
        [closeHandler]
    );

    useEffect(() => {
        if (isOpen) {
            window.addEventListener("keydown", onKeyDown);
        }

        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    // если у нас ленивая подгрузка и компонент не вмонтирован, то мы будем возвращать null
    // при первом открытии компонента установится isMounted = true и компонент отрисуется как надо и уже останется в DOM дереве, даже после "закрытия" компонента
    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal element={document.getElementById("app") ?? document.body}>
            <div className={cn(classes.Modal, mods, [className, classes.modalNew])}>
                <Overlay onClick={closeHandler} />
                <div className={classes.content}>{children}</div>
            </div>
        </Portal>
    );
};
