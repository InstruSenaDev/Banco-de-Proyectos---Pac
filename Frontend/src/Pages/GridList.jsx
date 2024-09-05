import { RiArrowRightUpLine, RiLayoutGridLine, RiListCheck,RiAddLine,} from '@remixicon/react';
import {Card, Divider, Tab, TabGroup, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, TabList, TabPanel, TabPanels} from '@tremor/react';
import { useState } from 'react';
import ModalUsuario from '../Components/ModalUsuario'
  
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  
  const data = [
    {
      name: 'Alissia Stone',
      initial: 'AS',
      textColor: 'text-fuchsia-800 dark:text-fuchsia-500',
      bgColor: 'bg-fuchsia-100 dark:bg-fuchsia-500/20',
      email: 'a.stone@gmail.com',
      href: '#',
      details: [
        {
          type: 'Role',
          value: 'member',
        },
        {
          type: 'Last active',
          value: '2d ago',
        },
      ],
    },
    {
      name: 'Emma Bern',
      initial: 'EB',
      textColor: 'text-blue-800 dark:text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-500/20',
      email: 'e.bern@gmail.com',
      href: '#',
      details: [
        {
          type: 'Role',
          value: 'member',
        },
        {
          type: 'Last active',
          value: '1d ago',
        },
      ],
    },
    {
      name: 'Aaron McFlow',
      initial: 'AM',
      textColor: 'text-pink-800 dark:text-pink-500',
      bgColor: 'bg-pink-100 dark:bg-pink-500/20',
      email: 'a.flow@acme.com',
      href: '#',
      details: [
        {
          type: 'Role',
          value: 'admin',
        },
        {
          type: 'Last active',
          value: '2min ago',
        },
      ],
    },
    {
      name: 'Thomas Palstein',
      initial: 'TP',
      textColor: 'text-emerald-800 dark:text-emerald-500',
      bgColor: 'bg-emerald-100 dark:bg-emerald-500/20',
      email: 't.palstein@acme.com',
      href: '#',
      details: [
        {
          type: 'Role',
          value: 'admin',
        },
        {
          type: 'Last active',
          value: '18min ago',
        },
      ],
    },
    {
      name: 'Sarah Johnson',
      initial: 'SJ',
      textColor: 'text-orange-800 dark:text-orange-500',
      bgColor: 'bg-orange-100 dark:bg-orange-500/20',
      email: 's.johnson@gmail.com',
      href: '#',
      details: [
        {
          type: 'Role',
          value: 'member',
        },
        {
          type: 'Last active',
          value: '3h ago',
        },
      ],
    },
    {
      name: 'David Smith',
      initial: 'DS',
      textColor: 'text-indigo-800 dark:text-indigo-500',
      bgColor: 'bg-indigo-100 dark:bg-indigo-500/20',
      email: 'd.smith@gmail.com',
      href: '#',
      details: [
        {
          type: 'Role',
          value: 'guest',
        },
        {
          type: 'Last active',
          value: '4h ago',
        },
      ],
    },
    {
      name: 'Megan Brown',
      initial: 'MB',
      textColor: 'text-yellow-800 dark:text-yellow-500',
      bgColor: 'bg-yellow-100 dark:bg-yellow-500/20',
      email: 'm.brown@gmail.com',
      href: '#',
      details: [
        {
          type: 'Role',
          value: 'admin',
        },
        {
          type: 'Last active',
          value: '1d ago',
        },
      ],
    },
  ];
  
  export default function GridList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    return (
      <>
        <TabGroup className="text-right">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Members
              </h3>
              <span className="inline-flex size-6 items-center justify-center rounded-tremor-full bg-tremor-background-subtle text-tremor-label font-medium text-tremor-content-strong dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-strong">
                {data.length}
              </span>
            </div>
            <TabList variant="solid" className="bg-transparent dark:bg-transparent">
              <Tab
                icon={RiLayoutGridLine}
                className="text-tremor-content ui-selected:text-tremor-content-emphasis dark:text-dark-tremor-content dark:ui-selected:text-dark-tremor-content-emphasis"
              />
              <Tab
                icon={RiListCheck}
                className="text-tremor-content ui-selected:text-tremor-content-emphasis dark:text-dark-tremor-content dark:ui-selected:text-dark-tremor-content-emphasis"
              />
              <Tab
                icon={RiAddLine}
                className="text-tremor-content ui-selected:text-darkTremor-brand-emphasis dark:text-dark-tremor-content dark:ui-selected:text-dark-tremor-content-emphasis"
                onClick={() => setIsModalOpen(true)}
              />
            </TabList>
          </div>
          <Divider className="my-4" />
          <TabPanels>
            <TabPanel>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.map((member) => (
                  <Card key={member.name} className="group p-4">
                    <div className="flex items-center space-x-4">
                      <span
                        className={classNames(
                          member.textColor,
                          member.bgColor,
                          'flex h-12 w-12 shrink-0 items-center justify-center rounded-tremor-full text-tremor-default font-medium',
                        )}
                        aria-hidden={true}
                      >
                        {member.initial}
                      </span>
                      <div className="truncate">
                        <p className="truncate text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                          <a href={member.href} className="focus:outline-none">
                            {/* Extend link to entire card */}
                            <span
                              className="absolute inset-0"
                              aria-hidden={true}
                            />
                            {member.name}
                          </a>
                        </p>
                        <p className="truncate text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                          {member.email}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-2 divide-x divide-tremor-border border-t border-tremor-border dark:divide-dark-tremor-border dark:border-dark-tremor-border">
                      {member.details.map((item) => (
                        <div key={item.type} className="truncate px-3 py-2">
                          <p className="truncate text-tremor-label text-tremor-content dark:text-dark-tremor-content">
                            {item.type}
                          </p>
                          <p className="truncate text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                    <span
                      className="pointer-events-none absolute right-4 top-4 text-tremor-content-subtle group-hover:text-tremor-content dark:text-dark-tremor-content-subtle group-hover:dark:text-dark-tremor-content"
                      aria-hidden={true}
                    >
                      <RiArrowRightUpLine className="size-4" aria-hidden={true} />
                    </span>
                  </Card>
                ))}
              </div>
            </TabPanel>
            <TabPanel>
              <Table>
                <TableHead>
                  <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
                    <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      Name
                    </TableHeaderCell>
                    <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      Storage
                    </TableHeaderCell>
                    <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      Users
                    </TableHeaderCell>
                    <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                      Last edited
                    </TableHeaderCell>
                    <TableHeaderCell>
                      <span className="sr-only">Edit</span>
                    </TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((member) => (
                    <TableRow
                      key={member.name}
                      className="hover:bg-tremor-background-muted hover:dark:bg-dark-tremor-background-muted"
                    >
                      <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        {member.name}
                      </TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.details[0].value}</TableCell>
                      <TableCell className="text-right">
                        {member.details[1].value}
                      </TableCell>
                      <TableCell className="text-right">
                        <a
                          href={member.href}
                          className="font-medium text-tremor-brand dark:text-dark-tremor-brand"
                        >
                          Edit<span className="sr-only">{member.name}</span>
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabPanel>
          </TabPanels>
        </TabGroup>
        {isModalOpen && <ModalUsuario onClose={() => setIsModalOpen(false)} />}
      </>
    );
  }