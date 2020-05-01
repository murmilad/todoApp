import React from 'react';

export const ContactsContext =  React.createContext({
    contacts: [],
    addContact: () => {},
 })