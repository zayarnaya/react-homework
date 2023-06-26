'use client'

import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'

interface StoreProviderProps {
  children: React.ReactElement | React.ReactElement[]
}

export const StoreProvider = ({
  children,
}: StoreProviderProps): React.ReactElement => {
  return <Provider store={store}>{children}</Provider>
}
