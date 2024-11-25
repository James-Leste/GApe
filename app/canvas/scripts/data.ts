/** @format */

import { colors } from '@atlaskit/theme'
import seedrandom from 'seedrandom'
import type { Author, Contact, Quote, QuoteMap } from './types'
import finnImg from '../../static/media/finn-min.png'
import bmoImg from '../../static/media/bmo-min.png'
import princessImg from '../../static/media/princess-min.png'
import jakeImg from '../../static/media/jake-min.png'

const jake: Author = {
    id: '1',
    name: 'Jake',
    url: 'http://adventuretime.wikia.com/wiki/Jake',
    avatarUrl: jakeImg,
    colors: {
        soft: colors.Y50,
        hard: colors.N400A,
    },
}

const BMO: Author = {
    id: '2',
    name: 'BMO',
    url: 'http://adventuretime.wikia.com/wiki/BMO',
    avatarUrl: bmoImg,
    colors: {
        soft: colors.G50,
        hard: colors.N400A,
    },
}

const finn: Author = {
    id: '3',
    name: 'Finn',
    url: 'http://adventuretime.wikia.com/wiki/Finn',
    avatarUrl: finnImg,
    colors: {
        soft: colors.B50,
        hard: colors.N400A,
    },
}

const princess: Author = {
    id: '4',
    name: 'Princess bubblegum',
    url: 'http://adventuretime.wikia.com/wiki/Princess_Bubblegum',
    avatarUrl: princessImg,
    colors: {
        soft: colors.P50,
        hard: colors.N400A,
    },
}

export const authors: Author[] = [jake, BMO, finn, princess]

export const quotes: Quote[] = [
    {
        id: '1',
        content: 'Sometimes life is scary and dark',
        author: BMO,
    },
    {
        id: '2',
        content:
            'Sucking at something is the first step towards being sorta good at something.',
        author: jake,
    },
    {
        id: '3',
        content: "You got to focus on what's real, man",
        author: jake,
    },
    {
        id: '4',
        content: 'Is that where creativity comes from? From sad biz?',
        author: finn,
    },
    {
        id: '5',
        content: 'Homies help homies. Always',
        author: finn,
    },
    {
        id: '6',
        content: 'Responsibility demands sacrifice',
        author: princess,
    },
    {
        id: '7',
        content:
            "That's it! The answer was so simple, I was too smart to see it!",
        author: princess,
    },
    {
        id: '8',
        content:
            "People make mistakes. It's all a part of growing up and you never really stop growing",
        author: finn,
    },
    {
        id: '9',
        content:
            "Don't you always call sweatpants 'give up on life pants,' Jake?",
        author: finn,
    },
    {
        id: '10',
        content: 'I should not have drunk that much tea!',
        author: princess,
    },
    {
        id: '11',
        content: 'Please! I need the real you!',
        author: princess,
    },
    {
        id: '12',
        content: "Haven't slept for a solid 83 hours, but, yeah, I'm good.",
        author: princess,
    },
]

export const quotes2: Quote[] = [
    {
        id: '11231',
        content: 'Sometimes life is scary and dark',
        author: BMO,
    },
]

// So we do not have any clashes with our hardcoded ones
let idCount: number
let predictableMathRandom: seedrandom.PRNG

// FIXME: This doesn't work well with StrictMode
export const resetData = (seed: string) => {
    idCount = 1
    predictableMathRandom = seedrandom(seed)
}

resetData('base')

export const getQuotes = (count: number = quotes.length): Quote[] =>
    // eslint-disable-next-line no-restricted-syntax
    Array.from({ length: count }, (v, k) => k).map(() => {
        const random: Quote =
            quotes[Math.floor(predictableMathRandom() * quotes.length)]

        const custom: Quote = {
            ...random,
            id: `G${idCount++}`,
        }

        return custom
    })

// get a list of quotes for each author
// Taking a author name as parameter
const getByAuthor = (author: Author, items: Quote[]): Quote[] =>
    items.filter((quote: Quote) => quote.author === author)

// get a map of quotes for each author
// each list is a quote[] from a different author
export const authorQuoteMap: QuoteMap = authors.reduce(
    (previous: QuoteMap, author: Author) => ({
        ...previous,
        [author.name]: getByAuthor(author, quotes),
    }),
    {}
)

export const generateQuoteMap = (quoteCount: number): QuoteMap =>
    authors.reduce(
        (previous: QuoteMap, author: Author) => ({
            ...previous,
            [author.name]: getQuotes(quoteCount / authors.length),
        }),
        {}
    )

export const fakeContacts: Contact[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        github: 'johndoe',
        socialMedia: '@johndoe',
        tags: 'friend,developer',
        photoUrl: 'https://example.com/photos/johndoe.jpg',
        intro: 'Hi, I am John Doe, a software developer from San Francisco.',
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '987-654-3210',
        github: 'janesmith',
        socialMedia: '@janesmith',
        tags: 'colleague,designer',
        photoUrl: 'https://example.com/photos/janesmith.jpg',
        intro: 'Hello, I am Jane Smith, a UX designer from New York.',
    },
    {
        id: '3',
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        phone: '555-123-4567',
        github: 'alicejohnson',
        socialMedia: '@alicejohnson',
        tags: 'family,manager',
        photoUrl: 'https://example.com/photos/alicejohnson.jpg',
        intro: 'Hey, I am Alice Johnson, a project manager from Los Angeles.',
    },
]
