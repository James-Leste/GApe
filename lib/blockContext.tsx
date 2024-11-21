import React, { createContext, useState, ReactNode } from 'react';


export interface BlockData {

    name: string

    description: string

    tags: string[]

    image: string

    url: string

    contact: {

        Phone: string

        Email: string

        github: string

        linkedin: string

        x: string

    }

    [key: string]: string | number | boolean | object | undefined

}

type BlockContextType = {
    blockData: BlockData;
    updateBlockData: (data: Partial<BlockData>) => void;
};

const defaultBlockData: BlockData = {
    name: 'John Smith',
    description: 'I\'m a Software Developer and Aalto University graduate with expertise in building web and data-driven applications. I enjoy solving complex problems using technologies like Python, Java, and JavaScript. Let\'s connect and create something awesome together!',
    tags: ['Vue', 'React', 'TS/JS', 'Next'],
    image: 'https://s3.is-ali.tech/3ce276f382ff8edb74a24d8a2c872fa8.png',
    url: 'https://www.linkedin.com/in/john-smith-123456/',
    contact: {
        Phone: '+358 401234567',
        Email: 'example@mail.com',
        github: '@John_Smith22',
        linkedin: '@John_Smith22',
        x: '@John_Smith22',
    },
};

export const BlockContext = createContext<BlockContextType>({
    blockData: defaultBlockData,
    updateBlockData: () => {},
});

export const BlockProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [blockData, setBlockData] = useState<BlockData>(defaultBlockData);

    const updateBlockData = (data: Partial<BlockData>) => {
        setBlockData(prev => ({ ...prev, ...data }));
    };

    return (
        <BlockContext.Provider value={{ blockData, updateBlockData }}>
            {children}
        </BlockContext.Provider>
    );
};

