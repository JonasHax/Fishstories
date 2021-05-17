import React from 'react';

import { Menu } from './FilterModule' ;

export default {
  title: 'Example/FilterModule',
  component: Menu,
};

const Template = (args) => <Menu {...args}/>;
export const FilterModule = Template.bind({});
export const FilterModule2 = Template.bind({});

FilterModule.args = {
  menuTitel: "Vælg fiskearter",
  filterTypes: [
    "Aborre",
    "Berggylte",
    "Brasen",
    "Brosme",
    "Døbel",
    "Fjeldørred",
    "Fjæsing",
    "Hellefisk",
    "Karusse",
    "Hvilling",
    "Bækørred",
    "Gedde",
    "Havkat",
    "Havtaske",
    "Havørred",
    "Havål",
    "Helleflynder",
    "Hestemakrel",
    "Hornfisk",
    "Karpe",
    "Ising",
    "Skrubbe",
    "Steelhead",
    "Helt",
    "Søørred",
    "Rudskalle",
    "Hork",
    "Kildeørred",
    "Knude",
    "Kuller",
    "Laks",
    "Makrel",
    "Multe",
    "Pighvarre",
    "Regnbueørred",
    "Rødspætte",
    "Sandart",
    "Sej",
    "Sild",
    "Skalle",
    "Stenbider",
    "Suder",
    "Torsk",
    "Ål"
  ]
}

FilterModule2.args = {
  menuTitel: "Vælg fiskesteder",
  filterTypes: [
    "Kyst",
    "Sø",
    "Å",
    "Put and Take"
  ]
}
