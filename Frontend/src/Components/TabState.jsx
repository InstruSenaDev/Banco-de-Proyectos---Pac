'use client';
import { Tab, TabGroup, TabList } from '@tremor/react';
import React, { useState } from 'react'

export const TabState = ({Text1, Text2}) => (
  <div className="max-w-sm">
    <TabGroup defaultIndex={0}>
      <TabList variant="line">
        <Tab value={0}>{Text1}</Tab>
        <Tab value={1}>{Text2}</Tab>
      </TabList>
    </TabGroup>

  </div>
);