// 'use client';
import { useState } from 'react';
import { Card, Dialog, DialogPanel, Divider, TextInput } from '@tremor/react';

export default function Example() {
  const [showDemo, setShowDemo] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* first card only for demo purpose */}
      <Card className="sm:mx-auto sm:max-w-md">
        <div className="absolute right-0 top-0 pr-3 pt-3">
          <button
            type="button"
            className="rounded-tremor-small p-2 text-tremor-content-subtle hover:bg-tremor-background-subtle hover:text-tremor-content dark:text-dark-tremor-content-subtle hover:dark:bg-dark-tremor-background-subtle hover:dark:text-tremor-content"
            aria-label="Close"
          >
            <RiCloseLine className="size-5 shrink-0" aria-hidden={true} />
          </button>
        </div>
        <form action="#" method="POST">
          <h4 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Transfer ownership
          </h4>
          <p className="mt-2 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
            Are you sure you want to transfer the ownership of this workspace to
            Emma?
          </p>
          <label
            htmlFor="transfer-ownership"
            className="mt-6 block text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
          >
            Confirm password
          </label>
          <TextInput
            id="transfer-ownership"
            name="transfer-ownership"
            type="password"
            className="mt-2"
            placeholder="Password"
          />
          <button
            type="submit"
            className="mt-4 w-full whitespace-nowrap rounded-tremor-default bg-tremor-brand px-4 py-2 text-center text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
          >
            Transfer ownership
          </button>
        </form>
      </Card>
      <Divider className="mt-12">
        <button
          onClick={() => setShowDemo(!showDemo)}
          type="button"
          className="duration-400 group inline-flex items-center justify-center space-x-2 whitespace-nowrap rounded-full bg-tremor-background-subtle px-3.5 py-1.5 text-tremor-default font-medium text-tremor-content focus-visible:ring-1 focus-visible:ring-offset-1 dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content"
          tabIndex={0}
        >
          <RiArrowDownSLine
            aria-hidden={true}
            className={`-mx-1 size-5 transition-all group-hover:text-tremor-content-emphasis group-hover:dark:text-dark-tremor-content-emphasis ${showDemo ? 'rotate-180' : ''} `}
          />
          <span className="transition-all group-hover:text-tremor-content-emphasis group-hover:dark:text-dark-tremor-content-emphasis">
            {showDemo ? 'Hide Demo' : 'Show Demo'}
          </span>
        </button>
      </Divider>
      {showDemo ? (
        <>
          <div className="flex items-center justify-center py-36">
            <button
              type="button"
              className="whitespace-nowrap rounded-tremor-default bg-tremor-brand px-4 py-2 text-center text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
              onClick={() => setIsOpen(true)}
            >
              Show dialog
            </button>
          </div>
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            static={true}
            className="z-[100]"
          >
            <DialogPanel className="sm:max-w-md">
              <div className="absolute right-0 top-0 pr-3 pt-3">
                <button
                  type="button"
                  className="rounded-tremor-small p-2 text-tremor-content-subtle hover:bg-tremor-background-subtle hover:text-tremor-content dark:text-dark-tremor-content-subtle hover:dark:bg-dark-tremor-background-subtle hover:dark:text-tremor-content"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                >
                  <RiCloseLine className="size-5 shrink-0" aria-hidden={true} />
                </button>
              </div>
              <form action="#" method="POST">
                <h4 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Transfer ownership
                </h4>
                <p className="mt-2 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                  Are you sure you want to transfer the ownership of this
                  workspace to Emma?
                </p>
                <label
                  htmlFor="transfer-ownership"
                  className="mt-6 block text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                  Confirm password
                </label>
                <TextInput
                  id="transfer-ownership"
                  name="transfer-ownership"
                  type="password"
                  className="mt-2"
                  placeholder="Password"
                />
                <button
                  type="submit"
                  className="mt-4 w-full whitespace-nowrap rounded-tremor-default bg-tremor-brand px-4 py-2 text-center text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
                >
                  Transfer ownership
                </button>
              </form>
            </DialogPanel>
          </Dialog>
        </>
      ) : null}
    </>
  );
}