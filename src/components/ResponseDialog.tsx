"use client";

import { Fragment, useRef } from 'react';
import { Dialog, DialogPanel, Transition } from '@headlessui/react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

type ResponseDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: 'success' | 'error';
  additionalAction?: {
    label: string;
    onClick: () => void;
  };
};

export default function ResponseDialog({
  isOpen,
  onClose,
  title,
  message,
  type,
  additionalAction
}: ResponseDialogProps) {
  const closeButtonRef = useRef(null);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={closeButtonRef}
        onClose={onClose}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div>
                <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
                  type === 'success' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {type === 'success' ? (
                    <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  ) : (
                    <XCircleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  )}
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{message}</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                {additionalAction && (
                  <button
                    type="button"
                    className={`inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:col-start-2 sm:text-sm ${
                      type === 'success'
                        ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                        : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
                    }`}
                    onClick={() => {
                      additionalAction.onClick();
                      onClose();
                    }}
                  >
                    {additionalAction.label}
                  </button>
                )}
                <button
                  type="button"
                  className={`mt-3 inline-flex w-full justify-center rounded-md border ${
                    additionalAction 
                      ? 'sm:col-start-1 sm:mt-0' 
                      : ''
                  } ${
                    type === 'success'
                      ? additionalAction 
                        ? 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500' 
                        : 'border-transparent bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
                      : 'border-transparent bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
                  } px-4 py-2 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm`}
                  onClick={onClose}
                  ref={closeButtonRef}
                >
                  {type === 'success' 
                    ? additionalAction ? 'Close' : 'Continue' 
                    : 'Try Again'}
                </button>
              </div>
            </DialogPanel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 