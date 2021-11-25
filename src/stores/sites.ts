import { writable } from 'svelte/store'
import type { Site } from '$lib/types'
import { browser } from '$app/env'

export const network: Site = {
    'name':'Network',
    'options': ['Dashboard', 'Settings']
}

const defaultSites: Site[] =  [
    {
        'name':'Reakut',
        'options': ['Dashboard', 'Posts', 'Pages', 'Tools', 'Settings']
    },
    {
        'name': 'Second',
        'options': ['Dashboard', 'Pages', 'Tools', 'Settings']
    }
]

export const sites = writable(browser && JSON.parse(localStorage.getItem('sites')) as Site[] || defaultSites)
