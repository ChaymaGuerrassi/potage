"use client";

import React, { useCallback, useEffect, useState } from "react";
import Button from "../buttons/Button";
import { HiOutlineX } from "react-icons/hi";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="
                justify-center
                items-center
                flex
                overflow-x-hidden
                overflow-y-auto
                fixed
                inset-0
                z-50
                outline-none
                focus:outline-none
                bg-neutral-800/70            
                "
      >
        <div
          className="
                    relative
                    w-full
                    md:w-4/6
                    lg:w-3/6
                    xl:w-2/5
                    my-6
                    mx-auto
                    h-full
                    lg:h-auto
                    md:h-auto
                "
        >
          {/* CONTENT */}
          <div
            className={`
                        translate
                        duration-300
                        h-full  
                        ${showModal ? "translate-y-0" : "translate-y-full"}
                        ${showModal ? "opacity-100" : "opacity-0"}
                    `}
          >
            <div
              className="
                translate
                h-full
                lg:h-auto
                md:h-auto
                border-0
                rounded-lg
                shadow-lg
                relative
                flex flex-col
                w-full
                bg-ptgBeige
                outline-none
                focus:outline-none
            "
            >
              {/* HEADER */}
              <div
                className="
                    flex
                    items-center
                    justify-center
                    p-6
                    rounded-t
                    relative
                    border-b-[1px]
                "
              >
                <div className="absolute right-9">
                  <Button icon={HiOutlineX} value="" onClick={handleClose} />
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
              </div>
              {/* BODY */}
              <div className="relative flex-auto p-6">{body}</div>
              {/* FOOTER */}
              <div
                className="
                        flex
                        flex-col
                        p-6
                        gap-2
                    "
              >
                <div className="flex flex-row items-center justify-end gap-4 w-full">
                  <Button
                    value={actionLabel}
                    disabled={disabled}
                    onClick={handleSubmit}
                    color="Green"
                    full={true}
                  />
                  {secondaryActionLabel && (
                    <Button
                      value={secondaryActionLabel}
                      disabled={disabled}
                      onClick={handleSecondaryAction}
                      color="Green"
                      full={true}
                    />
                  )}
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
