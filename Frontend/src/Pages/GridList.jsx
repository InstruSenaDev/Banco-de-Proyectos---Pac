'use client';
import { useState } from 'react';
import { RiArrowRightUpLine } from '@remixicon/react';
import { Card, Divider } from '@tremor/react';
import BotonSegundoModal from '../Components/BotonSegundoModal';
import { X } from 'lucide-react';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const data = [
  {
    name: 'Alissia Stone',
    initials: 'AS',
    email: 'a.stone@gmail.com',
    textColor: 'text-fuchsia-800 dark:text-fuchsia-500',
    bgColor: 'bg-fuchsia-100 dark:bg-fuchsia-500/20',
    href: '#',
  },
  {
    name: 'Emma Bern',
    initials: 'EB',
    email: 'e.bern@gmail.com',
    textColor: 'text-blue-800 dark:text-blue-500',
    bgColor: 'bg-blue-100 dark:bg-blue-500/20',
    href: '#',
  },
  {
    name: 'Aaron McFlow',
    initials: 'AM',
    email: 'a.flow@acme.com',
    textColor: 'text-pink-800 dark:text-pink-500',
    bgColor: 'bg-pink-100 dark:bg-pink-500/20',
    href: '#',
  },
  {
    name: 'Thomas Palstein',
    initials: 'TP',
    email: 't.palstein@acme.com',
    textColor: 'text-emerald-800 dark:text-emerald-500',
    bgColor: 'bg-emerald-100 dark:bg-emerald-500/20',
    href: '#',
  },
  {
    name: 'Sarah Johnson',
    initials: 'SJ',
    email: 's.johnson@gmail.com',
    textColor: 'text-orange-800 dark:text-orange-500',
    bgColor: 'bg-orange-100 dark:bg-orange-500/20',
    href: '#',
  },
  {
    name: 'David Smith',
    initials: 'DS',
    email: 'd.smith@gmail.com',
    textColor: 'text-indigo-800 dark:text-indigo-500',
    bgColor: 'bg-indigo-100 dark:bg-indigo-500/20',
    href: '#',
  },
  {
    name: 'Megan Brown',
    initials: 'MB',
    email: 'm.brown@gmail.com',
    textColor: 'text-yellow-800 dark:text-yellow-500',
    bgColor: 'bg-yellow-100 dark:bg-yellow-500/20',
    href: '#',
  },
];

const Drawer = ({ children, isOpen, setIsOpen }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)} />
      )}
      <div
        className={`fixed right-4 top-32 bottom-4 w-full max-w-sm bg-white dark:bg-gray-500 shadow-lg transition-transform duration-300 ease-in-out z-50 rounded-lg ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6 overflow-y-auto">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-500"
          >
            <X size={20} />
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default function Example() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [members, setMembers] = useState(data);

  const openDrawer = (member) => {
    setSelectedMember(member);
    setIsDrawerOpen(true);
  };

  const deleteMember = (email) => {
    setMembers(members.filter((member) => member.email !== email));
    setIsDrawerOpen(false);
  };

  const editMember = (updatedMember) => {
    setMembers(
      members.map((member) => (member.email === updatedMember.email ? updatedMember : member))
    );
    setIsDrawerOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center w-full mb-4">
        <div className="flex space-x-2">
          <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Members
          </h3>
          <span className="inline-flex size-6 items-center justify-center rounded-tremor-full bg-tremor-background-subtle text-tremor-label font-medium text-tremor-content-strong dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-strong">
            {members.length}
          </span>
        </div>
        <div className="flex-1 text-right">
          <BotonSegundoModal text='Agregar'/>
        </div>
      </div>
      <Divider className="my-4" />
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {members.map((member) => (
          <Card key={member.name} className="group p-8 max-w-lg relative">
            <div className="flex items-center space-x-6">
              <span
                className={classNames(
                  member.bgColor,
                  member.textColor,
                  'flex size-16 shrink-0 items-center justify-center rounded-full text-tremor-default font-medium',
                )}
                aria-hidden={true}
              >
                {member.initials}
              </span>
              <div className="truncate">
                <p className="truncate text-xl font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {member.name}
                </p>
                <p className="truncate text-lg text-tremor-content dark:text-dark-tremor-content">
                  {member.email}
                </p>
              </div>
            </div>
            <button
              onClick={() => openDrawer(member)}
              className="absolute right-4 top-4 text-tremor-content-subtle group-hover:text-tremor-content dark:text-dark-tremor-content-subtle group-hover:dark:text-dark-tremor-content"
              aria-label={`Ver detalles de ${member.name}`}
            >
              <RiArrowRightUpLine className="size-6" aria-hidden={true} />
            </button>
          </Card>
        ))}
      </div>

      <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
        {selectedMember && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{selectedMember.name}</h2>
            <p className="mb-2">{selectedMember.email}</p>
            <p className="mb-4">Más detalles del miembro aquí...</p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mb-2"
              onClick={() => deleteMember(selectedMember.email)}
            >
              Borrar
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() =>
                editMember({
                  ...selectedMember,
                  name: 'Nuevo Nombre', 
                })
              }
            >
              Editar
            </button>
          </div>
        )}
      </Drawer>
    </>
  );
}
