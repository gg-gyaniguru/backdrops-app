type user = {
    _id: string,
    src: string | null,
    username: string,
    verified: boolean
}

type comment = {
    _id: string,
    reply: string
    user: user,
}

type drop = {
    _id: string,
    src: string,
    description: string,
    user: user,
    likes: number,
    isLike: boolean
    comments: number
}

type collection = {
    _id: string,
    src: string | null,
    name: string,
    drops: drop[],
}

export type {user, drop, comment, collection}